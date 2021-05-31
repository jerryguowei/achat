package com.duduanan.achat.dto.message;

import com.duduanan.achat.dto.UserDTO;

public class NoticeFriendDTO {
	public enum NoticeType{
		UPDATE,
		REMOVE,
	}
	private NoticeType type;
	private UserDTO userDTO;
	
	public NoticeFriendDTO() {
		
	}
	public NoticeFriendDTO(NoticeType type, UserDTO userDTO) {
		super();
		this.type = type;
		this.userDTO = userDTO;
	}
	public NoticeType getType() {
		return type;
	}
	public void setType(NoticeType type) {
		this.type = type;
	}
	public UserDTO getUserDTO() {
		return userDTO;
	}
	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}
}
