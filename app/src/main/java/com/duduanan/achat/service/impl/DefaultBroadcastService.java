package com.duduanan.achat.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.dto.message.NoticeFriendDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.service.BroadcastService;

@Service
public class DefaultBroadcastService implements BroadcastService {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@Override
	public void sendPrivateMessage(String targetUsername, List<UserMessageDTO> messageList) {
		this.simpMessagingTemplate.convertAndSendToUser(targetUsername, "/queue/message", messageList);
	}

	@Override
	public void sendAddingUserRequest(String targetUsername, List<UserRequestDTO> requestList) {
		this.simpMessagingTemplate.convertAndSendToUser(targetUsername, "/queue/request", requestList);
	}

	@Override
	public void sendChangeFriend(String targetUsername, NoticeFriendDTO noticeFriendDTO) {
		this.simpMessagingTemplate.convertAndSendToUser(targetUsername, "/queue/user", noticeFriendDTO);	
	}
}
