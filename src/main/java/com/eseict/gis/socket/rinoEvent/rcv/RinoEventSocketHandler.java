package com.eseict.gis.socket.rinoEvent.rcv;

import com.eseict.gis.socket.rinoEvent.message.GeneralMessage;
import com.eseict.gis.socket.rinoEvent.rcv.queue.event.SocketMsgQueue;
import com.eseict.gis.socket.rinoEvent.util.HeaderUtil;
import com.google.common.collect.Lists;
import io.netty.channel.AdaptiveRecvByteBufAllocator;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.RecvByteBufAllocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.util.List;

public class RinoEventSocketHandler extends ChannelInboundHandlerAdapter {

    static Logger _logger = LoggerFactory.getLogger(RinoEventSocketHandler.class);
    private String localPort;
    //ByteBuf 싸이즈 변경 replaying decoder 사용시 replay 횟수 감소
    private static final RecvByteBufAllocator recvByteBufAllocator = new AdaptiveRecvByteBufAllocator(1024, 8192, 32768);

    public static List<ChannelHandlerContext> CHANNEL_HANDLER_CONTEXT_LIST = Lists.newArrayList();

    private static String LORA_DATA = "";

    @Override
    public void channelActive(ChannelHandlerContext ctx) {	// ChannelHandlerContext 오픈시 실행 ( 처음 접속시 )
        localPort = ctx.channel().localAddress().toString().split(":")[1];
        String remoteIp = ctx.channel().remoteAddress().toString().substring(1).split(":")[0];
        _logger.info("localPort =[{}]",localPort);
        _logger.info("remoteIp =[{}]",remoteIp);
        CHANNEL_HANDLER_CONTEXT_LIST.add(ctx);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        CHANNEL_HANDLER_CONTEXT_LIST.remove(ctx);
        super.channelInactive(ctx);
    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) {
        ctx.channel().config().setRecvByteBufAllocator(recvByteBufAllocator);
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws UnsupportedEncodingException {
        GeneralMessage gm = (GeneralMessage) msg;
        _logger.info("Rino Event Rcv :: body  ]{}", new String(gm.getBody(), "UTF-8"));


        try{
            byte[] mepByte = new byte[HeaderUtil.getHeaderItemLength(HeaderUtil.MSG_EXCH_PATRN)];
            System.arraycopy(gm.getHeader(), HeaderUtil.getHeaderItemStartPos(HeaderUtil.MSG_EXCH_PATRN), mepByte, 0, mepByte.length);
            String mep = new String(mepByte);
            if (mep.equals("1")) {	// one way
                _logger.info("mep :: " + mep);
            } else if (mep.equals("2")) {	// one way ack
                GeneralMessage ackGm = new GeneralMessage();
                ackGm.setHeader(HeaderUtil.makeAckHeader(gm.getHeader(), "", "3"));
                ctx.writeAndFlush(ackGm);
                _logger.info("ACK HEADER [{}]", new String(ackGm.getHeader(), "UTF-8"));
            }

            String bodyStr = new String(gm.getBody(), "UTF-8");
            bodyStr = bodyStr.trim();
            SocketMsgQueue.getInstance().put(bodyStr);
        }catch(Exception e){
            e.printStackTrace();
            _logger.error(e.getMessage());
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        _logger.error(cause.getMessage());
        ctx.close();
    }
}
