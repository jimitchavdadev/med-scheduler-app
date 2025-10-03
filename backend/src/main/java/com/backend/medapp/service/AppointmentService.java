package com.backend.medapp.service;

import com.backend.medapp.dto.AppointmentDto;
import com.backend.medapp.dto.AppointmentRequestDto;
import com.backend.medapp.exception.ResourceNotFoundException;
import com.backend.medapp.model.*;
import com.backend.medapp.repository.AppointmentRepository;
import com.backend.medapp.repository.DoctorProfileRepository;
import com.backend.medapp.repository.PatientProfileRepository;
import com.backend.medapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final PatientProfileRepository patientProfileRepository;

    public AppointmentDto createAppointment(User patient, AppointmentRequestDto requestDto) {
        // Ensure patient has a profile
        patientProfileRepository.findByUserId(patient.getId())
                .orElseThrow(() -> new IllegalStateException("Patient profile not found. Please create a profile first."));

        User doctor = userRepository.findById(requestDto.getDoctorId())
                .filter(u -> u.getRole() == Role.DOCTOR)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + requestDto.getDoctorId()));

        // TODO: Add logic here to check doctor's availability and for conflicting appointments.

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentTime(requestDto.getAppointmentTime())
                .notes(requestDto.getNotes())
                .status(AppointmentStatus.SCHEDULED)
                .build();

        Appointment savedAppointment = appointmentRepository.save(appointment);
        return mapToDto(savedAppointment);
    }

    // This method is a placeholder; you'd want more specific queries in a real app
    public List<AppointmentDto> getMyAppointments(User user) {
        return appointmentRepository.findAll().stream()
                .filter(app -> app.getPatient().getId().equals(user.getId()) || app.getDoctor().getId().equals(user.getId()))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private AppointmentDto mapToDto(Appointment appointment) {
        // Fetch profiles to get names. Handle cases where profiles might be missing.
        String patientName = patientProfileRepository.findByUserId(appointment.getPatient().getId())
                .map(p -> p.getFirstName() + " " + p.getLastName())
                .orElse("N/A");
        String doctorName = doctorProfileRepository.findByUserId(appointment.getDoctor().getId())
                .map(p -> p.getFirstName() + " " + p.getLastName())
                .orElse("N/A");

        return AppointmentDto.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatient().getId())
                .patientName(patientName)
                .doctorId(appointment.getDoctor().getId())
                .doctorName(doctorName)
                .appointmentTime(appointment.getAppointmentTime())
                .status(appointment.getStatus())
                .notes(appointment.getNotes())
                .build();
    }
}
