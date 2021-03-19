package com.duduanan.achat.dto;

public class MessageRequestDTO {
	private String username;
	private Integer page;
	private Integer pageSize;
	
	public MessageRequestDTO() {
	}
	public MessageRequestDTO(String username, Integer page, Integer pageSize) {
		super();
		this.username = username;
		this.page = page;
		this.pageSize = pageSize;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	
	
}
