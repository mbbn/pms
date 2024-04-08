package ir.mbbn.data.repository;

import ir.mbbn.data.entity.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends PagingAndSortingRepository<MenuEntity, String>, JpaRepository<MenuEntity, String> {
}
