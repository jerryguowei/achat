package com.duduanan.achat.dto.message;

import java.util.ArrayList;
import java.util.List;

import com.duduanan.achat.dto.UserMessageDTO;

public class PrivateMessageListDTO {
	private Long minMsgId;
	private List<UserMessageDTO> messageList = new ArrayList<>();
	
	public PrivateMessageListDTO() {
	}
	
	public PrivateMessageListDTO(Long minMsgId, List<UserMessageDTO> messageList) {
		super();
		this.minMsgId = minMsgId;
		this.messageList = messageList;
	}
	public Long getMinMsgId() {
		return minMsgId;
	}
	public void setMinMsgId(Long minMsgId) {
		this.minMsgId = minMsgId;
	}
	public List<UserMessageDTO> getMessageList() {
		return messageList;
	}
	public void setMessageList(List<UserMessageDTO> messageList) {
		this.messageList = messageList;
	}
}
