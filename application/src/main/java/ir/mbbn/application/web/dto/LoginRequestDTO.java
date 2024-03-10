package ir.mbbn.application.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import ir.mbbn.common.dto.BaseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LoginRequestDTO extends BaseDTO<String> {

    @JsonProperty("username")
    private String username;
    @JsonProperty("password")
    private String password;
}
