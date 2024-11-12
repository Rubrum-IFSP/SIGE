package com.rubrum.sige.controller;

import java.util.List;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.school_class.SchoolClassRepository;
import com.rubrum.sige.domain.school_class.SchoolClass;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Validated
@RestController
@Slf4j
@RequestMapping("/schoolClass")
public class SchoolClassController {

    @Autowired
    private SchoolClassRepository repository;

    @PostMapping("/get/{name}")
    public List<SchoolClass> getAllBySchoolId(@RequestBody String id) throws BadRequestException {
        List<SchoolClass> schoolClass = repository.findAllBySchoolId(id);

        return schoolClass;
    }

}
