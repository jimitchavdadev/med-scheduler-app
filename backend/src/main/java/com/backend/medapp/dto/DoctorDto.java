package com.backend.medapp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorDto {
    private Long id; // This is the user ID
    private String email;
    private String firstName;
    private String lastName;
    private String specialty;
    private String qualifications;
}
