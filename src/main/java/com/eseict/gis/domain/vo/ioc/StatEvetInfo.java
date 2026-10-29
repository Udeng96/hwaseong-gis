package com.eseict.gis.domain.vo.ioc;

import com.eseict.gis.config.ApiConstant;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "IOC_STAT_EVET_INFO", schema = ApiConstant.Schema.ioc)
public class StatEvetInfo {

    @Id
    @Column(name = "ZN_CD")
    private String znCd;

    @Column(name = "UNIT_SVC_CD")
    private String unitSvcCd;

    @Column(name = "SVC_THEME_CD")
    private String svcThemeCd;

    @Column(name = "STAT_EVET_CD")
    private String statEvetCd;

    @Column(name = "EVET_GB_CD")
    private String evetGbCd;

    @Column(name = "CPX_EVET_YN")
    private String cpxEvetYn;

    @Column(name = "CRE_DTM")
    private String creDtm;

    @Column(name = "MSG_TYP_CD")
    private String msgTypCd;

    @Column(name = "PRTY_SEQ")
    private String prtySeq;

    @Column(name = "STAT_EVET_DESC")
    private String statEvetDesc;

    @Column(name = "STAT_EVET_NM")
    private String statEvetNm;

    @Column(name = "UPD_DTM")
    private String updDtm;

    @Column(name = "UPD_MN")
    private String updNm;

}
