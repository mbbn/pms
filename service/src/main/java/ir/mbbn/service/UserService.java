package ir.mbbn.service;

import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.data.repository.UserRepository;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements CrudService<UserEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Resource
    private UserRepository userRepository;

    @Override
    public UserEntity load(String id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        return optionalUser.map(EntityMapper.mapper::convert).orElse(null);
    }

    @Override
    public Page<UserEntity> find(UserEntity example, PageRequest pageRequest) {
        Page<UserEntity> page = userRepository.findAll(Example.of(example), pageRequest);
        page.map(EntityMapper.mapper::convert);
        return page;
    }
}
