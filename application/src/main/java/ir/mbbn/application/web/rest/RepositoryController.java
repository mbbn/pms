package ir.mbbn.application.web.rest;

import ir.mbbn.common.dto.BaseDTO;
import ir.mbbn.data.entity.BaseEntity;
import ir.mbbn.service.RepositoryService;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/repo")
public class RepositoryController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private Map<String, Class<?>> entityMapName;

    @Resource
    private RepositoryService repositoryService;

    @GetMapping("/{entityName}/{id}")
    public ResponseEntity load(@PathVariable("entityName") String entityName, @PathVariable("id") String id) {
        if(!entityMapName.containsKey(entityName)){
            return ResponseEntity.notFound()
                    .build();
        }
        Class<?> entityClass = entityMapName.get(entityName);
        return ResponseEntity.ok("");
    }
}
