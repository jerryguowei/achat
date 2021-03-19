package com.duduanan.achat.service;

import com.duduanan.achat.dto.UserRequestDTO;

import java.util.List;

import com.duduanan.achat.dto.UserMessageDTO;

public interface BroadcastService {
	public void sendPrivateMessage(String targetUsername, List<UserMessageDTO> message);
	
	public void sendAddingUserRequest(String targetUsername, List<UserRequestDTO> request);
}
