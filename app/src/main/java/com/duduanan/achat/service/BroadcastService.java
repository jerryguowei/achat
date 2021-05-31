package com.duduanan.achat.service;

import java.util.List;

import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.dto.message.NoticeFriendDTO;

public interface BroadcastService {
	public void sendPrivateMessage(String targetUsername, List<UserMessageDTO> message);
	
	public void sendAddingUserRequest(String targetUsername, List<UserRequestDTO> request);
	
	public void sendChangeFriend(String targetUsername, NoticeFriendDTO noticeFriendDTO);
}
