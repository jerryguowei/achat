package com.duduanan.achat.repository;

import org.springframework.data.repository.CrudRepository;

import com.duduanan.achat.entity.UserInfo;

public interface UserRepository extends CrudRepository<UserInfo, Long> {

	UserInfo findByUsername(String username);
	
	UserInfo findByEmail(String email);
	
	@SuppressWarnings("unchecked")
	UserInfo save(UserInfo userinfo);
	
}
