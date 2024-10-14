package com.rubrum.sige.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.rubrum.sige.domain.school.School;

@Service
public class InviteService {
  
    @Value("${api.security.token.secret}")
    private String secret;

    public String generateInvite(School school) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                .withIssuer("sigeapi")
                .withSubject(school.getName())
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);
            return token;
        } catch (Exception e) {
            throw new RuntimeException("Error while generating token.", e);
        }
    }

    public String validateInvite(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                .withIssuer("sigeapi")
                .build()
                .verify(token)
                .getSubject();
        } catch (Exception e) {
            return "";
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(72).toInstant(ZoneOffset.of("-03:00"));
    }
}
