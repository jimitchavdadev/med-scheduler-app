package com.backend.medapp.controller;

import com.backend.medapp.dto.DoctorDto;
import com.backend.medapp.dto.ProfileRequestDto;
import com.backend.medapp.model.User;
import com.backend.medapp.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<List<DoctorDto>> getAllDoctors(@RequestParam(required = false) String specialty) {
        return ResponseEntity.ok(doctorService.getAllDoctors(specialty));
    }

    @PostMapping("/profile")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<DoctorDto> createOrUpdateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProfileRequestDto profileDto
    ) {
        DoctorDto updatedProfile = doctorService.createOrUpdateProfile(user, profileDto);
        return ResponseEntity.ok(updatedProfile);
    }
}
