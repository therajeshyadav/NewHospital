@@ .. @@
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ui/toast';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
+import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
+import Patients from './pages/Patients';
+import Doctors from './pages/Doctors';
+import Appointments from './pages/Appointments';
+import Billing from './pages/Billing';
import { useAuth } from './hooks/useAuth';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
-        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
+        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
+      />
+      <Route 
+        path="/register" 
+        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
+      <Route
+        path="/patients/*"
+        element={
+          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
+            <Layout>
+              <Patients />
+            </Layout>
+          </ProtectedRoute>
+        }
+      />
+      <Route
+        path="/doctors/*"
+        element={
+          <ProtectedRoute allowedRoles={['admin']}>
+            <Layout>
+              <Doctors />
+            </Layout>
+          </ProtectedRoute>
+        }
+      />
+      <Route
+        path="/appointments/*"
+        element={
+          <ProtectedRoute>
+            <Layout>
+              <Appointments />
+            </Layout>
+          </ProtectedRoute>
+        }
+      />
+      <Route
+        path="/billing/*"
+        element={
+          <ProtectedRoute allowedRoles={['admin', 'doctor']}>
+            <Layout>
+              <Billing />
+            </Layout>
+          </ProtectedRoute>
+        }
+      />
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;