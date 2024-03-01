package ir.mbbn.application.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;

import java.nio.charset.StandardCharsets;

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

    /*public String createToken(User user) {
        return Jwts.builder()
                .setIssuer("issuer")
                .setSubject("subject")
                .claim("name", user.getFirstName() + " "+ user.getLastName())
                .claim("scope", "admins")
                .setIssuedAt(new Date())
                .setExpiration(new Date())
                .signWith(SignatureAlgorithm.HS256,
                        TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E="))
                .compact();
    }*/
}
