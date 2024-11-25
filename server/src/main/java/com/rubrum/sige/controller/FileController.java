package com.rubrum.sige.controller;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rubrum.sige.domain.file.FileService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/files")
public class FileController {
    @Autowired
    private FileService service;

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName, HttpServletRequest request) {
        Path filePath = service.getPath().resolve(fileName).normalize();

        try {
            Resource resource = new UrlResource(filePath.toUri());
            String contentType = request.getServletContext().getMimeType( resource.getFile().getAbsolutePath() );

            if(contentType == null) contentType = "application/octet-stream";

            return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
