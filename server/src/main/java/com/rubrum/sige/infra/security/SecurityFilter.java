package com.rubrum.sige.infra.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;
import com.rubrum.sige.services.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired 
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);

        if (token != null) {
            var email = tokenService.validateToken(token);
            User user = userRepository.findByEmail(email);

            if (user != null) {
                var schoolId = request.getHeader("schoolId");
                String userId = user.getId();

                var userRole = user.getAuthorities(userService.getUserRole(userId, schoolId));
                if (userRole == null) userRole = user.getAuthorities();

                var authentication = new UsernamePasswordAuthenticationToken(user, null, userRole);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        var authReader = request.getHeader("Authorization");
        if (authReader == null) return null;
        return authReader.replace("Bearer ", "");
    }
    
}
