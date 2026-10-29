package com.eseict.gis.utils;

import com.localhostmon.base.SystemProperties;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class CommonUtil {

    private static final Logger logger = LoggerFactory.getLogger(CommonUtil.class);
    String homePath = SystemProperties.getProperty("EAS_HOME");

    public String getSampleData(String fileName) {

        Gson gson = new Gson();
        JsonArray array = new JsonArray();
        JsonParser parser = new JsonParser();
        File file = new File(homePath + File.separator + fileName);
        try {
            try {
                array = parser.parse(new FileReader(file)).getAsJsonArray();

            }catch(ClassCastException | FileNotFoundException e){
                JsonObject obj = null;
                obj = parser.parse(new FileReader(file)).getAsJsonObject();
                return gson.toJson(obj);
            }
        } catch (FileNotFoundException e){
            logger.error(e.getMessage(), e);
        }catch (IOException e){
            logger.error(e.getMessage(),e);
        }

        return gson.toJson(array);
    }


//    fun getSampleData(fileName: String): String? {
//        val gson = Gson()
//        var array: JSONArray? = null
//        val parser: JSONParser = JSONParser()
//        val file: File = File(homePath + File.separator + fileName)
//        try {
//            try {
//                array = parser.parse(FileReader(file)) as JSONArray
//            } catch (e: ClassCastException) {
//                var obj: org.json.simple.JSONObject? = null
//                obj = parser.parse(FileReader(file)) as JSONObject
//                return gson.toJson(obj)
//            }
//        } catch (e: ParseException) {
//            logger.error(e.message, e)
//            var obj: org.json.simple.JSONObject? = null
//            obj = parser.parse(FileReader(file)) as JSONObject
//            return gson.toJson(obj)
//        } catch (e: FileNotFoundException) {
//            logger.error(e.message, e)
//        } catch (e: IOException) {
//            logger.error(e.message, e)
//        }
//        return gson.toJson(array)
//    }
//}


}
