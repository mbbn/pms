package ir.mbbn.data.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public abstract class BaseEntity<IdType extends Serializable> {

    private IdType id;
}
