package ir.mbbn.data.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
@EnableJpaRepositories("ir.mbbn.data.repository")
@EntityScan("ir.mbbn.data.entity")
public class DatabaseConfiguration {
}
