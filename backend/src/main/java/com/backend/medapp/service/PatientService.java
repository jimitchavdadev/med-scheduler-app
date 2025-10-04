package com.backend.medapp.service;

import com.backend.medapp.dto.ProfileRequestDto;
import com.backend.medapp.exception.ResourceNotFoundException;
import com.backend.medapp.model.PatientProfile;
import com.backend.medapp.model.User;
import com.backend.medapp.repository.PatientProfileRepository;
import com.backend.medapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientProfileRepository patientProfileRepository;
    private final UserRepository userRepository;

    public PatientProfile getProfile(User user) {
        return patientProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found for user ID: " + user.getId()));
    }

    public PatientProfile createOrUpdateProfile(User user, ProfileRequestDto profileDto) {
        User managedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        PatientProfile profile = patientProfileRepository.findByUserId(user.getId())
                .orElse(new PatientProfile());

        profile.setUser(managedUser);
        profile.setFirstName(profileDto.getFirstName());
        profile.setLastName(profileDto.getLastName());
        profile.setDateOfBirth(profileDto.getDateOfBirth());

        return patientProfileRepository.save(profile);
    }
}