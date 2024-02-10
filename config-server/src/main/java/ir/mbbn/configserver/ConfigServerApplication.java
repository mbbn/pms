package ir.mbbn.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

@SpringBootApplication
public class ConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(ConfigServerApplication.class);
        ApplicationPidFileWriter applicationPidFileWriter = new ApplicationPidFileWriter("pms-config.pid");
        springApplication.addListeners(applicationPidFileWriter);     // register PID write to spring boot. It will write PID to file
        springApplication.run(args);
    }
}
