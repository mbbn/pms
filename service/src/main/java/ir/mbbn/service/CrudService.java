package ir.mbbn.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface CrudService<ENTITY, IdType > {

    ENTITY load(IdType id);

    Page<ENTITY> find(ENTITY example, PageRequest page);
}
