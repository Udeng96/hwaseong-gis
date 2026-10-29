package com.eseict.gis.socket.send;

import com.eseict.gis.socket.rinoEvent.message.GeneralMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;
import java.nio.charset.StandardCharsets;

/**
 * @desc      MRS에 이벤트를 보낼 때 사용하는 소켓 전송부
 * @pkg_name  com.eseict.tpm.domain.rino
 * @file_name GeneralMessage.java
 * @since     2018. 05. 09.
 * @author    ESE
 * Copyright(c)2017 by ESE co.ltd. All rights reserved (http://www.localhost)
 */
public class SocketTempSendProcImpl {
	static Logger logger = LoggerFactory.getLogger(SocketTempSendProcImpl.class);

	private final String host;
	private final int port;


	public SocketTempSendProcImpl(String host, int port){
		this.host = host;
		this.port = port;
	}

	public boolean send(GeneralMessage gm) throws SocketException{
		logger.info("SOCKET SEND START [{}:{}]", host, port);
		boolean result = false;

		Socket client = null;
		BufferedOutputStream bos = null;

		logger.trace("send header \n{}", new String(gm.getHeader(), StandardCharsets.UTF_8));
		logger.info("send to MRS body ]] {}", new String(gm.getBody(), StandardCharsets.UTF_8));

		// 송신 부
		int retryCnt = 3;			// 재전송 횟숭
		int respTimeout = 5000;		// 응답 타임 아웃
		int connTimeout = 5000;	// 연결 타임 아웃

		for (int i=0 ; i<retryCnt ; i++){
			try {

				client = new Socket();
				client.connect(new InetSocketAddress(host, port), connTimeout);		// 소켓 연결 타입아웃 시간 설정
				client.setSoTimeout(respTimeout);

				bos = new BufferedOutputStream(client.getOutputStream());

				bos.write(gm.getHeader());
				bos.write(gm.getBody());
				bos.flush();

				result = true;
				break;
			} catch (SocketException e){
				logger.error(e.getMessage(),e);
			} catch (IOException e){
//				 소켓 전송 실패
				logger.error(e.getMessage(),e);
			} finally {
				if (bos != null){
					try {
						bos.close();
					} catch (IOException e) {
						logger.error(e.getMessage(),e);
					}
				}
				if (client != null){
					try {
						client.close();
					} catch (IOException e) {
						logger.error(e.getMessage(),e);
					}
				}
			}

			if (result) {
				break;
			}
		}

		if (!result) {
			throw new SocketException("SOCKET SEND ERROR");
		} else {
			logger.info("SOCKET SEND SUCCESS [{}:{}]", host,port);
		}

		return result;
	}
}
