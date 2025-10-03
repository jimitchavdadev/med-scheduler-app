package com.backend.medapp.repository;

import com.backend.medapp.model.DoctorProfile;
import com.backend.medapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {
    Optional<DoctorProfile> findByUserId(Long userId);
    List<DoctorProfile> findBySpecialtyContainingIgnoreCase(String specialty);
}
