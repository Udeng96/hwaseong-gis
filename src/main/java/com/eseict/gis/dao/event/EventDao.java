package com.eseict.gis.dao.event;


import com.eseict.gis.config.ApiConstant;
import com.eseict.gis.domain.dto.common.CodeInfo;
import com.eseict.gis.domain.dto.event.EventHeatmap;
import com.eseict.gis.domain.dto.event.EventHistItem;
import com.eseict.gis.domain.dto.stat.EventType;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository("EventDao")
public class EventDao {


    private static final Logger logger = LoggerFactory.getLogger(EventDao.class);

    @PersistenceContext(unitName = "rinoEm")
    EntityManager emf;

    public List<EventHistItem> getEventList(List<String> eventTypeList, String area, String content, String startDtm, String endDtm, int limit) {

        List<EventHistItem> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try {

            sb.append("select distinct new com.eseict.gis.domain.dto.event.EventHistItem(e.statEvetOutbSeqn, e.svcThemeCd,t.svcThemeNm, e.znCd, z.znNm, e.outbPlac, e.outbDtm, e.statEvetCntn, h.YCrdnt, h.XCrdnt ) from StatEvetOutbHist as e ");
            sb.append("left join StatEvetPosHist as h on h.statEvetOutbSeqn = e.statEvetOutbSeqn ");
            sb.append("left join StatEvetInfo as i on i.svcThemeCd = e.svcThemeCd ");
            sb.append("left join SvcThemeInfo as t on e.svcThemeCd = t.svcThemeCd ");
            sb.append("left join UcityZnInfo as z on z.znCd = e.znCd ");
            sb.append("where 1=1 ");

            if (!eventTypeList.isEmpty()) {
                sb.append("and e.svcThemeCd in :eventTypeList ");
            }

            if (!area.isEmpty()) {
                sb.append("and e.outbPlac LIKE concat(concat('%' , :area ),'%')");
            }

            if (!Strings.isNullOrEmpty(startDtm) && !Strings.isNullOrEmpty(endDtm)) {
                sb.append("and e.outbDtm >= :startDtm ");
                sb.append("and e.outbDtm <= :endDtm ");
            }

            if (!Strings.isNullOrEmpty(content)) {
                sb.append("and e.statEvetCntn LIKE concat(concat('%' , :content ),'%')");
            }

            sb.append("order by e.outbDtm desc ");


            Query query = emf.createQuery(sb.toString());
            if (!eventTypeList.isEmpty()) {
                query.setParameter("eventTypeList", eventTypeList);
            }
            if (!area.isEmpty()) {
                query.setParameter("area", area);
            }
            if (!content.isEmpty()) {
                query.setParameter("content", content);
            }
            if (!startDtm.isEmpty() && !endDtm.isEmpty()) {
                query.setParameter("startDtm", startDtm);
                query.setParameter("endDtm", endDtm);
            }

            if (limit > 0) {
                query.setMaxResults(limit);
            }

            result = query.getResultList();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    public List<EventHeatmap> getHeatmapCount(String startDtm, String endDtm, String svcThemeCd) {

        List<EventHeatmap> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();
        try {
            sb.append("SELECT new com.eseict.gis.domain.dto.event.EventHeatmap(p.YCrdnt, p.XCrdnt, count(e.svcThemeCd)) from StatEvetOutbHist e");
            sb.append(" LEFT JOIN StatEvetPosHist as p on p.statEvetOutbSeqn = e.statEvetOutbSeqn");
            sb.append(" WHERE 1=1 and e.svcThemeCd = :svcThemeCd");

            if (!startDtm.isEmpty()) {
                sb.append(" and e.outbDtm >= :startDtm");
            }

            if (!endDtm.isEmpty()) {
                sb.append(" and e.outbDtm <= :endDtm");
            }

            sb.append(" group by p.YCrdnt, p.XCrdnt");

            Query query = emf.createQuery(sb.toString());

            if (!startDtm.isEmpty()) {
                query.setParameter("startDtm", startDtm);
            }

            if (!endDtm.isEmpty()) {
                query.setParameter("endDtm", endDtm);
            }

            if (!svcThemeCd.isEmpty()) {
                query.setParameter("svcThemeCd", svcThemeCd);
            }
            result = query.getResultList();

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;

    }

    public List<EventType> getTodayList(String eventType, String startDtm, String endDtm) {

        List<EventType> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try {

            sb.append("select distinct new com.eseict.gis.domain.dto.stat.EventType(e.statEvetOutbSeqn, e.svcThemeCd, i.statEvetNm, e.znCd, e.outbPlac, e.outbDtm, e.statEvetCntn ) from StatEvetOutbHist as e ");
            sb.append("left join StatEvetInfo as i on i.svcThemeCd = e.svcThemeCd ");
            sb.append("where 1=1 ");
            sb.append("and i.unitSvcCd = e.unitSvcCd ");
            sb.append("and e.svcThemeCd = :eventType ");
            if(!eventType.equals(ApiConstant.EVENT_CD.SAFETY) && !eventType.equals(ApiConstant.EVENT_CD.NDM) && !eventType.equals(ApiConstant.EVENT_CD.ANM) ){
                sb.append("and e.znCd <> '999' ");
            }
            sb.append("and e.outbPlac not like '%테스트%' ");
            if (!Strings.isNullOrEmpty(startDtm) && !Strings.isNullOrEmpty(endDtm)) {
                sb.append("and e.outbDtm >= :startDtm ");
                sb.append("and e.outbDtm <= :endDtm ");
            }
            sb.append("order by e.outbDtm desc ");


            Query query = emf.createQuery(sb.toString());

            query.setParameter("eventType", eventType);
            if (!startDtm.isEmpty() && !endDtm.isEmpty()) {
                query.setParameter("startDtm", startDtm);
                query.setParameter("endDtm", endDtm);
            }

            result = query.getResultList();

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    public List<String> getTypeList(String svcThemeCd) {
        List<String> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try {

            sb.append("select distinct e.statEvetNm from StatEvetInfo as e ");
            sb.append("where 1=1 ");
            sb.append("and e.svcThemeCd = :svcThemeCd");


            Query query = emf.createQuery(sb.toString());

            query.setParameter("svcThemeCd", svcThemeCd);
            result = query.getResultList();

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    public List<CodeInfo> getAreaList() {
        List<CodeInfo> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try {

            sb.append("select distinct new com.eseict.gis.domain.dto.common.CodeInfo(e.znCd,e.znNm) from UcityZnInfo as e ");
            sb.append("where 1=1 ");
            sb.append("and e.znCd <> '999' ");
            sb.append("and e.znCd <> '445'");


            Query query = emf.createQuery(sb.toString());

            result = query.getResultList();

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

    public List<EventHistItem> getExcelEventList(String eventType, String startDtm, String endDtm) {

        List<EventHistItem> result = new ArrayList<>();

        StringBuilder sb = new StringBuilder();

        try {

            sb.append("select distinct new com.eseict.gis.domain.dto.event.EventHistItem(e.statEvetOutbSeqn, e.svcThemeCd,i.statEvetNm, e.znCd, z.znNm, e.outbPlac, e.outbDtm, e.statEvetCntn, h.YCrdnt, h.XCrdnt ) from StatEvetOutbHist as e ");
            sb.append("left join StatEvetPosHist as h on h.statEvetOutbSeqn = e.statEvetOutbSeqn ");
            sb.append("left join StatEvetInfo as i on i.svcThemeCd = e.svcThemeCd ");
            sb.append("left join UcityZnInfo as z on z.znCd = e.znCd ");
            sb.append("where 1=1 ");
            sb.append("and e.znCd <> '445' ");
            sb.append("and e.unitSvcCd = i.unitSvcCd ");
            sb.append("and e.outbPlac not like '%테스트%' ");

            if (!eventType.isEmpty()) {
                sb.append("and e.svcThemeCd = :eventType ");
            }

            if (!Strings.isNullOrEmpty(startDtm) && !Strings.isNullOrEmpty(endDtm)) {
                sb.append("and e.outbDtm >= :startDtm ");
                sb.append("and e.outbDtm <= :endDtm ");
            }

            sb.append("order by e.outbDtm desc ");


            Query query = emf.createQuery(sb.toString());
            if (!eventType.isEmpty()) {
                query.setParameter("eventType", eventType);
            }
            if (!startDtm.isEmpty() && !endDtm.isEmpty()) {
                query.setParameter("startDtm", startDtm);
                query.setParameter("endDtm", endDtm);
            }
            result = query.getResultList();
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return result;
    }

}
