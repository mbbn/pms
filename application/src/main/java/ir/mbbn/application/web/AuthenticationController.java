package ir.mbbn.application.web;

import ir.mbbn.application.web.dto.LoginRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1")
@RestController
public class AuthenticationController {

    @PostMapping("/auth")
    public ResponseEntity<String> authentication(@RequestBody LoginRequestDTO requestDTO){
        return ResponseEntity.ok("ok");
    }
}
