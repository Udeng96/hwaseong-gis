package com.eseict.gis.socket.rinoEvent.rcv.codec;


import com.localhostmon.base.ByteSupport;
import com.localhostmon.base.ByteSupportException;
import com.localhostmon.log.LoggerManager;
import com.eseict.gis.socket.rinoEvent.message.GeneralMessage;
import com.eseict.gis.socket.rinoEvent.util.HeaderUtil;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;
import org.slf4j.Logger;

import java.io.UnsupportedEncodingException;
import java.nio.ByteOrder;
import java.util.List;


/**
 * Class Name 	: ServerMessageDecoder.java
 * Description 	: 서버 메시지 디코더
 * Modification Information
 *
 *       수정일			수정자			수정내용
 *    -----------      -----------     	---------------------
 *
 *
 * @author
 * @since 2014.10
 * @version 1.0
 */
public class RinoEventServerMessageDecoder extends ByteToMessageDecoder {
	static Logger logger = LoggerManager.getLogger(RinoEventServerMessageDecoder.class);

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in,
						  List<Object> out) {

		try {
			// 수신된 메시지가 최소한 헤더 사이즈 크기
			if (in.readableBytes() < HeaderUtil.getHeaderTotalLen()) {
//				logger.error("MESSIGE SIZE ERROR");
				return;
			}
			logger.info("capacity {} , readable {}", in.capacity(), in.readableBytes());

//			 읽는 위치 마크
//			in.markReaderIndex();

			// 헤더 읽기
			byte[] headerArr = new byte[HeaderUtil.getHeaderTotalLen()];
			in.readBytes(headerArr);

			logger.info("header total len =  {}", HeaderUtil.getHeaderTotalLen());
			logger.info("body len =  {}",HeaderUtil.getHeaderItemLength(HeaderUtil.BODY_LEN));
			logger.info("body start pos =  {}",HeaderUtil.getHeaderItemStartPos(HeaderUtil.BODY_LEN));

			// 헤더 타입 코드
			byte[] headerTypCdByte = new byte[HeaderUtil.getHeaderItemLength(HeaderUtil.HEDR_TYP_CD)];
			System.arraycopy(headerArr, HeaderUtil.getHeaderItemStartPos(HeaderUtil.HEDR_TYP_CD), headerTypCdByte, 0, HeaderUtil.getHeaderItemLength(HeaderUtil.HEDR_TYP_CD));
			String headerTypCd = new String(headerTypCdByte, "UTF-8");

			// 바디 사이즈 읽기
			byte[] bodyLenArr = new byte[HeaderUtil.getHeaderItemLength(HeaderUtil.BODY_LEN)];
			System.arraycopy(headerArr, HeaderUtil.getHeaderItemStartPos(HeaderUtil.BODY_LEN), bodyLenArr,0 , HeaderUtil.getHeaderItemLength(HeaderUtil.BODY_LEN));
			int bodyLen = ByteSupport.byteArrayToInt(bodyLenArr, ByteOrder.LITTLE_ENDIAN);	// byte[] - > int  (little endian)

			// 남은 길이와 바디사이즈 일치 체크
			if (in.readableBytes() == bodyLen) {
				// 바디 읽기
				byte[] bodyArr = new byte[bodyLen];
				in.readBytes(bodyArr);

				// GeneralMessage 셋팅
				GeneralMessage message = new GeneralMessage();
				message.setHeaderTyp(headerTypCdByte);
				message.setHeader(headerArr);
				message.setBody(bodyArr);

				// 핸들러로 전달
				out.add(message);

			} else {
				logger.error("[{}] [ SIZE ERROR ] [ REMAIN : {}, BODY DEMAND : {} ]",  headerTypCd, in.readableBytes(), bodyLen );
			}

		} catch(IndexOutOfBoundsException e) {
			logger.error("예외 발생");
		} catch(ArrayStoreException e) {
			logger.error("예외 발생");
		} catch(UnsupportedOperationException e) {
			logger.error("예외 발생");
		} catch(ClassCastException e) {
			logger.error("예외 발생");
		} catch(IllegalArgumentException e) {
			logger.error("예외 발생");
		} catch (ByteSupportException e) {
			logger.error("예외 발생");
		} catch (UnsupportedEncodingException e) {
			logger.error("예외 발생");
		}
	}



}
