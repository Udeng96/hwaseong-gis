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
@Table(name = "IOC_UCITY_ZN_INFO", schema = ApiConstant.Schema.ioc)
public class UcityZnInfo {

    @Id
    @Column(name = "ZN_CD")
    private String znCd;

    @Column(name = "CRE_DTM")
    private String creDtm;

    @Column(name = "UPD_DTM")
    private String updDtm;

    @Column(name = "UPD_MN")
    private String updMn;

    @Column(name = "ZN_DESC")
    private String znDesc;

    @Column(name = "ZN_NM")
    private String znNm;
}
