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
@Table(name = "IOC_STAT_EVET_OUTB_HIST", schema = ApiConstant.Schema.ioc)
public class StatEvetOutbHist {

    @Id
    @Column(name = "STAT_EVET_OUTB_SEQN")
    private String statEvetOutbSeqn;

    @Column(name = "CLR_DTM")
    private String clrDtm;

    @Column(name = "CLS_DTM")
    private String clsDtm;

    @Column(name = "CLS_TYP")
    private String clsTyp;

    @Column(name = "EVET_GB_CD")
    private String evetGbCd;

    @Column(name = "OUTB_DTM")
    private String outbDtm;

    @Column(name = "OUTB_MAIN_GB")
    private String outbMainGb;

    @Column(name = "OUTB_PLAC")
    private String outbPlac;

    @Column(name = "OUTB_SCOP_RADS")
    private String outbScopRads;

    @Column(name = "PROC_ST")
    private String procSt;

    @Column(name = "STAT_EVET_CD")
    private String statEvetCd;

    @Column(name = "STAT_EVET_CNTN")
    private String statEvetCntn;

    @Column(name = "STAT_EVET_GD_CD")
    private String statEvetGdCd;

    @Column(name = "SVC_THEME_CD")
    private String svcThemeCd;

    @Column(name = "U_SVC_OUTB_ID")
    private String uSvcOutbId;

    @Column(name = "UNIT_SVC_CD")
    private String unitSvcCd;

    @Column(name = "ZN_CD")
    private String znCd;
}
