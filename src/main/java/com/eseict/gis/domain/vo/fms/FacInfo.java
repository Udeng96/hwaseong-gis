package com.eseict.gis.domain.vo.fms;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "ERF_FAC_INFO", schema = "rino_fms")
public class FacInfo {
    @Id
    @Column(name = "FAC_ID")
    private String facId;

    @Column(name = "ADDR_LONG")
    private String addrLong;

    @Column(name = "ADDR_SHORT")
    private String addrShort;

    @Column(name = "APRV_ST")
    private String aprvSt;

    @Column(name = "BLDG_ID")
    private String bldgId;

    @Column(name = "CO_ID")
    private String coId;

    @Column(name = "DISMNT_DTM")
    private String dismntDtm;

    @Column(name = "EVET_RCV_YN")
    private int evetRcvYn;

    @Column(name = "FAC_ADD_INFO")
    private String facAddInfo;

    @Column(name = "FAC_CLFY_ID")
    private String facClfyId;

    @Column(name = "FAC_DESC")
    private String facDesc;

    @Column(name = "FAC_NM")
    private String facNm;

    @Column(name = "FAC_TYP")
    private String facTyp;

    @Column(name = "FILE_GRUP_ID")
    private String fileGrupId;

    @Column(name = "GEO_FTR_CD")
    private String geoFtrCd;

    @Column(name = "MFMN")
    private String mfmn;

    @Column(name = "MGT_NO")
    private String mgtNo;

    @Column(name = "POS_GRUP_ID")
    private String posGrupId;

    @Column(name = "POS_NM")
    private String posNm;

    @Column(name = "PSST_PERIOD")
    private int psstPeriod;

    @Column(name = "REASON")
    private String reason;

    @Column(name = "REG_DTM")
    private String regDtm;

    @Column(name = "REGRT")
    private String regrt;

    @Column(name = "SETU_DTM")
    private String setuDtm;

    @Column(name = "SEVRTY")
    private String sevrty;

    @Column(name = "UPD_DTM")
    private String updDtm;

    @Column(name = "USE_YN")
    private int useYn;

    @Column(name = "AREA")
    private String area;

    @Column(name = "MOBILE_YN")
    private String mobileYn;

    @Column(name = "SYNC_YN")
    private String syncYn;

}
