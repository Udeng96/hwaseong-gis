package com.eseict.gis.config.websocket;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Component
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final RinoEventWebsocketConfig eventWebsocketHandler;

    public WebSocketConfig(RinoEventWebsocketConfig eventWebsocketHandler) {
        this.eventWebsocketHandler = eventWebsocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(eventWebsocketHandler, "/rino/event").setAllowedOrigins("*");
    }
}
