package com.eseict.gis.config;

import lombok.RequiredArgsConstructor;
import org.codehaus.commons.nullanalysis.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.util.Map;

@ConstructorBinding
@ConfigurationProperties(prefix = "system")
@RequiredArgsConstructor
public class VWorldApSystemProperties {

    private final static Logger logger = LoggerFactory.getLogger(VWorldApSystemProperties.class);

    final Map<String, String> values;

    @Nullable
    public String getValue(String key) {
        String returnValue = null;

        if (!key.isEmpty()) {
            try {
                Object value = this.values.get(key);
                if (value == null) {
                    throw new NullPointerException("null cannot be cast to non-null type java.String");
                }
                returnValue = (String) value;
            } catch (NullPointerException e) {
                logger.error(e.getMessage(), e);
            }
        }
        return returnValue;
    }
}
