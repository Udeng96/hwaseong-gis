package com.eseict.gis.config;

import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Properties;

@Slf4j
@Configuration
@Component
@EnableJpaRepositories(basePackages = "com.eseict.gis.dao")
public class DataConfig {

    @Value("${db.driver}")
    String driverName;
    @Value("${db.dialect}")
    String driverDialect;
    @Value("${db.url}")
    String jdbcUrl;
    @Value("${db.username}")
    String userName;
    @Value("${db.password}")
    String userPwd;


    @Primary
    @Bean(name = "rino")
    public DataSource dataSource(){
        HikariDataSource hikariDataSource = new HikariDataSource();
        hikariDataSource.setJdbcUrl(jdbcUrl);
        hikariDataSource.setDriverClassName(driverName);
        hikariDataSource.setUsername(userName);
        hikariDataSource.setPassword(userPwd);
        hikariDataSource.setDataSourceProperties(jpaHibernateProperties());

        log.info("####################################################################################################################");
        log.info("## SSC PRIMARY DataSource Info.");
        log.info("Driver   : {}", driverName);
        log.info("URL      : {}", jdbcUrl);
        log.info("USERNAME : {}", userName);
        log.info("####################################################################################################################");

        return hikariDataSource;
    }

    private Properties jpaHibernateProperties(){
        Properties props = new Properties();
        props.setProperty("hibernate.show_sql","false");
        props.setProperty("hibernate.format_sql","true");
        props.setProperty("hibernate.jdbc.time_zone","Asia/Seoul");
        props.setProperty("hibernate.dialect",driverDialect);

        return props;
    }

    @Primary
    @Autowired
    @Bean(name = "rinoTm")
    public JpaTransactionManager jpaTransactionManager(@Qualifier("rinoEm")LocalContainerEntityManagerFactoryBean entityManagerFactoryBean){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactoryBean.getObject());
        return transactionManager;
    }

    @Primary
    @Bean(name = "rinoEm")
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean(
            @Qualifier("rino") DataSource dataSource){
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();
        jpaVendorAdapter.setShowSql(true);
        factoryBean.setJpaVendorAdapter(jpaVendorAdapter);
        factoryBean.setDataSource(dataSource);
        factoryBean.setPackagesToScan("com.eseict.gis.domain");

        factoryBean.setJpaProperties(jpaHibernateProperties());
        return factoryBean;
    }
}
