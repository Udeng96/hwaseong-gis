package com.eseict.gis.dao.common;

import com.eseict.gis.domain.dto.common.CodeInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository("CommonDao")
public class CommonDao {

    private static final Logger logger = LoggerFactory.getLogger(CommonDao.class);
    @PersistenceContext(unitName = "rinoEm")
    EntityManager emf;

    public List<CodeInfo> getEventList(List<String> eventTypeList){

        List<CodeInfo> result = new ArrayList<>();

        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.common.CodeInfo(e.svcThemeCd,t.svcThemeNm) from StatEvetInfo e " +
                    "left join SvcThemeInfo as t on t.svcThemeCd = e.svcThemeCd " +
                    "where e.svcThemeCd in :eventTypeList " +
                    "order by e.svcThemeCd";

            Query query  = emf.createQuery(queryStr);
            query.setParameter("eventTypeList",eventTypeList);
            result = query.getResultList();

        }catch (Exception e){

            logger.error(e.getMessage(), e);

        }

        return result;
    }

    public List<CodeInfo> getZnCdList(List<String> exceptAreaList){

        List<CodeInfo> result = new ArrayList<>();

        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.common.CodeInfo(z.znCd, z.znNm) from UcityZnInfo z " +
                    "where z.znCd not in :exceptAreaList " +
                    "order by z.znCd";

            Query query  = emf.createQuery(queryStr);
            query.setParameter("exceptAreaList",exceptAreaList);
            result = query.getResultList();

        }catch (Exception e){
            logger.error(e.getMessage(), e);

        }

        return result;

    }

    public List<CodeInfo> getCctvTypeList(){

        List<CodeInfo> result = new ArrayList<>();

        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.common.CodeInfo(c.facClfyId, c.facClfyNm) from FacClfy c " +
                    "where c.facClfyNm like '%CCTV%' " +
                    "order by c.facClfyNm";

            Query query  = emf.createQuery(queryStr);
            result = query.getResultList();

        }catch (Exception e){
            logger.error(e.getMessage(), e);

        }

        return result;

    }
}
