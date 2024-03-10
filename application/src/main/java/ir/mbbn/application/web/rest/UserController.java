package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.service.EntityMapper;
import ir.mbbn.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(CrudApi.BASE_API_PATH + "/User")
public class UserController extends CrudApi<UserEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public UserController(UserService userService) {
        super(userService);
    }

    @GetMapping("/current")
    public ResponseEntity<UserEntity> currentUser(){
        UserEntity currentUser = new UserEntity();
        currentUser = EntityMapper.mapper.convert(currentUser);
        return ResponseEntity.ok(currentUser);
    }
}
