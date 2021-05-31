package com.duduanan.achat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//@ServletComponentScan
@SpringBootApplication
public class AchatApplication {

	public static void main(String[] args) {
		SpringApplication sp = new SpringApplication(AchatApplication.class);
		sp.run(args);
	}

}
