package ir.mbbn.application.prop;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "application")
public class AppProperties {

    private RepoProperties repo;

    @Data
    public static class RepoProperties {

        private String prefixPackage;
    }
}

