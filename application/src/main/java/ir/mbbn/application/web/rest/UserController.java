package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(CrudApi.BASE_API_PATH + "/user")
public class UserController extends CrudApi<UserEntity, String> {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    public UserController(UserService userService) {
        super(userService);
    }
}
