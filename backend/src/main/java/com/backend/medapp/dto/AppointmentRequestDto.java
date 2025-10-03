package com.backend.medapp.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentRequestDto {
    @NotNull
    private Long doctorId;

    @NotNull
    @Future
    private LocalDateTime appointmentTime;

    private String notes;
}
