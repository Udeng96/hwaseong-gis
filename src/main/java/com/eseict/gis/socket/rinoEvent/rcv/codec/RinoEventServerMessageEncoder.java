package com.eseict.gis.socket.rinoEvent.rcv.codec;


import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;

public class RinoEventServerMessageEncoder extends MessageToByteEncoder<String> { // GeneralMessage
	static Logger _logger = LoggerFactory.getLogger(RinoEventServerMessageEncoder.class);
	@Override
    protected void encode(final ChannelHandlerContext ctx, String gm, ByteBuf out) {
		try {
			_logger.info("ACK RETURN [{}]", new String(gm.getBytes(),"UTF-8"));
//			out.writeBytes(gm.getHeader());
			out.writeBytes(gm.getBytes());
			out.release();
			ctx.flush();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			_logger.error(e.getMessage(),e);
		}
    }
}