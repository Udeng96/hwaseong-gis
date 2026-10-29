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
@Table(name = "IOC_STAT_EVET_POS_HIST", schema = ApiConstant.Schema.ioc)
public class StatEvetPosHist {

    @Id
    @Column(name = "STAT_EVET_OUTB_SEQN")
    private String statEvetOutbSeqn;

    @Column(name = "SEQ")
    private int seq;

    @Column(name = "X_CRDNT")
    private String XCrdnt;

    @Column(name = "Y_CRDNT")
    private String YCrdnt;

    @Column(name = "Z_CRDNT")
    private String zCrdnt;
}
