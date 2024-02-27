package ir.mbbn.util;

import java.nio.charset.StandardCharsets;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

public class JWTUtil {
    public static final JWTUtil INSTANCE = new JWTUtil();
    private final String secretKey = "mySecretKey";

    private final JwtParser jwtParser;

    private JWTUtil() {
        byte[] secretKeyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        jwtParser = Jwts.parserBuilder().setSigningKey(secretKeyBytes).build();
    }

    public void parseJwtClaims(String token){
        Claims body = jwtParser.parseClaimsJwt(token).getBody();
    }
}
