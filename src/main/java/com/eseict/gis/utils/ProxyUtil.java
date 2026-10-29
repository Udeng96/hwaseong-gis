package com.eseict.gis.utils;

import com.localhostmon.base.SystemProperties;

public class ProxyUtil {

    final String iProxy;
    private final Boolean isDev = Boolean.parseBoolean(SystemProperties.getProperty("IS_DEV"));

    public ProxyUtil(String iProxy) {
        this.iProxy = iProxy;
    }

    public String getUrlWithProxy(String url) {

        String test = url.replaceAll("^https?:\\/\\/", "/");
        if (!isDev) {
//            if(matches("^https?:\\/\\/",url)) {
//
//            }
//            return iProxy.concat(new Matcher().replace(url, "/"));
//        } else {
        }
        return url;
    }
}
