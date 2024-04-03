package ir.mbbn.data.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@Builder
@Getter
public class MenuEntity {

    @JsonProperty("id")
    private String id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("subMenu")
    private Set<MenuEntity> subMenu;
}
