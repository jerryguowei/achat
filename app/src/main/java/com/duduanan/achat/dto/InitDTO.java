package com.duduanan.achat.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.duduanan.achat.dto.message.PrivateMessageListDTO;

public class InitDTO {
	private UserDTO user;
	private List<UserDTO> friends;
	private Map<String, PrivateMessageListDTO> privateMessage = new HashMap<>();
	private List<UserRequestDTO> addingRequest = new ArrayList<>();

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	public List<UserDTO> getFriends() {
		return friends;
	}

	public void setFriends(List<UserDTO> friends) {
		this.friends = friends;
	}

	public Map<String, PrivateMessageListDTO> getPrivateMessage() {
		return privateMessage;
	}
	
	public void setPrivateMessagePerUser(String username, PrivateMessageListDTO privateMessageListDTO) {
		if(privateMessage == null) {
			privateMessage = new HashMap<>(friends != null ? friends.size() : 16);
		}
		privateMessage.put(username, privateMessageListDTO);
	}

	public void setPrivateMessage(Map<String, PrivateMessageListDTO> privateMessage) {
		this.privateMessage = privateMessage;
	}

	public List<UserRequestDTO> getAddingRequest() {
		return addingRequest;
	}

	public void setAddingRequest(List<UserRequestDTO> addingRequest) {
		this.addingRequest = addingRequest;
	}
	
	public void addAddingRequest(UserRequestDTO addUserRequestDTO) {
		this.addingRequest.add(addUserRequestDTO);
	}
}
