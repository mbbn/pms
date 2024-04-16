package ir.mbbn.service;

import ir.mbbn.data.entity.CompanyEntity;
import ir.mbbn.data.repository.CompanyRepository;
import ir.mbbn.mapper.EntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyService extends CrudService<CompanyEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final CompanyRepository companyRepository;
    public CompanyService(CompanyRepository companyRepository) {
        super(companyRepository);
        this.companyRepository = companyRepository;
    }
    public CompanyEntity loadByHostName(String hostName) {
        Optional<CompanyEntity> optionalCompany = companyRepository.findByHostName(hostName);
        CompanyEntity companyEntity = optionalCompany.orElse(null);
        return convert(companyEntity);
    }

    @Override
    public CompanyEntity convert(CompanyEntity companyEntity) {
        return EntityMapper.mapper.convert(companyEntity);
    }
}
