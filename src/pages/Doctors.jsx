import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorList from '../components/doctors/DoctorList';

const Doctors = () => {
  return (
    <Routes>
      <Route index element={<DoctorList />} />
    </Routes>
  );
};

export default Doctors;