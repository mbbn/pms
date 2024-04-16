package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.CompanyEntity;
import ir.mbbn.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;

@RestController
@RequestMapping(CrudApi.BASE_API_PATH + "/company")
public class CompanyController extends CrudApi<CompanyEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        super(companyService);
        this.companyService = companyService;
    }

    @GetMapping(SLASH)
    public ResponseEntity<CompanyEntity> loadByCurrentHost() {
        UriComponents uriComponents = ServletUriComponentsBuilder.fromCurrentRequest().build();
        String host = uriComponents.getHost();
        CompanyEntity companyEntity = companyService.loadByHostName(host);
        if(companyEntity != null){
            return ResponseEntity.ok(companyEntity);
        }
        return ResponseEntity.notFound().build();
    }
}
