package ir.mbbn.application.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

import java.io.IOException;
import java.util.Set;

@Configuration
public class AppConfiguration {

    @Value("${resource.bundle.classpath:}")
    private Set<String> resourceBundleClasspath;

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        resourceBundleClasspath.forEach(messageSource::addBasenames);
        messageSource.setCacheSeconds(10);
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setUseCodeAsDefaultMessage(true);
        messageSource.clearCache();

        return messageSource;
    }
}
