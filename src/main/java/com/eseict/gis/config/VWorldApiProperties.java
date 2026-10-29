package com.eseict.gis.config;

import com.eseict.gis.domain.dto.address.VWorldApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.Map;
import java.util.Optional;

@ConstructorBinding
@ConfigurationProperties(prefix = "public.common")
@RequiredArgsConstructor
@Slf4j
public class VWorldApiProperties {

    final Map<String, VWorldApi> apis;

    /**
     * application.yml에 등록해놓은 vworld의 정보를 가져옵니다.
     * return 값은 주소를 구하기 위해 VWorldController에서 받은 address와 함께 사용됩니다.
     * <p>
     * <p/>
     *
     * @param apiKey
     * @return com.eseict.ssc.domain.vo.common.vWorld.VWorldApi
     * @throws
     * @name : getApi
     * @author : ssiky
     * @since : 11/14/23
     */
    public VWorldApi getApi(String apiKey) {
        VWorldApi resVWorldApi = Optional.ofNullable(apis.get(apiKey)).orElseGet(VWorldApi::new);
        if (resVWorldApi.getUrl().equals("")) {
            log.info("NO URL FOR GETTING ADDR");
        }

        return resVWorldApi;
    }
}
