# MedScheduler Frontend Application

A complete Angular single-page application (SPA) for medical appointment scheduling with role-based access control, responsive design, and dark mode support.

## Features

- **Authentication System**: Login/Register with JWT token management
- **Role-Based Access**: Separate interfaces for Patients and Doctors
- **Patient Features**:
  - Profile management (name, date of birth)
  - Browse available doctors with filtering
  - Book appointments with doctors
  - View appointment history
- **Doctor Features**:
  - Profile management (name, specialty, qualifications)
  - View scheduled appointments
- **UI/UX**:
  - Angular Material components
  - Responsive design (mobile-friendly)
  - Dark/Light theme toggle
  - Smooth animations and transitions

## Technology Stack

- Angular 20
- Angular Material
- RxJS for reactive programming
- JWT-decode for token handling
- TypeScript
- SCSS for styling

## Mock Credentials

### Patient Login
- Email: `patient@test.com`
- Password: `password`

### Doctor Login
- Email: `doctor@test.com`
- Password: `password`

## Project Structure

```
src/app/
├── auth/                    # Authentication module
│   ├── login/              # Login component
│   ├── register/           # Register component
│   └── auth.service.ts     # Authentication service with mock data
├── patient/                # Patient module
│   ├── profile/            # Patient profile component
│   └── patient.service.ts  # Patient service with mock data
├── doctor/                 # Doctor module
│   ├── doctor-list/        # Doctor list component
│   ├── profile/            # Doctor profile component
│   └── doctor.service.ts   # Doctor service with mock data
├── appointment/            # Appointment module
│   ├── book-appointment/   # Book appointment component
│   ├── my-appointments/    # Appointments list component
│   └── appointment.service.ts # Appointment service with mock data
├── shared/                 # Shared components and services
│   ├── header/            # Header with navigation
│   ├── sidebar/           # Sidebar navigation
│   ├── footer/            # Footer component
│   ├── theme.service.ts   # Theme management
│   └── http-error.service.ts # Error handling
└── core/                   # Core functionality
    ├── guards/            # Route guards (auth, role)
    └── interceptors/      # HTTP interceptors (JWT)
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:4200/`

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode

## Key Features Explained

### Authentication
- Uses mock JWT tokens stored in localStorage
- Automatic token injection via HTTP interceptor
- Role-based routing and UI rendering

### Mock Data
- All services use in-memory mock data with simulated API delays
- No backend required - fully functional frontend demo

### Responsive Design
- Collapsible sidebar on mobile devices (< 768px)
- Responsive tables with pagination and sorting
- Mobile-optimized forms and layouts

### Theme System
- Toggle between light and dark modes
- Persistent theme preference in localStorage
- Material Design color scheme

## Routes

### Public Routes
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Patient Routes (requires PATIENT role)
- `/patient/profile` - Patient profile management
- `/doctors` - Browse available doctors
- `/appointment/book` - Book new appointment
- `/appointment/my` - View appointments

### Doctor Routes (requires DOCTOR role)
- `/doctor/profile` - Doctor profile management
- `/appointment/my` - View appointments

## Development Notes

- All components are standalone for better tree-shaking
- Routes use lazy loading for optimal performance
- Forms use reactive forms with validation
- RxJS operators for debouncing and filtering
- Material Design principles throughout

## Mock Data Details

### Doctors
- 4 mock doctors with different specialties (Cardiology, Neurology, Pediatrics, Orthopedics)

### Appointments
- Pre-populated appointment history
- Status tracking (SCHEDULED, COMPLETED, CANCELLED)
- Color-coded status chips

### Profiles
- Default patient profile (John Doe)
- Default doctor profile (Alice Smith)
