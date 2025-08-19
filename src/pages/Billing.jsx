import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BillingList from '../components/billing/BillingList';

const Billing = () => {
  return (
    <Routes>
      <Route index element={<BillingList />} />
    </Routes>
  );
};

export default Billing;