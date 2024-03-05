package ir.mbbn.common.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BaseDTO<IdType> {

    private IdType id;
}
