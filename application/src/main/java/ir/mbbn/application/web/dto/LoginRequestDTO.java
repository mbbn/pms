package ir.mbbn.application.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginRequestDTO {

    @JsonProperty("username")
    private String username;
    @JsonProperty("password")
    private String password;
}
