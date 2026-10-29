package com.eseict.gis.socket.rinoEvent.message;

import java.io.Serializable;

/**
 * @desc      MRS에 이벤트를 보낼 때 사용하는 기본 메세지 VO
 * @pkg_name  com.eseict.tpm.domain.rino
 * @file_name GeneralMessage.java
 * @since     2018. 05. 09.
 * @author    ESE
 * Copyright(c)2017 by ESE co.ltd. All rights reserved (http://www.localhost)
 */
public class GeneralMessage implements Serializable {
	private static final long serialVersionUID = 2657355430074131014L;
	
	private byte[] headerTyp = {};
    private byte[] header = {};
    private byte[] body = {};

    public GeneralMessage() {
    }

	public byte[] getHeader() {
		return header;
	}

	public void setHeader(byte[] header) {
		this.header = header;
	}
	
	public byte[] getBody() {
		return body;
	}

	public void setBody(byte[] body) {
		this.body = body;
	}

	public byte[] getHeaderTyp() {
		return headerTyp;
	}

	public void setHeaderTyp(byte[] headerTyp) {
		this.headerTyp = headerTyp;
	}



}