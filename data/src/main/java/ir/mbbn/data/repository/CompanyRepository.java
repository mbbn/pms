package ir.mbbn.data.repository;

import ir.mbbn.data.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends PagingAndSortingRepository<CompanyEntity, String>, JpaRepository<CompanyEntity, String> {
    Optional<CompanyEntity> findByHostName(String hostName);
}
