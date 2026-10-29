package com.eseict.gis.config.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Component
public class RinoEventWebsocketConfig extends TextWebSocketHandler {

    private static List<WebSocketSession> WEB_SOCKET_SESSION_LIST = new ArrayList<>();

    private static final Logger _logger = LoggerFactory.getLogger(RinoEventWebsocketConfig.class);

    public static List<WebSocketSession> getSessionList(){
        return WEB_SOCKET_SESSION_LIST;
    }


    //web socket이 연결되었을 때,
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        WEB_SOCKET_SESSION_LIST.add(session);
        super.afterConnectionEstablished(session);
        _logger.info("# Rino Event WebSocket is Opened :: {}", session.getRemoteAddress().toString());
    }

    //web socket 연결이 끝났을 때
    @Override
    public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
        WEB_SOCKET_SESSION_LIST.remove(webSocketSession);
        _logger.info("# Rino Event WebSocket is Closed :: {}", webSocketSession.getRemoteAddress().toString());
    }
}
