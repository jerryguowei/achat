package com.duduanan.achat.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duduanan.achat.dto.InitDTO;
import com.duduanan.achat.service.MainService;
//@CrossOrigin(origins = "http://localhost:3000",  maxAge = 3600)
@RestController
public class MainController {
    private final Log logger = LogFactory.getLog(MainController.class);
    
    @Autowired
    private MainService mainService;
    
    
    @RequestMapping("/api/init")
    public InitDTO init(@AuthenticationPrincipal UserDetails userDetails) {
    	logger.info("start init.");
    	return mainService.appInit(userDetails.getUsername());
    }
}
