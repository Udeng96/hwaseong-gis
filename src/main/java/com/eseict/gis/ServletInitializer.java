package com.eseict.gis;

import com.localhostmon.web.WebApplicationContextUtil;
import com.eseict.gis.socket.rinoEvent.rcv.RinoEventSocketServer;
import com.eseict.gis.socket.rinoEvent.rcv.queue.event.SocketMsgQueuePolling;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;

@ComponentScan("com.eseict")
@Component
@RequiredArgsConstructor
public class ServletInitializer extends SpringBootServletInitializer {

    public static Logger logger = LoggerFactory.getLogger(ServletInitializer.class);

    @Value("${system.values.port.socket}")
    private String socketPort;


    @Autowired
    WebApplicationContext wac;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(GisApplication.class);
    }

    @PostConstruct
    public void initialization(){
        logger.info("===========================================================================================================================");
        logger.info("application initalization in progress....................");
        WebApplicationContextUtil.getInstance().setServletContext(wac.getServletContext());

        RinoEventSocketServer.getinstance(socketPort).init();
        SocketMsgQueuePolling msgPolling = new SocketMsgQueuePolling();
        Thread msgPollingThread = new Thread(msgPolling);
        msgPollingThread.start();

        logger.info("application initalization in progress....................END!");
        logger.info("===========================================================================================================================");

    }

}
