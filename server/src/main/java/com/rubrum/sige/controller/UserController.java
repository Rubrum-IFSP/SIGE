package com.rubrum.sige.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.user.User;
import com.rubrum.sige.domain.user.UserRepository;
import com.rubrum.sige.domain.user.UserRequestDTO;
import com.rubrum.sige.domain.user.UserResponseDTO;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserRepository repository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserRequestDTO data) {
        User user = new User(data);
        repository.save(user);
        return ResponseEntity.ok("usuário criado com sucesso!");
    }

    @GetMapping("/schools")
    public void getUserSchools(@RequestHeader String userEmail) {
        
    }

    @GetMapping()
    public List<UserResponseDTO> getAll() {
        List<UserResponseDTO> userList = repository.findAll().stream().map(UserResponseDTO::new).toList();;
        return userList;
    }

}
