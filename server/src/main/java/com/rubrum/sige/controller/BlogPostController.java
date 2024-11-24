package com.rubrum.sige.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.blogPost.BlogPost;
import com.rubrum.sige.domain.blogPost.BlogPostRepository;
import com.rubrum.sige.domain.blogPost.BlogPostRequestDTO;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@Validated
@Slf4j
@RequestMapping("/blogPost")
public class BlogPostController {

    @Autowired
    BlogPostRepository repository;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody BlogPostRequestDTO data) {

        BlogPost obj = new BlogPost(data);

        repository.save(obj);

        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getBySchoolId")
    public List<BlogPost> getBySchoolId(@RequestParam String schoolId) {
        return repository.findAllBySchoolId(schoolId);
    }

    @GetMapping("/deleteById")
    public ResponseEntity<String> deleteById(@RequestParam String id) {
        BlogPost obj = repository.findById(id).get();

        repository.delete(obj);

        return ResponseEntity.ok("ok");
    }

}
