package com.eseict.gis.socket.rinoEvent.rcv.queue.event;


import com.eseict.gis.config.websocket.RinoEventWebsocketConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;

public class SocketMsgQueuePolling implements Runnable {

	static Logger logger = LoggerFactory.getLogger(SocketMsgQueuePolling.class);
	
	private static SocketMsgQueue msgQueue = SocketMsgQueue.getInstance();
	
	boolean bRunning = true;
	
	@Override
	public void run() {
		while(bRunning){
			try {
				String msg = msgQueue.take();
				if(msg == null || msg.isEmpty()){
					Thread.sleep(0);
					continue;
				}

				RinoEventWebsocketConfig.getSessionList().forEach(session -> {
					try {
						session.sendMessage(new TextMessage(msg));
					} catch (IOException e) {
						e.printStackTrace();
					}
				});

				Thread.sleep(0);
			} catch (InterruptedException e) {
				//logger.error(e.getMessage(),e);
				logger.error(e.getMessage(),e);
//				Thread.currentThread().interrupt();
			}
		}
	}
	
	public void stop(){
		bRunning = false;
	}
	
}
