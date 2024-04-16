package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.BaseEntity;
import ir.mbbn.service.CrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class CrudApi<ENTITY extends BaseEntity<?>, IdType> {

    public static final String BASE_API_PATH = "/api/v1";
    public static final String SLASH = "/";
    public static final String ID_PARAM = "{id}";

    private final CrudService<ENTITY, IdType> crudService;

    public CrudApi(CrudService<ENTITY, IdType> crudService) {
        this.crudService = crudService;
    }

    @GetMapping(ID_PARAM)
    ResponseEntity<ENTITY> load(@PathVariable("id") IdType id) {
        ENTITY dto = crudService.load(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping( ID_PARAM)
    ResponseEntity<ENTITY> update(@PathVariable("id") IdType id, @RequestBody ENTITY entity) {
        ENTITY dto = crudService.update(entity);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
}
