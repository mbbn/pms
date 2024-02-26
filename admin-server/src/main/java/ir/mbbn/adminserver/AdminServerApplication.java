package ir.mbbn.adminserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;

//@EnableAdminServer
@SpringBootApplication
public class AdminServerApplication {

    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(AdminServerApplication.class);
        ApplicationPidFileWriter applicationPidFileWriter = new ApplicationPidFileWriter("pms-admin.pid");
        springApplication.addListeners(applicationPidFileWriter);     // register PID write to spring boot. It will write PID to file
        springApplication.run(args);
    }
}
