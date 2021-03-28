package com.duduanan.achat.dto;

public class SocketUserRequestDTO {
	public enum ACTION {
		REQUEST,
		ACCEPT,
		REJECT,
		VIEW
	}
	private ACTION action;
	private UserRequestDTO userRequestDTO;
	public ACTION getAction() {
		return action;
	}
	public void setAction(ACTION action) {
		this.action = action;
	}
	public UserRequestDTO getUserRequestDTO() {
		return userRequestDTO;
	}
	public void setUserRequestDTO(UserRequestDTO userRequestDTO) {
		this.userRequestDTO = userRequestDTO;
	}
}
