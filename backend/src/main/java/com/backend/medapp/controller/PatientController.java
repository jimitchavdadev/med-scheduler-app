package com.backend.medapp.controller;

import com.backend.medapp.dto.ProfileRequestDto;
import com.backend.medapp.model.PatientProfile;
import com.backend.medapp.model.User;
import com.backend.medapp.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/profile")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<PatientProfile> createOrUpdateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProfileRequestDto profileDto
    ) {
        PatientProfile updatedProfile = patientService.createOrUpdateProfile(user, profileDto);
        return ResponseEntity.ok(updatedProfile);
    }
}
