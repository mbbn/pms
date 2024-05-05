package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.CategoryEntity;
import ir.mbbn.data.entity.CompanyEntity;
import ir.mbbn.service.CategoryService;
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
@RequestMapping(CrudApi.BASE_API_PATH + "/category")
public class CategoryController extends CrudApi<CategoryEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public CategoryController(CategoryService categoryService) {
        super(categoryService);
    }


}
