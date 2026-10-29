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
@Table(name = "IOC_SVC_THEME_INFO", schema = ApiConstant.Schema.ioc)
public class SvcThemeInfo {

    @Id
    private Long id;

    @Column(name = "ZN_CD")
    private String znCd;

    @Column(name = "SVC_THEME_CD")
    private String svcThemeCd;

    @Column(name = "CRE_DTM")
    private String creDtm;

    @Column(name = "CRE_MN")
    private String creMn;

    @Column(name = "SVC_THEME_DESC")
    private String svcThemeDesc;

    @Column(name = "SVC_THEME_NM")
    private String svcThemeNm;

    @Column(name = "UPD_DTM")
    private String updDtm;

    @Column(name = "UPD_MN")
    private String updMn;

}
