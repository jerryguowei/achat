package com.duduanan.achat.service.impl;

import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.duduanan.achat.dto.MessageRequestDTO;
import com.duduanan.achat.dto.SideType;
import com.duduanan.achat.dto.UserDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.dto.UserRegistractionDTO;
import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.dto.message.NoticeFriendDTO;
import com.duduanan.achat.dto.message.NoticeFriendDTO.NoticeType;
import com.duduanan.achat.entity.AddUserRequest;
import com.duduanan.achat.entity.PrivateMessage;
import com.duduanan.achat.entity.RequestStatus;
import com.duduanan.achat.entity.UserInfo;
import com.duduanan.achat.files.MimeFileUtils;
import com.duduanan.achat.repository.AddUserRequestRepository;
import com.duduanan.achat.repository.PrivateMessageRepository;
import com.duduanan.achat.repository.UserRepository;
import com.duduanan.achat.service.BroadcastService;
import com.duduanan.achat.service.UserService;
import com.duduanan.achat.utils.GlobalUtils;

@Service
@Transactional
public class DefaultUserService implements UserService {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AddUserRequestRepository addUserRequestRepository;
    
    @Autowired
    private PrivateMessageRepository privateMessageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private BroadcastService broadcastService;
    
    
    @Autowired
    private MimeFileUtils mimeFileUtils;

	@Override
	public UserDTO create(UserRegistractionDTO registractionDTO) {
		throwIfUsernameExists(registractionDTO.getUsername());
		throwIfEmailExists(registractionDTO.getEmail());
		UserInfo user = new UserInfo(registractionDTO);
		String hash = passwordEncoder.encode(user.getPassword());
		user.setPassword(hash);
		user.setActive(true);
		user = userRepository.save(user);
		if (user != null) {
			return new UserDTO(user);
		}
		return null;
	}
	
	private void throwIfUsernameExists(String username) {
		UserInfo existingUser = userRepository.findByUsername(username);
		if (existingUser != null) {
			logger.info("username " + username + " is already used.");
			throw new IllegalArgumentException("username is already used.");
		}
	}
	
	private void throwIfEmailExists(String email) {
		UserInfo existingUser = userRepository.findByEmail(email);
		if (existingUser != null) {
			logger.info("email " + email + " is already used.");
			throw new IllegalArgumentException("email " + email + " is already used.");
		}
	}

	@Override
	public UserDTO findUser(String username) {
		  UserInfo userInfo = userRepository.findByUsername(username);
		  if(userInfo == null) {
			  logger.info("username " + username + " is not found.");
			  throw new UsernameNotFoundException("username " + username + " is not found.");
		  }
	      return new UserDTO(userInfo);
	}
	
	
	@Override
	public List<UserDTO> findMatchUser(String username) {
		List<UserInfo>  userInfoList = userRepository.findMatchUser(username);
		if(userInfoList == null) {
			logger.info("not user found for username: " + username);
			return new ArrayList<>();
		}
				
		return userInfoList.stream().map(user -> new UserDTO(user)).collect(Collectors.toList());
	}

	@Override
	public UserRequestDTO addUser(UserRequestDTO addUserRequestDTO, String loginUsername) {
		
		if(loginUsername.equals(addUserRequestDTO.getToUsername())) {
			throw new IllegalArgumentException("you can't add yourself as friends.");
		}
		
		String targetUserName = addUserRequestDTO.getToUsername();
		UserInfo targetUser = userRepository.findByUsername(targetUserName);
		if(targetUser == null) {
			logger.info("username " + targetUserName + " is not found.");
			throw new UsernameNotFoundException("username " + targetUserName + " is not found.");
		}
		UserInfo fromUser = userRepository.findByUsername(loginUsername);
		
		if(fromUser.getFriends().contains(targetUser)) {
			logger.info("user " + targetUserName + " is already " + loginUsername +  " friends.");
			throw new IllegalArgumentException("user " + targetUserName + " is already your friends.");
		}
		
		AddUserRequest addUserRequest = new AddUserRequest();
		addUserRequest.setRequestMessage(addUserRequestDTO.getMessage());
		addUserRequest.setRequestTime(new Date());
		addUserRequest.setViewed(0);
		
		fromUser.addSentAddingUserRequest(addUserRequest);
		targetUser.addReceivedAddingUserRequest(addUserRequest);
		addUserRequest = addUserRequestRepository.save(addUserRequest);
		addUserRequestDTO = new UserRequestDTO(addUserRequest, loginUsername);
		
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getFromUsername(), Arrays.asList(addUserRequestDTO));
		
