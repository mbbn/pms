package ir.mbbn.application.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Builder
@Getter
public class ErrorDTO {

    @JsonProperty("status")
    private HttpStatus httpStatus;
    @JsonProperty("responseCode")
    private Integer responseCode;
    @JsonProperty("message")
    private String message;
}
