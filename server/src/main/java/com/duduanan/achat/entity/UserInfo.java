package com.duduanan.achat.entity;

import javax.persistence.*;

import org.hibernate.annotations.NaturalId;

import com.duduanan.achat.dto.UserRegistractionDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity(name = "user_info")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NaturalId
    @Column
    private String username;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private boolean active;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column
    private Date updateDate;

      
    @ManyToMany
    @JoinTable(name = "user_user_relation", 
    	joinColumns = {@JoinColumn(name = "from_user")},
    	inverseJoinColumns = {@JoinColumn(name="to_user")}
    )  
    private Set<UserInfo> friends;
    
    
    @OneToMany(mappedBy = "fromUser")
    private List<AddUserRequest> sentAddingUserRequest;
    
    @OneToMany(mappedBy = "toUser")
    private List<AddUserRequest> receivedAddingUserRequest;
    
    public UserInfo() {
    	
    }
    
    public UserInfo(UserRegistractionDTO registractionDTO) {
        this.setUsername(registractionDTO.getUsername());
        this.setPassword(registractionDTO.getPassword());
        this.setEmail(registractionDTO.getEmail());
        this.setActive(true);
        this.setCreateDate(new Date());
        this.setUpdateDate(new Date());
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserInfo userInfo = (UserInfo) o;
        return Objects.equals(username, userInfo.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

	public Set<UserInfo> getFriends() {
		return friends;
	}
	
	public void setFriends(Set<UserInfo> friends) {
		this.friends = friends;
	}
    
	public void addFriends(UserInfo userInfo) {
		if(friends == null) {
			friends = new HashSet<>();
		}
		if(!friends.contains(userInfo)) {
			friends.add(userInfo);
			userInfo.addFriends(this);
		}
	}

	public List<AddUserRequest> getSentAddingUserRequest() {
		return sentAddingUserRequest;
	}

	public void setSentAddingUserRequest(List<AddUserRequest> sentAddingUserRequest) {
		this.sentAddingUserRequest = sentAddingUserRequest;
	}
	
	public void addSentAddingUserRequest(AddUserRequest addUserRequest) {
		if(this.sentAddingUserRequest == null) {
			this.sentAddingUserRequest = new ArrayList<>();
		}
		this.sentAddingUserRequest.add(addUserRequest);
		addUserRequest.setFromUser(this);
	}

	public List<AddUserRequest> getReceivedAddingUserRequest() {
		return receivedAddingUserRequest;
	}

	public void setReceivedAddingUserRequest(List<AddUserRequest> receivedAddingUserRequest) {
		this.receivedAddingUserRequest = receivedAddingUserRequest;
	}

	public void addReceivedAddingUserRequest(AddUserRequest addUserRequest) {
		if(this.receivedAddingUserRequest == null) {
			this.receivedAddingUserRequest = new ArrayList<>();
		}
		this.receivedAddingUserRequest.add(addUserRequest);
		addUserRequest.setToUser(this);
	}
}
