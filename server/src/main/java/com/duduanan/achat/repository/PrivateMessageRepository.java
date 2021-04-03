package com.duduanan.achat.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.duduanan.achat.entity.PrivateMessage;

public interface PrivateMessageRepository extends CrudRepository<PrivateMessage, Long> {
	
	
	@Query("SELECT p FROM private_message p WHERE (p.fromUser.userId = ?1 AND p.toUser.userId = ?2) OR (p.toUser.userId = ?1 AND p.fromUser.userId = ?2)")
	Page<PrivateMessage> findBy(Long fromUser, Long toUser, Pageable pageable);
		
	@Modifying
	@Query(value = "DELETE FROM private_message p WHERE (p.from_user = ?1 AND p.to_user = ?2) OR (p.from_user = ?2 AND p.to_user = ?1)",
	nativeQuery = true)
	void deleteMessagesBetweenUsers(Long userId1, Long userId2);
	//only the toUser can update the view status
	@Query("SELECT p FROM private_message p WHERE p.toUser.username = ?2 AND p.msgId in ( ?1 ) AND p.viewed = 0 ")
	List<PrivateMessage> findByMessageIds(Set<Long> messageIds, String toUsername, Sort sort);
	
	@Query(value =  "select t.msg_id from achat.private_message t where (t.from_user = ?1 AND to_user = ?2 OR t.to_user= ?1 AND t.from_user = ?2) "
			+ "ORDER BY t.msg_id limit 1 ", nativeQuery = true)
	Long findMinMsgId(Long fromUserId, Long toUserId);
	
	
	@Query(value= "select count(*) from private_message t  where (t.from_user = ?1 AND to_user = ?2 OR t.to_user= ?1 AND t.from_user = ?2)", nativeQuery = true)
	Long countMessages(Long fromUserId, Long toUserId);
}
