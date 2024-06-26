package ir.mbbn.data.repository;

import ir.mbbn.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends PagingAndSortingRepository<UserEntity, String>, JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByMobile(Integer mobile);
}
