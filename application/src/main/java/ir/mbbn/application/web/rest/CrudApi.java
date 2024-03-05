package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.BaseEntity;
import ir.mbbn.service.CrudService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

public abstract class CrudApi<ENTITY extends BaseEntity<?>, IdType> {

    public static final String BASE_API_PATH = "/api/v1";
    public static final String LOAD = "/load";

    private final CrudService<ENTITY, IdType> crudService;

    public CrudApi(CrudService<ENTITY, IdType> crudService) {
        this.crudService = crudService;
    }

    @GetMapping(LOAD)
    ResponseEntity<ENTITY> load(@RequestParam("id") IdType id) {
        ENTITY dto = crudService.load(id);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
}
