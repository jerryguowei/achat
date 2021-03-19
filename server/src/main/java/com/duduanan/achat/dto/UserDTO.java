package com.duduanan.achat.dto;

import com.duduanan.achat.entity.UserInfo;

public class UserDTO {
    private Long userId;
    private String username;
    private String email;

    public UserDTO() {

    }
    public UserDTO(UserInfo userInfo){
        this.username = userInfo.getUsername();
        this.email = userInfo.getEmail();
        this.userId = userInfo.getUserId();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", username=" + username + ", email=" + email + "]";
	}
}
