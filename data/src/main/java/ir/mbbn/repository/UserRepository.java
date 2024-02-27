package ir.mbbn.repository;

import ir.mbbn.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    public User findUserByEmail(String email){
        User user = new User();
        user.setEmail(email);
        user.setPassword("123456");
        user.setFirstName("Mohammad");
        user.setLastName("Biabani");
        return user;
    }
}
