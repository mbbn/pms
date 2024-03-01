package ir.mbbn.application.web;

import ir.mbbn.application.web.dto.LoginRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/auth")
    public ResponseEntity<String> authentication(@RequestBody LoginRequestDTO requestDTO){
        try {
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestDTO.getUsername(), requestDTO.getPassword()));
            String mobile = authentication.getName();
//            User user = new User();
//            String token = JWTUtil.INSTANCE.createToken(user);
//            return ResponseEntity.ok(token);
            return null;
        }catch (BadCredentialsException e){
//            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST,"Invalid username or password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }catch (Exception e){
//            ErrorRes errorResponse = new ErrorRes(HttpStatus.BAD_REQUEST, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
