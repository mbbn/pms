package ir.mbbn.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@ServletComponentScan(basePackages = "ir.mbbn.application.filter")
public class Application {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(Application.class);
        ApplicationPidFileWriter applicationPidFileWriter = new ApplicationPidFileWriter("pms.pid");
        springApplication.addListeners(applicationPidFileWriter);     // register PID write to spring boot. It will write PID to file
        springApplication.run(args);
    }
}
