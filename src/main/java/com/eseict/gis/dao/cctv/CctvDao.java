package com.eseict.gis.dao.cctv;


import com.eseict.gis.domain.dto.cctv.CctvInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository("CctvDao")
public class CctvDao {
    private static final Logger logger = LoggerFactory.getLogger(CctvDao.class);
    @PersistenceContext(unitName = "rinoEm")
    EntityManager emf;

    public List<CctvInfo> getCctvList(String cctvClfy, String cctvNm){

        List<CctvInfo> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try{

            sb.append("select distinct new com.eseict.gis.domain.dto.cctv.CctvInfo(f.facId, f.facNm, c.facClfyNm, p.yCrdnt, p.xCrdnt, f.mgtNo) from FacInfo as f ");
            sb.append("left join FacClfy as c on c.facClfyId = f.facClfyId ");
            sb.append("left join PosCrdnt as p on p.facId = f.facId ");
            sb.append("where 1=1 and c.facClfyNm LIKE '%CCTV%' and f.useYn = 1 and p.xCrdnt != '0.0' and p.yCrdnt != '0.0' ");


            if(!cctvNm.isEmpty()){
                sb.append("and f.facNm LIKE concat(concat('%' , :cctvNm ),'%') ");
            }

            if(!cctvClfy.isEmpty()){
                sb.append("and f.facClfyId = :cctvClfy");
            }

            Query query = emf.createQuery(sb.toString());
            if(!cctvNm.isEmpty()){
                query.setParameter("cctvNm",cctvNm);
            }
            if(!cctvClfy.isEmpty()){
                query.setParameter("cctvClfy",cctvClfy);
            }



            result = query.getResultList();
        }catch (Exception e){
            logger.error(e.getMessage(),e);
        }

        return result;
    }

}
