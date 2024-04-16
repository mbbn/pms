package ir.mbbn.service;

import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.data.repository.UserRepository;
import ir.mbbn.mapper.EntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class UserService extends CrudService<UserEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserService(UserRepository userRepository) {
        super(userRepository);
    }

    @Override
    public UserEntity convert(UserEntity entity) {
        return EntityMapper.mapper.convert(entity);
    }
}
