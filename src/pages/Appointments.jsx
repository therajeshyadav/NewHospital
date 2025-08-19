import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppointmentCalendar from '../components/appointments/AppointmentCalendar';

const Appointments = () => {
  return (
    <Routes>
      <Route index element={<AppointmentCalendar />} />
    </Routes>
  );
};

export default Appointments;