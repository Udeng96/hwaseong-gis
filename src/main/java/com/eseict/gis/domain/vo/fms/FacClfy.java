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
@Table(name = "ERF_FAC_CLFY", schema = "rino_fms")
public class FacClfy {

    @Id
    @Column(name = "FAC_CLFY_ID")
    private String facClfyId;

    @Column(name = "FAC_CLFY_GB")
    private String facClfyGb;

    @Column(name = "FAC_CLFY_NM")
    private String facClfyNm;

    @Column(name = "FAC_CLFY_PATH")
    private String facClfyPath;

    @Column(name = "FILE_ID")
    private String fileId;

    @Column(name = "LVL_NO")
    private String lvlNo;

    @Column(name = "MFMN")
    private String mfmn;

    @Column(name = "NOTE")
    private String note;

    @Column(name = "REG_DTM")
    private String regDtm;

    @Column(name = "REGRT")
    private String regrt;

    @Column(name = "TOP_FAC_CLFY_ID")
    private String topFacClfyId;

    @Column(name = "UPD_DTM")
    private String updDtm;

    @Column(name = "USE_YN")
    private int useYn;

    @Column(name = "FAC_CLFY_ICO")
    private String facClfyIco;

}
