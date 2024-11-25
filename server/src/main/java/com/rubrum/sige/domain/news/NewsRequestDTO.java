package com.rubrum.sige.domain.news;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public record NewsRequestDTO( String schoolId, String newsType, String title, String content, String authors, List<MultipartFile> images ) {
    
}
