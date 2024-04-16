package ir.mbbn.service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public abstract class CrudService<ENTITY, IdType> {
    protected final JpaRepository<ENTITY, IdType> repository;
    protected CrudService(JpaRepository<ENTITY, IdType> repository) {
        this.repository = repository;
    }

    public ENTITY load(IdType id) {
        Optional<ENTITY> optionalUser = repository.findById(id);
        return convert(optionalUser.orElse(null));
    }

    public ENTITY update(ENTITY entity){
        entity = repository.save(entity);
        return convert(entity);
    }

    public abstract ENTITY convert(ENTITY entity);
}
