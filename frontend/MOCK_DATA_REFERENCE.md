# Mock Data Reference

This document provides quick reference for all mock data used in the MedScheduler application.

## Login Credentials

### Patient Account
- **Email**: `patient@test.com`
- **Password**: `password`
- **JWT Token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6IlBBVElFTlQifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`
- **Token Payload**: `{ sub: '1234567890', role: 'PATIENT' }`

### Doctor Account
- **Email**: `doctor@test.com`
- **Password**: `password`
- **JWT Token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwicm9sZSI6IkRPQ1RPUiJ9.4pcPyMD09olPSyXnrXCjTwXyr4BsezdI1AVwmEMcJc0`
- **Token Payload**: `{ sub: '9876543210', role: 'DOCTOR' }`

## Mock Doctors

| ID | Name | Email | Specialty | Qualifications |
|----|------|-------|-----------|----------------|
| 1 | Alice Smith | doctor1@test.com | Cardiology | MD, PhD |
| 2 | Bob Jones | doctor2@test.com | Neurology | MD |
| 3 | Carol Williams | doctor3@test.com | Pediatrics | MD, FAAP |
| 4 | David Brown | doctor4@test.com | Orthopedics | MD, MS |

## Mock Patient Profile

- **First Name**: John
- **Last Name**: Doe
- **Date of Birth**: 1990-01-01

## Mock Doctor Profile

- **First Name**: Alice
- **Last Name**: Smith
- **Specialty**: Cardiology
- **Qualifications**: MD, PhD

## Mock Appointments

### Appointment 1
- **ID**: 1
- **Patient**: John Doe
- **Doctor**: Alice Smith (Cardiology)
- **Time**: 2025-10-05 10:00
- **Status**: SCHEDULED
- **Notes**: Checkup

### Appointment 2
- **ID**: 2
- **Patient**: John Doe
- **Doctor**: Bob Jones (Neurology)
- **Time**: 2025-10-06 14:00
- **Status**: SCHEDULED
- **Notes**: Follow-up

### Appointment 3
- **ID**: 3
- **Patient**: John Doe
- **Doctor**: Alice Smith (Cardiology)
- **Time**: 2025-09-20 09:00
- **Status**: COMPLETED
- **Notes**: Annual physical

## User Roles

```typescript
enum Role {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}
```

## Appointment Status

```typescript
enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
```

## Notes

- All mock data is stored in-memory within services
- API delays are simulated using RxJS `delay(500)` operator
- JWT tokens are pre-generated and validated only by checking email/password
- New appointments are automatically assigned incrementing IDs starting from 4
- Registration creates new JWT tokens dynamically based on selected role
