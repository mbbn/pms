package ir.mbbn.data.repository;

import ir.mbbn.data.entity.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;


@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends PagingAndSortingRepository<UserEntity, String> {
    Optional<UserEntity> findByMobile(Integer mobile);
}
