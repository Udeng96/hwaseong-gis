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
@Table(name = "ERF_POS_CRDNT", schema = "rino_fms")
public class PosCrdnt {


    @Id
    @Column(name = "POS_CRDNT_ID")
    private String posCrdntId;

    @Column(name = "FAC_ID")
    private String facId;

    @Column(name = "POS_GRUP_ID")
    private String posGrupId;

    @Column(name = "SORT_ORD")
    private String sortOrd;

    @Column(name = "USE_YN")
    private int useYn;

    @Column(name = "X_CRDNT")
    private String xCrdnt;

    @Column(name = "Y_CRDNT")
    private String yCrdnt;

}
