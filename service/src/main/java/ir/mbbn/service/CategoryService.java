package ir.mbbn.service;

import ir.mbbn.data.entity.CategoryEntity;
import ir.mbbn.data.repository.CategoryRepository;
import ir.mbbn.mapper.EntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService extends CrudService<CategoryEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public CategoryService(CategoryRepository categoryRepository) {
        super(categoryRepository);
    }

    @Override
    public CategoryEntity convert(CategoryEntity categoryEntity) {
        return EntityMapper.mapper.convert(categoryEntity);
    }
}
