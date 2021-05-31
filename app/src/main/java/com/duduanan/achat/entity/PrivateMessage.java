package com.duduanan.achat.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "private_message")
public class PrivateMessage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long msgId;
	
	@ManyToOne
	@JoinColumn(name = "from_user")
	private UserInfo fromUser;
	
	@ManyToOne
	@JoinColumn(name = "to_user")
	private UserInfo toUser;
	
	private String message;
	
	private String attachments;
	
	private Date time;
	
	private Integer viewed = 0;
	
	private String state;

	public Long getMsgId() {
		return msgId;
	}

	public void setMsgId(Long msgId) {
		this.msgId = msgId;
	}

	public UserInfo getFromUser() {
		return fromUser;
	}

	public void setFromUser(UserInfo fromUser) {
		this.fromUser = fromUser;
	}

	public UserInfo getToUser() {
		return toUser;
	}

	public void setToUser(UserInfo toUser) {
		this.toUser = toUser;
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
	
	public Integer getViewed() {
		return viewed;
	}

	public void setViewed(Integer viewed) {
		this.viewed = viewed;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((msgId == null) ? 0 : msgId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PrivateMessage other = (PrivateMessage) obj;
		if (msgId == null) {
			if (other.msgId != null)
				return false;
		} else if (!msgId.equals(other.msgId))
			return false;
		return true;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}
