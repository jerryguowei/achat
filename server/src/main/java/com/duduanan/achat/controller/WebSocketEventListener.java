package com.duduanan.achat.controller;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener{

//	@EventListener
//	public void handleSessionSubscribeEvent(SessionSubscribeEvent event) {
//	    GenericMessage message = (GenericMessage) event.getMessage();
//	    String simpDestination = (String) message.getHeaders().get("simpDestination");
//	    
//	    System.err.println(simpDestination);
//	    System.err.println(event.getUser().getName());
//	    
//		
//	}
	
	@EventListener
	public void handleSessionConnectEvent(SessionConnectedEvent sessionConnectEvent) {
		
		System.err.println("connect: " + sessionConnectEvent.getUser().getName());
	}
	
	@EventListener
	public void handleSessionDisConnectEvent(SessionDisconnectEvent sessionDisconnectEvent) {
		
		System.err.println("disconnect: " + sessionDisconnectEvent.getUser().getName());
	}
}
