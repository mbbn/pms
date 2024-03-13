package ir.mbbn.data.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MenuEntity {

    @JsonProperty("id")
    private String id;

    @JsonProperty("title")
    private String title;
}
