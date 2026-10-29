package com.eseict.gis.socket.rinoEvent.util;

import com.eseict.gis.utils.ByteSupport;
import com.eseict.gis.utils.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.nio.ByteOrder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;


/**
 * [설명]
 *
 * @author : ese
 * @file : HeaderUtil.java
 * @package : com.localhostm.util
 * @project : ERS
 * @since : 2017. 3. 31.
 */

public class HeaderUtil {

	public static Logger logger = LoggerFactory.getLogger(HeaderUtil.class);
	public static final String DTM_FORMET = "yyyyMMddHHmmssSSS";
	/*헤더 정보*/
	/**
	 * 메시지 타입 코드 byte 길이. ()
	 */
	public static final int HEADER_TYP_CD_LEN = 2;
	/**
	 * 헤더 타입 코드.
	 */
	public static final int HEDR_TYP_CD = 0;
	/**
	 * 송신 시스템 코드.
	 */
	public static final int SND_SYS_CD = 1;
	/**
	 * 메시지 교환 패턴.
	 */
	public static final int MSG_EXCH_PATRN = 2;
	/**
	 * 데이터부 길이.
	 */
	public static final int BODY_LEN = 3;
	/**
	 * 메시지 타입 코드.
	 */
	public static final int MSG_TYP_CD = 4;
	/**
	 * 트레이스 아이디.
	 */
	public static final int TRCE_ID = 5;
	/**
	 * 전송 시간.
	 */
	public static final int SND_DTM = 6;
	/**
	 * 서비스 아이디.
	 */
	public static final int SVC_ID = 6;

	public static final int OLD_HEADER_TYP_CD_LEN = 1;

	/**
	 * PS2 데이터부 길이.
	 */
	public static final int OLD_BODY_LEN = 12;

	/** The instance. */
	//private static HeaderUtil instance = null;

	/**
	 * The header item len ar. (oldHeader)
	 */
	private static int[] oldHeaderItemLenAr = new int[]{1, 10, 20, 20, 20, 15, 20, 20, 10, 100, 14, 14, 10};

	/**
	 * The header item len ar.
	 */
	private static int[] headerItemLenAr = new int[]{2, 9, 1, 4, 3, 24, 17};

	/**
	 * The header item pos ar. (oldHeader)
	 */
	private static int[] oldHeaderItemStartPosAr = new int[]{0, 1, 11, 31, 51, 71, 86, 106, 126, 136, 236, 250, 264};

	/**
	 * The header item pos ar.
	 */
	private static int[] headerItemStartPosAr = new int[]{0, 2, 11, 12, 16, 19, 43};


	/**
	 * The header item end pos ar.
	 */
	private static int[] headerItemEndPosAr = new int[]{2, 11, 12, 16, 19, 43, 60};

	/**
	 * Instantiates a new header util.
	 */
	private HeaderUtil() {

	}

	/**
	 * Gets the header item length.
	 *
	 * @param fieldId the field id
	 * @return the header item length
	 */
	public static int getHeaderItemLength(int fieldId) {
		return headerItemLenAr[fieldId];
	}

	/**
	 * Gets the old header item length.
	 *
	 * @param fieldId the field id
	 * @return the header item length
	 */
	public static int getOldHeaderItemLength(int fieldId) {
		return oldHeaderItemLenAr[fieldId];
	}

	/**
	 * Gets the old header item pos.
	 *
	 * @param fieldId the field id
	 * @return the header item pos
	 */
	public static int getOldHeaderItemStartPos(int fieldId) {
		return oldHeaderItemStartPosAr[fieldId];
	}

	/**
	 * Gets the header item pos.
	 *
	 * @param fieldId the field id
	 * @return the header item pos
	 */
	public static int getHeaderItemStartPos(int fieldId) {
		return headerItemStartPosAr[fieldId];
	}

	/**
	 * Gets the header item end pos.
	 *
	 * @param fieldId the field id
	 * @return the header item end pos
	 */
	public static int getHeaderItemEndPos(int fieldId) {
		return headerItemEndPosAr[fieldId];
	}

	/**
	 * Gets the old header item total Len.
	 *
	 * @return old header item total Len
	 */
	public static int getOldHeaderTotalLen() {
		int totalLen = 0;
		for (int i : oldHeaderItemLenAr) {
			totalLen += i;
		}
		return totalLen;
	}

	/**
	 * Gets the header item total Len.
	 *
	 * @return header item total Len
	 */
	public static int getHeaderTotalLen() {
		int totalLen = 0;
		for (int i : headerItemLenAr) {
			totalLen += i;
		}
		return totalLen;
	}

	public static byte[] makeAckHeader(byte[] header, String sndSysCd, String mep) throws UnsupportedEncodingException {
		// header 클론 생성
		
		byte[] ackHeader = header.clone();
		// 송신 수신 코드 
		byte[] sndSysCdByte = null;
		try {
			sndSysCdByte = StringUtil.setPad(sndSysCd, getHeaderItemLength(SND_SYS_CD), ' ', StringUtil.PAD_LEFT).getBytes("UTF-8");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} // StringUtilException 처리
		// 메시지 교환 패턴
		byte[] mepByte = mep.getBytes("UTF-8");
		// 바디 길이 (0 으로 지정)
		byte[] bodyLenByte = ByteSupport.intToByteArray(0, ByteOrder.BIG_ENDIAN);
		
		System.arraycopy(sndSysCdByte, 0, ackHeader, getHeaderItemStartPos(SND_SYS_CD), getHeaderItemLength(SND_SYS_CD));
		System.arraycopy(mepByte, 0, ackHeader, getHeaderItemStartPos(MSG_EXCH_PATRN), getHeaderItemLength(MSG_EXCH_PATRN));
		System.arraycopy(bodyLenByte, 0, ackHeader, getHeaderItemStartPos(BODY_LEN), getHeaderItemLength(BODY_LEN));
		
		return ackHeader;
	}


	public static byte[] makeHeader(String headerTypCd, String clientCd, String siteCd, String sndSysCd, String msgTypCd, String mepTypCd, String trceId, int bodyLen){
		byte[] headerByte = null;

		try {
			// 임시 바디길이 byte 크기
			String bodylen = "0000";
			// 시스템 코드가 3자리일 경우 9자리 변경
			String sndSysCdSetPadded = StringUtil.setPad(sndSysCd, 9, ' ',  StringUtil.PAD_LEFT) ;
			// TRCE_ID 24자리로 변경
			String trceIdSetPadded = StringUtil.setPad(trceId, 24, ' ',  StringUtil.PAD_RIGHT) ;

			// 현재 시간
			String sndDtm = new SimpleDateFormat(DTM_FORMET,new Locale("ko")).format(Calendar.getInstance().getTime());

			StringBuilder header = new StringBuilder();
			header.append(clientCd);
			header.append(StringUtil.setPad(siteCd, 8, ' ',  StringUtil.PAD_LEFT));
			header.append(headerTypCd);
			header.append(sndSysCdSetPadded);
			header.append(mepTypCd);
			header.append(bodylen);
			header.append(msgTypCd);
			header.append(trceIdSetPadded);
			header.append(sndDtm);
			headerByte =  header.toString().getBytes("UTF-8");

			// 바디 길이 byte 변경
			byte[] bodyLenbyte = ByteSupport.intToByteArray(bodyLen, ByteOrder.LITTLE_ENDIAN);
			System.arraycopy(bodyLenbyte, 0, headerByte, HeaderUtil.getHeaderItemStartPos(BODY_LEN), HeaderUtil.getHeaderItemLength(BODY_LEN));

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
		}

		return headerByte;
	}


}
