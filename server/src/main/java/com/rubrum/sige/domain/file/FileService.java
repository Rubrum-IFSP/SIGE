package com.rubrum.sige.domain.file;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class FileService {
    @Autowired
    private FileStorageProperties properties;

    public Path getPath() {
        return Paths.get(properties.getDir()).toAbsolutePath().normalize();
    }

    public String saveFile(MultipartFile file) {
        String name = StringUtils.cleanPath(UUID.randomUUID().toString().substring(1, 10) + "." + StringUtils.getFilenameExtension(file.getOriginalFilename()));

        try {
            Path target = getPath().resolve(name);
            file.transferTo(target);

            String downloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(name)
                .toUriString();
            
            return downloadUri;
        } catch(Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