		addUserRequestDTO = new UserRequestDTO(addUserRequest, targetUser.getUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getToUsername(), Arrays.asList(addUserRequestDTO));
		return addUserRequestDTO;
	}

	@Override
	public UserDTO acceptUser(UserRequestDTO addUserRequestDTO, String loginUsername) {
		AddUserRequest addUserRequest = addUserRequestRepository.findById(addUserRequestDTO.getId()).orElse(null);
		if(addUserRequest == null 
				|| addUserRequest.getStatus() != RequestStatus.PENDING 
				|| !addUserRequest.getToUser().getUsername().equalsIgnoreCase(loginUsername)) {
			throw new IllegalArgumentException("the request is not exist.");
		}
		
		addUserRequest.setStatus(RequestStatus.ACCEPT);
		addUserRequest.setViewed(0);
		
		addUserRequest.getToUser().addFriends(addUserRequest.getFromUser());
		userRepository.save(addUserRequest.getToUser());
		addUserRequestRepository.save(addUserRequest);
		addUserRequestDTO =  new UserRequestDTO(addUserRequest, addUserRequest.getFromUser().getUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequest.getFromUser().getUsername(), Arrays.asList(addUserRequestDTO));
		
		NoticeFriendDTO noticeFriendDTO = new NoticeFriendDTO(NoticeType.UPDATE, new UserDTO(addUserRequest.getToUser()));
		this.broadcastService.sendChangeFriend(addUserRequest.getFromUser().getUsername(), noticeFriendDTO);
		
		addUserRequestDTO =  new UserRequestDTO(addUserRequest, addUserRequest.getToUser().getUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequest.getToUser().getUsername(), Arrays.asList(addUserRequestDTO));
		noticeFriendDTO = new NoticeFriendDTO(NoticeType.UPDATE, new UserDTO(addUserRequest.getFromUser()));
		this.broadcastService.sendChangeFriend(addUserRequest.getToUser().getUsername(), noticeFriendDTO);
		
		return new UserDTO(addUserRequest.getFromUser());
	}

	@Override
	public UserRequestDTO rejectUser(UserRequestDTO addUserRequestDTO, String loginUsername) {
		AddUserRequest addUserRequest = addUserRequestRepository.findById(addUserRequestDTO.getId()).orElse(null);
		if(addUserRequest == null 
				|| addUserRequest.getStatus() != RequestStatus.PENDING 
				|| !addUserRequest.getToUser().getUsername().equalsIgnoreCase(loginUsername)) {
			throw new IllegalArgumentException("the request is not exist.");
		}
		
		addUserRequest.setStatus(RequestStatus.REJECT);
		addUserRequest.setViewed(0);
		addUserRequest.setRejectMessage(addUserRequestDTO.getRejectMessage());
		addUserRequestRepository.save(addUserRequest);
		
		addUserRequestDTO = new UserRequestDTO(addUserRequest, loginUsername);
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getFromUsername(), Arrays.asList(addUserRequestDTO));
		
		addUserRequestDTO = new UserRequestDTO(addUserRequest, addUserRequestDTO.getToUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getToUsername(), Arrays.asList(addUserRequestDTO));
		return addUserRequestDTO;
	}
	
	@Override
	public UserRequestDTO viewRequest(Long requestId, String loginUsername) {
		AddUserRequest addUserRequest = addUserRequestRepository.findById(requestId).orElse(null);
		if(addUserRequest == null 
				|| (addUserRequest.getStatus() == RequestStatus.PENDING 
				    && !loginUsername.equalsIgnoreCase(addUserRequest.getToUser().getUsername()))
			    || (addUserRequest.getStatus() != RequestStatus.PENDING 
			    		&& !loginUsername.equalsIgnoreCase(addUserRequest.getFromUser().getUsername()))) {
			logger.info("the request is not valid.");
			return null;
		}
		
		if(addUserRequest.getViewed() == 1) {
			return new UserRequestDTO(addUserRequest, loginUsername);
		}
		addUserRequest.setViewed(1);
		addUserRequestRepository.save(addUserRequest);
		
		UserRequestDTO addUserRequestDTO = new UserRequestDTO(addUserRequest, addUserRequest.getFromUser().getUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getFromUsername(), Arrays.asList(addUserRequestDTO));
		addUserRequestDTO = new UserRequestDTO(addUserRequest, addUserRequest.getToUser().getUsername());
		this.broadcastService.sendAddingUserRequest(addUserRequestDTO.getToUsername(), Arrays.asList(addUserRequestDTO));
		return new UserRequestDTO(addUserRequest, loginUsername);
	}


	@Override
	public List<UserMessageDTO> findMessages(MessageRequestDTO messageRequestDTO, String loginUsername) {
		UserInfo toUser = userRepository.findByUsername(messageRequestDTO.getUsername());
		if (toUser == null) {
			logger.info("username " + messageRequestDTO.getUsername() + " is not found.");
			throw new UsernameNotFoundException("username " + messageRequestDTO.getUsername() + " is not found.");
		}
		UserInfo loginUser = userRepository.findByUsername(loginUsername);
		if (loginUser == null) {
			logger.info("username " + loginUsername + " is not found.");
			throw new UsernameNotFoundException("username " + loginUsername + " is not found.");
		}
		List<UserMessageDTO> messageList = fetchPrivateMessage(toUser, messageRequestDTO.getPage(), messageRequestDTO.getPageSize(), loginUser);
		this.broadcastService.sendPrivateMessage(loginUsername, messageList);
		return messageList;
	}

	@Override
	public List<UserMessageDTO> findMessages(UserInfo toUser, Integer page, Integer pageSize, UserInfo fromUser) {
		return fetchPrivateMessage(toUser, page, pageSize, fromUser);
	}

	private List<UserMessageDTO> fetchPrivateMessage(UserInfo toUser, Integer page, Integer pageSize,
			UserInfo loginUser) {
		if (page == null)
			page = 0;
		if (pageSize == null)
			pageSize = 20;

		Page<PrivateMessage> privateMessgePage = privateMessageRepository.findBy(loginUser.getUserId(), toUser.getUserId(),
				PageRequest.of(page, pageSize, Sort.by("msgId").descending()));

		return privateMessgePage.get().map(msg ->{
				SideType type = loginUser == msg.getFromUser()? SideType.FROM : SideType.TO;
				return new UserMessageDTO(msg, type);
				})
				.collect(Collectors.toList());
	}
	
	@Override
	public UserMessageDTO sendMessage(UserMessageDTO userMessageDTO, String loginUsernmae, MultipartFile file) {
		UserInfo toUser = userRepository.findByUsername(userMessageDTO.getToUsername());
		if(toUser == null) {
			logger.info("username " + userMessageDTO.getToUsername() + " is not found.");
			throw new UsernameNotFoundException("username " + userMessageDTO.getToUsername() + " is not found.");
		}
		//FROM USER is the login USER;
		UserInfo fromUser = userRepository.findByUsername(loginUsernmae);
		if(fromUser == null) {
			logger.info("username " + loginUsernmae + " is not found.");
			throw new UsernameNotFoundException("username " + loginUsernmae + " is not found.");
		}
		
		if(!fromUser.getFriends().contains(toUser)) {
			logger.info("username " + toUser.getUsername() + " is not a friend of " + fromUser.getUsername());
			throw new IllegalArgumentException("username " + toUser.getUsername() + " is not your friend.");
		}
		
		if(!toUser.getFriends().contains(fromUser)) {
			logger.info("username " + loginUsernmae + " is not a friend of " + userMessageDTO.getToUsername());
			throw new IllegalArgumentException("you are not a friend of " + toUser.getUsername());
		}
		String message = userMessageDTO.getMessage();
		String attachments = userMessageDTO.getAttachments();
		
		if(file != null && !file.isEmpty()) {
			//means it's a binary message.
			String savedFileNameWithMimeType = mimeFileUtils.saveFile(file);
			String fileName = file.getOriginalFilename();
			String [] splitedInfo = savedFileNameWithMimeType.split(":");
			attachments = fileName + ":" + splitedInfo[1] + ":" + splitedInfo[0];
			message = "$[" + fileName +  "]$";
		}
		
		PrivateMessage privateMessage = new PrivateMessage();
		privateMessage.setFromUser(fromUser);
		privateMessage.setToUser(toUser);
		privateMessage.setMessage(message);
		privateMessage.setAttachments(attachments);
		privateMessage.setViewed(0);
		privateMessage.setTime(new Date());
		String state = userMessageDTO.getState();
		state = StringUtils.isEmpty(state) ? GlobalUtils.uuid() : state;
		privateMessage.setState(state);		
		privateMessage = privateMessageRepository.save(privateMessage);
		
		userMessageDTO = new UserMessageDTO(privateMessage, SideType.TO);
		this.broadcastService.sendPrivateMessage(toUser.getUsername(), Arrays.asList(userMessageDTO));
		userMessageDTO = new UserMessageDTO(privateMessage, SideType.FROM);
		this.broadcastService.sendPrivateMessage(fromUser.getUsername(), Arrays.asList(userMessageDTO));	
		return userMessageDTO;
	}

	@Override
	public UserDTO removeFriends(String friendUsername, UserDetails userDetails) {
		UserInfo loginUser = userRepository.findByUsername(userDetails.getUsername());
		UserInfo friend = userRepository.findByUsername(friendUsername);
		
		if(friend == null) {
			logger.info("username " + friendUsername + " is not exist ");
			throw new IllegalArgumentException("username " + friendUsername + " is not exist ");
		}
			
		if(!loginUser.getFriends().contains(friend)) {
			logger.info(friendUsername + " is not in the friend list of " + loginUser.getUsername());
			throw new IllegalArgumentException(friendUsername + " is not in your friend List.");
		}
		
		loginUser.getFriends().remove(friend);
		userRepository.save(loginUser);
		//remove message only when the friend also remove the login user.
		if(!friend.getFriends().contains(loginUser)) {
			privateMessageRepository.deleteMessagesBetweenUsers(loginUser.getUserId(), friend.getUserId());
		}
			
		NoticeFriendDTO noticeFriendDTO = new NoticeFriendDTO(NoticeType.REMOVE, new UserDTO(friend));
		this.broadcastService.sendChangeFriend(userDetails.getUsername(), noticeFriendDTO);
		
		return new UserDTO(friend);
	}

	@Override
	public List<UserMessageDTO> viewedMessage(Set<Long> messageIdSet, String loginUsername) {
		if(messageIdSet == null || messageIdSet.isEmpty()) {
			return new ArrayList<>();
		}
		//login user is the toUser side.
		List<PrivateMessage> messageList = privateMessageRepository.findByMessageIds(messageIdSet, loginUsername, Sort.by("msgId").descending());
		if(messageList == null || messageList.isEmpty()) {
			return new ArrayList<>();
		}
		messageList.forEach(message -> message.setViewed(1));
		privateMessageRepository.saveAll(messageList);
		List<UserMessageDTO> messageDTOs = messageList.stream().map(msg -> new UserMessageDTO(msg, loginUsername)).collect(Collectors.toList());
		this.broadcastService.sendPrivateMessage(loginUsername, messageDTOs);
		return messageDTOs;
	}
}
