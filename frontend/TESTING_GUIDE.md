# MedScheduler Testing Guide

This guide provides step-by-step instructions for testing all features of the MedScheduler application.

## Setup

1. Start the application:
```bash
npm start
```

The application will automatically open at `http://localhost:4200/`

## Testing Scenarios

### 1. Patient Flow

#### 1.1 Login as Patient
1. Navigate to the login page (should be default)
2. Enter credentials:
   - Email: `patient@test.com`
   - Password: `password`
3. Click "Login"
4. **Expected**: Redirect to `/patient/profile`

#### 1.2 Update Patient Profile
1. On the Patient Profile page, fill in:
   - First Name: `Jane`
   - Last Name: `Smith`
   - Date of Birth: Select any date
2. Click "Save Profile"
3. **Expected**: Success message appears

#### 1.3 Browse Doctors
1. Click "Doctors" in the sidebar
2. **Expected**: Table showing 4 doctors
3. Enter "Cardiology" in the filter field
4. **Expected**: Table filters to show only Cardiology doctors
5. Test sorting by clicking column headers
6. Test pagination if needed

#### 1.4 Book Appointment
1. Click "Book Appointment" in the sidebar
2. Fill in the form:
   - Select a doctor from dropdown
   - Choose a future date
   - Enter time (e.g., 14:30)
   - Add notes (optional)
3. Click "Book Appointment"
4. **Expected**: Success message and redirect to "My Appointments"

#### 1.5 View Appointments
1. Click "My Appointments" in the sidebar
2. **Expected**: See all appointments including newly booked one
3. Click refresh button
4. **Expected**: Table refreshes

#### 1.6 Test Dark Mode
1. Click the brightness icon in the header
2. **Expected**: Theme switches to dark mode
3. Click again to switch back
4. **Expected**: Preference is saved (refresh page to verify)

#### 1.7 Logout
1. Click on the account circle in the header
2. Select "Logout"
3. **Expected**: Redirect to login page

### 2. Doctor Flow

#### 2.1 Login as Doctor
1. On the login page, enter:
   - Email: `doctor@test.com`
   - Password: `password`
2. Click "Login"
3. **Expected**: Redirect to `/doctor/profile`

#### 2.2 Update Doctor Profile
1. On the Doctor Profile page, fill in:
   - First Name: `Robert`
   - Last Name: `Johnson`
   - Specialty: `Dermatology`
   - Qualifications: `MD, FAAD`
2. Click "Save Profile"
3. **Expected**: Success message appears

#### 2.3 View Appointments
1. Click "My Appointments" in the sidebar
2. **Expected**: See appointments scheduled with this doctor
3. Note: Doctor view shows "Patient Name" column instead of "Doctor Name"

#### 2.4 Logout
1. Click on the account circle in the header
2. Select "Logout"

### 3. Registration Flow

#### 3.1 Register New Patient
1. On the login page, click "Register here"
2. Fill in the registration form:
   - Email: `newpatient@test.com`
   - Password: `password123`
   - Role: Select "Patient"
3. Click "Register"
4. **Expected**: Auto-login and redirect to patient profile

#### 3.2 Register New Doctor
1. Logout if logged in
2. Go to registration page
3. Fill in the form:
   - Email: `newdoctor@test.com`
   - Password: `password123`
   - Role: Select "Doctor"
4. Click "Register"
5. **Expected**: Auto-login and redirect to doctor profile

### 4. Error Handling Tests

#### 4.1 Invalid Login
1. Try to login with:
   - Email: `wrong@test.com`
   - Password: `wrongpassword`
2. **Expected**: Error message appears

#### 4.2 Form Validation
1. On any form, try to submit without filling required fields
2. **Expected**: Submit button is disabled
3. Start filling fields and see validation errors clear

#### 4.3 Email Validation
1. On login/register, enter invalid email (e.g., `notanemail`)
2. **Expected**: "Please enter a valid email" error

### 5. Responsive Design Tests

#### 5.1 Mobile View
1. Resize browser to mobile width (< 768px)
2. **Expected**:
   - Sidebar is hidden by default
   - Menu (hamburger) button appears in header
   - Tables are scrollable horizontally
   - Forms stack vertically

#### 5.2 Sidebar Toggle
1. In mobile view, click the menu button
2. **Expected**: Sidebar slides in from left
3. Click outside or navigate to close
4. **Expected**: Sidebar closes automatically

### 6. Navigation Tests

#### 6.1 Protected Routes
1. Logout
2. Try to access `/patient/profile` directly
3. **Expected**: Redirect to login

#### 6.2 Role-Based Access
1. Login as Patient
2. Try to access `/doctor/profile` directly
3. **Expected**: Redirect to login (unauthorized)

#### 6.3 Breadcrumb Navigation
1. Login and navigate through different pages
2. Use browser back button
3. **Expected**: Navigation history works correctly

### 7. Data Persistence Tests

#### 7.1 Theme Persistence
1. Toggle dark mode
2. Refresh the page
3. **Expected**: Dark mode preference is maintained

#### 7.2 Login State
1. Login
2. Refresh the page
3. **Expected**: Remain logged in
4. Clear localStorage and refresh
5. **Expected**: Redirect to login

#### 7.3 Mock Data Updates
1. Book an appointment
2. Navigate away and back
3. **Expected**: New appointment is still visible

## Test Checklist

- [ ] Patient login works
- [ ] Doctor login works
- [ ] Registration works for both roles
- [ ] Patient profile update works
- [ ] Doctor profile update works
- [ ] Doctor list displays and filters correctly
- [ ] Appointment booking works
- [ ] Appointments display correctly for both roles
- [ ] Dark/Light theme toggle works
- [ ] Theme preference persists
- [ ] Logout works
- [ ] Form validations work
- [ ] Error messages display correctly
- [ ] Responsive design works on mobile
- [ ] Sidebar toggle works
- [ ] Protected routes are secured
- [ ] Role-based routing works
- [ ] Navigation works correctly
- [ ] Refresh button works on appointments

## Known Behaviors

1. **Mock Data**: All data is stored in-memory and will reset on page refresh
2. **API Delays**: 500ms delay simulated for all operations
3. **Auto-increment IDs**: New appointments get IDs starting from 4
4. **Token Validation**: Only email/password validation, no expiration
5. **Date Format**: Appointments display in local timezone

## Tips for Testing

- Use browser DevTools to inspect localStorage
- Check Network tab to see simulated delays
- Test on different screen sizes using DevTools responsive mode
- Verify Material Design components render correctly
- Check console for any errors
- Test keyboard navigation and accessibility
