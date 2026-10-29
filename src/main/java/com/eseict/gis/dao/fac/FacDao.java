package com.eseict.gis.dao.fac;


import com.eseict.gis.dao.event.EventDao;
import com.eseict.gis.domain.dto.fac.FacInfo;
import com.eseict.gis.domain.dto.fac.LegendInfo;
import com.eseict.gis.domain.dto.stat.StatType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository("FacDao")
public class FacDao {

    private static final Logger logger = LoggerFactory.getLogger(FacDao.class);

    @PersistenceContext(unitName = "rinoEm")
    EntityManager emf;

    public List<FacInfo> getFacInfos(String facClfyId){

        List<FacInfo> result = new ArrayList<>();

        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.fac.FacInfo(f.facId,f.facNm,f.addrShort,f.facClfyId,c.facClfyNm, p.yCrdnt, p.xCrdnt, f.regDtm, f.mgtNo) from FacInfo f " +
                    "left join FacClfy as c on c.facClfyId = f.facClfyId " +
                    "left join PosCrdnt as p on p.facId = f.facId " +
                    "where f.facClfyId = :facClfyId and f.useYn = 1";

            Query query = emf.createQuery(queryStr);
            query.setParameter("facClfyId",facClfyId);
            result = query.getResultList();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
        }

        return result;
    }


    public List<LegendInfo> getLegendInfos(){
        List<LegendInfo> legendInfos = new ArrayList<>();


        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.fac.LegendInfo(c.facClfyId, c.facClfyNm) from FacClfy as c " +
                    "where c.useYn = 1 and c.facClfyNm NOT LIKE '%CCTV%' and c.facClfyNm <> '기타'" ;

            Query query = emf.createQuery(queryStr);
            legendInfos = query.getResultList();
        }catch (Exception e){
            logger.error(e.getMessage(), e);
        }

        return legendInfos;
    }

    public List<StatType> getFacCnt(List<String> clfyCdList){
        List<StatType> statList = new ArrayList<>();

        try{
            String queryStr = "select distinct new com.eseict.gis.domain.dto.stat.StatType(e.facClfyNm, count(c.facClfyId)) from FacInfo as c " +
                    "left join FacClfy as e on e.facClfyId = c.facClfyId " +
                    "where c.useYn = 1 and c.facClfyId in :clfyCdList " +
                    "group by e.facClfyNm" ;

            Query query = emf.createQuery(queryStr);
            query.setParameter("clfyCdList", clfyCdList);
            statList = query.getResultList();
        }catch (Exception e){
            logger.error(e.getMessage(), e);
        }

        return statList;
    }
}
