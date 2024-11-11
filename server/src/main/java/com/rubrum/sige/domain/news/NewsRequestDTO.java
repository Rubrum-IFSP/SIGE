package com.rubrum.sige.domain.news;

import org.springframework.web.multipart.MultipartFile;

public record NewsRequestDTO( String schoolId, String newsType, String title, String content, MultipartFile[] images, String autors ) {
    
}
