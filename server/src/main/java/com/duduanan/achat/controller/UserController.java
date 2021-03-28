package com.duduanan.achat.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duduanan.achat.dto.UserRequestDTO;
import com.duduanan.achat.dto.MessageRequestDTO;
import com.duduanan.achat.dto.UserDTO;
import com.duduanan.achat.dto.UserMessageDTO;
import com.duduanan.achat.dto.UserRegistractionDTO;
import com.duduanan.achat.service.UserService;
import com.duduanan.achat.service.impl.LoginUserDetails;

@RestController
@RequestMapping("/api/user")
public class UserController {
	 private final Log logger = LogFactory.getLog(MainController.class);
	    @Autowired
	    private UserService userService;
	
    @PostMapping("/login")
    public UserDTO login() {
       logger.info("start login.");
       LoginUserDetails loginUserDetails = (LoginUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       String username = loginUserDetails.getUsername();
       return userService.findUser(username);
    }
    
    
    @PostMapping("/register")
    public UserDTO register(@Valid @RequestBody  UserRegistractionDTO registractionDTO){
    	logger.info("start register.");
        return userService.create(registractionDTO);
    }
    
    @GetMapping("/find/{username}")
    public UserDTO findUser(@PathVariable String username) {
    	return userService.findUser(username);
    }
    
    @GetMapping("/search/{username}")
    public List<UserDTO> searchUser(@PathVariable String username) {
    	return userService.findMatchUser(username);
    }
      
    @PostMapping("/add")
    public UserRequestDTO addUser(@Valid @RequestBody UserRequestDTO addUserRequestDTO,
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to add user.");
    	return userService.addUser(addUserRequestDTO, userDetails.getUsername());
    }
    
    @PostMapping("/accept")
    public UserDTO accpetRequest(@Valid @RequestBody UserRequestDTO addUserRequestDTO, 
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to accept user.");
    	return userService.acceptUser(addUserRequestDTO, userDetails.getUsername());
    }
    
    @PostMapping("/reject")
    public UserRequestDTO rejectRequest(@Valid @RequestBody UserRequestDTO addUserRequestDTO, 
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to reject user.");
    	return userService.rejectUser(addUserRequestDTO, userDetails.getUsername());
    }
    
    @DeleteMapping("/friends/{friendUsername}")
    public UserDTO removeFriends(@PathVariable String friendUsername, @AuthenticationPrincipal UserDetails userDetails) {   	
    	return userService.removeFriends(friendUsername, userDetails);
    }
    
    
    
    @GetMapping("/message")
    public List<UserMessageDTO> getMessage(@RequestParam("username") String username, 
    		@RequestParam("page") Integer page,  @RequestParam("pageSize") Integer pageSize,  
    		@AuthenticationPrincipal UserDetails userDetails){
    	
    	MessageRequestDTO messageRequestDTO = new MessageRequestDTO();
    	messageRequestDTO.setUsername(username);
    	messageRequestDTO.setPage(page);
    	messageRequestDTO.setPageSize(pageSize);
    	return userService.findMessages(messageRequestDTO, userDetails.getUsername());
    }
    
    @PostMapping("/message")
    public UserMessageDTO sendMessage(@Valid @RequestBody UserMessageDTO userMessageDTO, 
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to send message");
    	
    	return userService.sendMessage(userMessageDTO, userDetails.getUsername());
    }
    
    @PostMapping("/message/view")
    public List<UserMessageDTO> viewMessage(@Valid @RequestBody List<UserMessageDTO> userMessageDTOList, 
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to view message");
    	Set<Long> messageIds = userMessageDTOList.stream().map(msg->msg.getMessageId()).collect(Collectors.toSet());
    	return userService.viewedMessage(messageIds, userDetails.getUsername());
    }
    
    @PostMapping("/request/view")
    public UserRequestDTO viewRequest(@Valid @RequestBody UserRequestDTO userRequestDTO, 
    		@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start to view request.");
    	return userService.viewRequest(userRequestDTO.getId(), userDetails.getUsername());
    }
}
