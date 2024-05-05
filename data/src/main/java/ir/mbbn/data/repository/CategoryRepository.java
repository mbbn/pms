package ir.mbbn.data.repository;

import ir.mbbn.data.entity.CategoryEntity;
import ir.mbbn.data.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<CategoryEntity, String>, JpaRepository<CategoryEntity, String> {
}
