package com.duduanan.achat.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.duduanan.achat.entity.AddUserRequest;

public interface AddUserRequestRepository extends CrudRepository<AddUserRequest, Long> {
	
	@Query("SELECT a FROM add_user_request a WHERE (a.toUser.userId = ?1 OR a.fromUser.userId = ?1) AND a.requestTime >= ?2 ")
	List<AddUserRequest> findPendingList(Long userId, Date time, Sort sort);
	
}
