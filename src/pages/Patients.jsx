import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';

const Patients = () => {
  return (
    <Routes>
      <Route index element={<PatientList />} />
      <Route path="new" element={<PatientForm />} />
      <Route path=":id/edit" element={<PatientForm isEdit={true} />} />
    </Routes>
  );
};

export default Patients;