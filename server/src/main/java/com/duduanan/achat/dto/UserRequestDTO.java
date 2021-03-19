package com.duduanan.achat.dto;

import java.util.Date;

import com.duduanan.achat.entity.AddUserRequest;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonInclude(Include.NON_NULL)
public class UserRequestDTO {
	private Long id;
	private String toUsername;
	private String fromUsername;
	private String message;
	private String status;
	private Integer viewed = 0;
	private SideType type = SideType.FROM;
	
	@JsonProperty("reject_message")
	private String rejectMessage;
	
	@JsonProperty("request_time")
	private Date requestTime;
	
	public UserRequestDTO() {
		
	}
	
	public UserRequestDTO(AddUserRequest addUserRequest, String loginUsername) {
		this.id = addUserRequest.getId();
		this.fromUsername = addUserRequest.getFromUser().getUsername();
		this.toUsername = addUserRequest.getToUser().getUsername();
		this.message = addUserRequest.getRequestMessage();
		this.rejectMessage = addUserRequest.getRejectMessage();
		this.requestTime = addUserRequest.getRequestTime();
		this.status = addUserRequest.getStatus().name();
		this.viewed = addUserRequest.getViewed();
		if(loginUsername.equalsIgnoreCase(this.fromUsername)) {
			this.type = SideType.FROM;
		} else {
			this.type = SideType.TO;
		}
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getToUsername() {
		return toUsername;
	}

	public void setToUsername(String toUsername) {
		this.toUsername = toUsername;
	}

	public String getFromUsername() {
		return fromUsername;
	}

	public void setFromUsername(String fromUsername) {
		this.fromUsername = fromUsername;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getRejectMessage() {
		return rejectMessage;
	}
	public void setRejectMessage(String rejectMessage) {
		this.rejectMessage = rejectMessage;
	}
	public Date getRequestTime() {
		return requestTime;
	}
	public void setRequestTime(Date requestTime) {
		this.requestTime = requestTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getViewed() {
		return viewed;
	}

	public void setViewed(Integer viewed) {
		this.viewed = viewed;
	}

	public SideType getType() {
		return type;
	}

	public void setType(SideType type) {
		this.type = type;
	}
}
