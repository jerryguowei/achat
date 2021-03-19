package com.duduanan.achat.controller;

import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import com.duduanan.achat.dto.InitDTO;
import com.duduanan.achat.dto.MessageRequestDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.service.MainService;
import com.duduanan.achat.service.UserService;

@Controller
public class MessageController {
		
	private Logger logger = LoggerFactory.getLogger(MessageController.class);
	
    @Autowired
    private MainService mainService;
    
    @Autowired
    private UserService userService;

    @SubscribeMapping("/init")
    public InitDTO addUser(Principal princiapl) {
    	    	System.out.println(princiapl.getName());
    	return mainService.appInit(princiapl.getName());

    }
    
    @MessageMapping("/message")
    public void sendMessage(UserMessageDTO message, Principal principal) {
    	userService.sendMessage(message, principal.getName());
    	System.out.println(message);
    }
    
    
    @MessageMapping("/more/message")
    public void getMoreMessage(MessageRequestDTO messageRequestDTO, Principal principal) {
    	try {
    	userService.findMessages(messageRequestDTO, principal.getName());
    	} catch (Exception e) {
    		logger.error(e.getMessage(), e);
		}
    }
    
    @MessageMapping("/view")
    public void viewMessage(List<UserMessageDTO> messageList, Principal principal) {
    	
    	Set<Long> messageIds = messageList.stream().map(m -> m.getMessageId()).collect(Collectors.toSet());
    	if(messageIds.isEmpty()) {
    		return;
    	}
    	userService.viewedMessage(messageIds, principal.getName());
    }
}
