package com.duduanan.achat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.duduanan.achat.service.UserService;

@SpringBootTest
class AchatApplicationTests {

	@Autowired
	private UserService uerService;
	
//	@Test
//	void findFriends() {
//		List<UserInfo> friends = uerService.findFriends("jerry");		
//		friends.stream().forEach(friend -> System.out.println(friend.getUsername()));
//	}
//	
//	@Test
//	void findUserInitInfo() {
//	    UserInitReponseDTO userInitReponseDTO = uerService.getUserInitInfo("jerry");
//	    
//	    System.out.println(userInitReponseDTO);
//	}
//	
//	@Test
//	void createGroupTest() {
//
//		UserInfo userInfo = uerService.findUserInfoByUserName("jerry");
//		GroupInfo groupInfo = new GroupInfo();
//		groupInfo.setGroupName("my group");
//		groupInfo.setCreateTime(new Date());
//		groupInfo.setGroupNotice("this is a test group");
//		groupInfo = groupService.create(groupInfo, userInfo);
//		System.out.println(groupInfo.getUniqueKey());
//	}
//
//	@Test
//	void getGroupTest() {
//		List<GroupInfo> groupInfos = uerService.findOwningGroups("jerry");
//		System.out.println(groupInfos.size());
//	}
//
//	@Test
//	void addGroupToUser(){
//		UserInfo userInfo = uerService.addGroupToUser("jerry", "da46dfad-fbe0-46f9-88b4-17f365639fed");
//		List<GroupInfo> groupInfoList = userInfo.getOwningGrupList();
//		System.out.println(groupInfoList.size());
//	}
}
