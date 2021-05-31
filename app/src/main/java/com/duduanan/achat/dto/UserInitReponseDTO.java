package com.duduanan.achat.dto;

import java.util.List;
import java.util.Map;

public class UserInitReponseDTO {
	
	private UserDTO user;
	
	private List<UserDTO> friendList;
		
	private Map<Long, List<UserMessageDTO>> userIdToMessagesMap;
	

	public List<UserDTO> getFriendList() {
		return friendList;
	}

	public void setFriendList(List<UserDTO> friendList) {
		this.friendList = friendList;
	}

	public Map<Long, List<UserMessageDTO>> getUserIdToMessagesMap() {
		return userIdToMessagesMap;
	}

	public void setUserIdToMessagesMap(Map<Long, List<UserMessageDTO>> userIdToMessagesMap) {
		this.userIdToMessagesMap = userIdToMessagesMap;
	}


	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "UserInitReponseDTO [user=" + user + ", friendList=" + friendList 
				+ ", userIdToMessagesMap=" + userIdToMessagesMap
				+ "]";
	}
}
