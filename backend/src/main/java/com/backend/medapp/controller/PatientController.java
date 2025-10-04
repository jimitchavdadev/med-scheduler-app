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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<PatientProfile> getProfile(@AuthenticationPrincipal User user) {
        PatientProfile profile = patientService.getProfile(user);
        return ResponseEntity.ok(profile);
    }

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