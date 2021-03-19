package com.duduanan.achat.service.impl;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.duduanan.achat.dto.InitDTO;
import com.duduanan.achat.dto.UserDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.dto.message.PrivateMessageListDTO;
import com.duduanan.achat.entity.AddUserRequest;
import com.duduanan.achat.entity.UserInfo;
import com.duduanan.achat.repository.AddUserRequestRepository;
import com.duduanan.achat.repository.PrivateMessageRepository;
import com.duduanan.achat.repository.UserRepository;
import com.duduanan.achat.service.MainService;
import com.duduanan.achat.service.UserService;

@Service
@Transactional
public class MainServiceImpl implements MainService {
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PrivateMessageRepository privateMessageRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AddUserRequestRepository addUserRequestRepository;
	
	
	@Override
	public InitDTO appInit(String username) {
		UserInfo loginUser = userRepository.findByUsername(username);
		if(loginUser == null) {
			throw new UsernameNotFoundException("username "  + username + " is not found.");
		}
		InitDTO initDTO = new InitDTO();
		initDTO.setUser(new UserDTO(loginUser));
		
		//find friends. and find message for each friends.
		List<UserDTO> friends = loginUser.getFriends().stream().map(u -> new UserDTO(u)).collect(Collectors.toList());
		initDTO.setFriends(friends);
		for(UserInfo friend : loginUser.getFriends()) {
			try {
				List<UserMessageDTO> userMessageDTOList = userService.findMessages(friend, 0, 20, loginUser);
				Long minMsgId = privateMessageRepository.findMinMsgId(friend.getUserId(), loginUser.getUserId());
				if(minMsgId == null) {
					minMsgId = -1L;
				}
				PrivateMessageListDTO privateMessageListDTO = new PrivateMessageListDTO(minMsgId, userMessageDTOList);				
				initDTO.setPrivateMessagePerUser(friend.getUsername(), privateMessageListDTO);
			}catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		}
		
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -7);

		//send user adding request 
		List<AddUserRequest> pendingRequests = addUserRequestRepository.findPendingList(loginUser.getUserId(), calendar.getTime(), Sort.by("requestTime").descending());
		for(AddUserRequest addUserRequest : pendingRequests) {
			UserRequestDTO addUserRequestDTO = new UserRequestDTO(addUserRequest, username);
			initDTO.addAddingRequest(addUserRequestDTO);
		}	
		return initDTO;
	}
}
