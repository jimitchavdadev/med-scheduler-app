package com.backend.medapp.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ProfileRequestDto {
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;

    // Doctor specific
    private String specialty;
    private String qualifications;

    // Patient specific
    private LocalDate dateOfBirth;
}
