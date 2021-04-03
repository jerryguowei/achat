package com.duduanan.achat.service;

import java.util.List;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import com.duduanan.achat.dto.MessageRequestDTO;
import com.duduanan.achat.dto.UserDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.dto.UserRegistractionDTO;
import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.entity.UserInfo;

public interface UserService {
    
	UserDTO create(UserRegistractionDTO registractionDTO);
	
	UserDTO findUser(String username);
	
	List<UserDTO> findMatchUser(String username);
	
	UserRequestDTO addUser(UserRequestDTO addUserRequestDTO, String loginUsername);
					
	UserDTO acceptUser(UserRequestDTO addUserRequestDTO, String loginUsername);
	
	UserRequestDTO rejectUser(UserRequestDTO addUserRequestDTO, String loginUsername);
	
	UserRequestDTO viewRequest(Long requestId, String loginUsername);
	
	List<UserMessageDTO> findMessages(MessageRequestDTO messageRequestDTO, String loginUsername);
	
	List<UserMessageDTO> findMessages(UserInfo toUser, Integer page, Integer pageSize, UserInfo loginUser);
	
	UserMessageDTO sendMessage(UserMessageDTO userMessageDTO, String loginUsername, MultipartFile file);
	
	UserDTO removeFriends(String friendUsername, UserDetails userDetails);
	
	List<UserMessageDTO> viewedMessage(Set<Long> messageIdSet, String loginUsername);

//    UserInfo findUserInfoByUserName(String username);
//
//    List<UserInfo> findFriends(String username);
//
//    List<GroupInfo> findOwningGroups(String username);
//
//    UserInfo addGroupToUser(String username, String groupUniqueKey);
//    
//    UserInitReponseDTO getUserInitInfo(String username);

}
