package ir.mbbn.data.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public abstract class BaseEntity<IdType extends Serializable> {

    private IdType id;
}
