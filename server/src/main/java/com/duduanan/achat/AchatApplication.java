package com.duduanan.achat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.security.web.session.SessionManagementFilter;

import com.duduanan.achat.session.SessionManagement;
@ServletComponentScan
@SpringBootApplication
public class AchatApplication {

	public static void main(String[] args) {
		SpringApplication sp = new SpringApplication(AchatApplication.class);
		sp.run(args);
	}

}
