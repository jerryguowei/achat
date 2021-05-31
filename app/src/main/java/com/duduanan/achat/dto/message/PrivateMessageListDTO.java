package com.duduanan.achat.dto.message;

import java.util.ArrayList;
import java.util.List;

import com.duduanan.achat.dto.UserMessageDTO;

public class PrivateMessageListDTO {
	private boolean hasMoreMessage = true;
	private List<UserMessageDTO> messageList = new ArrayList<>();
	
	public PrivateMessageListDTO() {
	}
	
	public PrivateMessageListDTO(boolean hasMoreMessage, List<UserMessageDTO> messageList) {
		super();
		this.hasMoreMessage = hasMoreMessage;
		this.messageList = messageList;
	}
	public List<UserMessageDTO> getMessageList() {
		return messageList;
	}
	public void setMessageList(List<UserMessageDTO> messageList) {
		this.messageList = messageList;
	}

	public boolean isHasMoreMessage() {
		return hasMoreMessage;
	}

	public void setHasMoreMessage(boolean hasMoreMessage) {
		this.hasMoreMessage = hasMoreMessage;
	}
	
}
