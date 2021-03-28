package com.duduanan.achat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.duduanan.achat.entity.UserInfo;

public interface UserRepository extends CrudRepository<UserInfo, Long> {

	UserInfo findByUsername(String username);
	
	UserInfo findByEmail(String email);
	
	@SuppressWarnings("unchecked")
	UserInfo save(UserInfo userinfo);
	
	
	@Query(value = "select t.* from user_info t where t.username like %?1% limit 10", nativeQuery = true)
	List<UserInfo> findMatchUser(String username);
	
}
