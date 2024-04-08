package ir.mbbn.application.web.rest;

import ir.mbbn.data.entity.AuthorityEntity;
import ir.mbbn.data.entity.RoleEntity;
import ir.mbbn.data.entity.UserEntity;
import ir.mbbn.data.entity.UserRoleEntity;
import ir.mbbn.mapper.EntityMapper;
import ir.mbbn.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.UUID;

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
        currentUser.setId(UUID.randomUUID().toString());
        currentUser.setMobile(933_633_9560L);
        currentUser.setEnabled(true);
        HashSet<UserRoleEntity> roles = new HashSet<>();
        UserRoleEntity userRole = new UserRoleEntity();
        userRole.setId(1);
        userRole.setEnable(true);
        RoleEntity role = new RoleEntity();
        role.setId(UUID.randomUUID().toString());
        role.setName("ROLE1");
        HashSet<AuthorityEntity> authorities = new HashSet<>();
        AuthorityEntity authority = new AuthorityEntity();
        authority.setId(UUID.randomUUID().toString());
        authority.setAuthority("AUTH1");
        authorities.add(authority);
        role.setAuthorities(authorities);
        userRole.setRole(role);
        roles.add(userRole);
        currentUser.setRoles(roles);
        currentUser = EntityMapper.mapper.convert(currentUser);
        return ResponseEntity.ok(currentUser);
    }
}
