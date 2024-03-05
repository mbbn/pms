package ir.mbbn.service;

import ir.mbbn.data.entity.CompanyEntity;
import ir.mbbn.data.repository.CompanyRepository;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private CompanyRepository companyRepository;
    public CompanyEntity load(String id) {
        Optional<CompanyEntity> optionalCompany = companyRepository.findById(id);
        return optionalCompany.map(EntityMapper.mapper::convert).orElse(null);
    }

    public CompanyEntity loadByHostName(String hostName) {
        Optional<CompanyEntity> optionalCompany = companyRepository.findByHostName(hostName);
        return optionalCompany.map(EntityMapper.mapper::convert).orElse(null);
    }
}
