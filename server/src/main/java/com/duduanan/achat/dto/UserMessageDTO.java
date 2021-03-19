package com.duduanan.achat.dto;

import java.util.Date;

import com.duduanan.achat.entity.PrivateMessage;
import com.duduanan.achat.jackson.NullStringSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonInclude(value = Include.NON_NULL)
public class UserMessageDTO {
	
	private SideType type = SideType.FROM;
	private Long messageId;
	private String fromUsername;
	private String toUsername;
	private String message;
	@JsonSerialize(nullsUsing = NullStringSerializer.class)
	private String attachments;
	private Date time;
	private Integer viewed = 0;
		
	public UserMessageDTO() {
		
	}
	
	public UserMessageDTO(PrivateMessage privateMessage, SideType type) {
		this.messageId = privateMessage.getMsgId();
		this.fromUsername = privateMessage.getFromUser().getUsername();
		this.toUsername = privateMessage.getToUser().getUsername();
		this.message = privateMessage.getMessage();
		this.attachments = privateMessage.getAttachments();
		this.time = privateMessage.getTime();
		this.type = type;
		this.viewed = privateMessage.getViewed();
	}
	
	public UserMessageDTO(PrivateMessage privateMessage, String loginUsername) {
		this.messageId = privateMessage.getMsgId();
		this.fromUsername = privateMessage.getFromUser().getUsername();
		this.toUsername = privateMessage.getToUser().getUsername();
		this.message = privateMessage.getMessage();
		this.attachments = privateMessage.getAttachments();
		this.time = privateMessage.getTime();
		this.viewed = privateMessage.getViewed();
		if(this.fromUsername.equalsIgnoreCase(loginUsername)) {
			this.type= SideType.FROM;
		} else {
			this.type= SideType.TO;
		}
	}
	
	public Long getMessageId() {
		return messageId;
	}
	public void setMessageId(Long messageId) {
		this.messageId = messageId;
	}
	
	public String getFromUsername() {
		return fromUsername;
	}

	public void setFromUsername(String fromUsername) {
		this.fromUsername = fromUsername;
	}

	public String getToUsername() {
		return toUsername;
	}

	public void setToUsername(String toUsername) {
		this.toUsername = toUsername;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getAttachments() {
		return attachments;
	}
	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}

	public SideType getType() {
		return type;
	}

	public void setType(SideType type) {
		this.type = type;
	}

	public Integer getViewed() {
		return viewed;
	}

	public void setViewed(Integer viewed) {
		this.viewed = viewed;
	}
}
