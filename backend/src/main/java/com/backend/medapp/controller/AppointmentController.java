package com.backend.medapp.controller;

import com.backend.medapp.dto.AppointmentDto;
import com.backend.medapp.dto.AppointmentRequestDto;
import com.backend.medapp.model.User;
import com.backend.medapp.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @PreAuthorize("hasAuthority('PATIENT')")
    public ResponseEntity<AppointmentDto> createAppointment(
            @AuthenticationPrincipal User patient,
            @Valid @RequestBody AppointmentRequestDto requestDto
    ) {
        AppointmentDto createdAppointment = appointmentService.createAppointment(patient, requestDto);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @GetMapping("/my-appointments")
    public ResponseEntity<List<AppointmentDto>> getMyAppointments(@AuthenticationPrincipal User user) {
        List<AppointmentDto> appointments = appointmentService.getMyAppointments(user);
        return ResponseEntity.ok(appointments);
    }
}
