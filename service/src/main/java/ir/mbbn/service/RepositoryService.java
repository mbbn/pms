package ir.mbbn.service;

import ir.mbbn.data.entity.BaseEntity;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

@Service
public class RepositoryService {

    @Resource
    private EntityManager entityManager;

    public BaseEntity<String> loadEntityById(Class<? extends BaseEntity<String>> entityClass, String id){
        BaseEntity<String> example = new BaseEntity<>() {
            @Override
            public String getId() {
                return id;
            }
        };
        return entityManager.find(entityClass, example);
    }

    public BaseEntity<Integer> loadEntityById(Class<? extends BaseEntity<Integer>> entityClass, Integer id){
        BaseEntity<Integer> example = new BaseEntity<>() {
            @Override
            public Integer getId() {
                return id;
            }
        };
        return entityManager.find(entityClass, example);
    }
}
