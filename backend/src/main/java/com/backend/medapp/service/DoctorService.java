package com.backend.medapp.service;

import com.backend.medapp.dto.DoctorDto;
import com.backend.medapp.dto.ProfileRequestDto;
import com.backend.medapp.exception.ResourceNotFoundException;
import com.backend.medapp.model.DoctorProfile;
import com.backend.medapp.repository.DoctorProfileRepository;
import com.backend.medapp.repository.UserRepository;
import com.backend.medapp.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorProfileRepository doctorProfileRepository;
    private final UserRepository userRepository;

    public List<DoctorDto> getAllDoctors(String specialty) {
        List<DoctorProfile> profiles;
        if (specialty != null && !specialty.trim().isEmpty()) {
            profiles = doctorProfileRepository.findBySpecialtyContainingIgnoreCase(specialty);
        } else {
            profiles = doctorProfileRepository.findAll();
        }

        return profiles.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public DoctorDto getProfile(User user) {
        DoctorProfile profile = doctorProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found for user ID: " + user.getId()));
        return mapToDto(profile);
    }

    public DoctorDto createOrUpdateProfile(User user, ProfileRequestDto profileDto) {
        User managedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        DoctorProfile profile = doctorProfileRepository.findByUserId(user.getId())
                .orElse(new DoctorProfile());

        profile.setUser(managedUser);
        profile.setFirstName(profileDto.getFirstName());
        profile.setLastName(profileDto.getLastName());
        profile.setSpecialty(profileDto.getSpecialty());
        profile.setQualifications(profileDto.getQualifications());

        DoctorProfile savedProfile = doctorProfileRepository.save(profile);
        return mapToDto(savedProfile);
    }

    private DoctorDto mapToDto(DoctorProfile profile) {
        return DoctorDto.builder()
                .id(profile.getUser().getId())
                .email(profile.getUser().getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .specialty(profile.getSpecialty())
                .qualifications(profile.getQualifications())
                .build();
    }
}