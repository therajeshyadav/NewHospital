@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Pill, DollarSign, Heart, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
+import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const healthStats = [
    {
      title: 'Next Appointment',
-      value: 'Dec 15, 2:30 PM',
+      value: 'Tomorrow, 2:30 PM',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
-      title: 'Active Prescriptions',
-      value: '3',
-      icon: Pill,
+      title: 'Medical Records',
+      value: '12',
+      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Pending Bills',
-      value: '$245.00',
+      value: '$125.00',
      icon: DollarSign,
      color: 'text-orange-600'
    },
    {
      title: 'Last Checkup',
-      value: '2 weeks ago',
+      value: '1 week ago',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const upcomingAppointments = [
-    { date: 'Dec 15, 2024', time: '2:30 PM', doctor: 'Dr. Smith', type: 'Cardiology' },
-    { date: 'Dec 22, 2024', time: '10:00 AM', doctor: 'Dr. Johnson', type: 'General Checkup' },
-    { date: 'Jan 5, 2025', time: '3:00 PM', doctor: 'Dr. Brown', type: 'Follow-up' },
+    { date: 'Tomorrow', time: '2:30 PM', doctor: 'Dr. Smith', type: 'Cardiology' },
+    { date: 'Next Week', time: '10:00 AM', doctor: 'Dr. Johnson', type: 'General Checkup' },
+    { date: 'Next Month', time: '3:00 PM', doctor: 'Dr. Brown', type: 'Follow-up' },
  ];

-  const recentPrescriptions = [
-    { medication: 'Lisinopril 10mg', dosage: 'Once daily', prescribed: '2 weeks ago', status: 'Active' },
-    { medication: 'Metformin 500mg', dosage: 'Twice daily', prescribed: '1 month ago', status: 'Active' },
-    { medication: 'Aspirin 81mg', dosage: 'Once daily', prescribed: '3 weeks ago', status: 'Active' },
+  const recentRecords = [
+    { type: 'Blood Test', result: 'Normal', date: '1 week ago', doctor: 'Dr. Smith' },
+    { type: 'X-Ray', result: 'Clear', date: '2 weeks ago', doctor: 'Dr. Johnson' },
+    { type: 'Consultation', result: 'Follow-up needed', date: '3 weeks ago', doctor: 'Dr. Brown' },
  ];

-  const recentTests = [
-    { test: 'Blood Pressure', result: '120/80 mmHg', date: '2 weeks ago', status: 'Normal' },
-    { test: 'Blood Sugar', result: '95 mg/dL', date: '2 weeks ago', status: 'Normal' },
-    { test: 'Cholesterol', result: '180 mg/dL', date: '1 month ago', status: 'Normal' },
+  const vitalSigns = [
+    { test: 'Blood Pressure', result: '120/80 mmHg', date: '1 week ago', status: 'Normal' },
+    { test: 'Heart Rate', result: '72 bpm', date: '1 week ago', status: 'Normal' },
+    { test: 'Temperature', result: '98.6°F', date: '1 week ago', status: 'Normal' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Patient Portal</h1>
-          <p className="text-muted-foreground">Welcome back, John Doe</p>
+          <p className="text-muted-foreground">Manage your health records and appointments</p>
        </div>
-        <Button>
-          <Calendar className="h-4 w-4 mr-2" />
-          Book Appointment
-        </Button>
+        <Link to="/appointments/new">
+          <Button>
+            <Calendar className="h-4 w-4 mr-2" />
+            Book Appointment
+          </Button>
+        </Link>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

-        {/* Recent Prescriptions */}
+        {/* Recent Medical Records */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
-              <CardTitle>Active Prescriptions</CardTitle>
-              <CardDescription>Your current medications</CardDescription>
+              <CardTitle>Recent Medical Records</CardTitle>
+              <CardDescription>Your latest medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
-                {recentPrescriptions.map((prescription, index) => (
+                {recentRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
-                      <p className="font-medium">{prescription.medication}</p>
-                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
+                      <p className="font-medium">{record.type}</p>
+                      <p className="text-sm text-muted-foreground">{record.doctor}</p>
                    </div>
                    <div className="text-right">
-                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
-                        {prescription.status}
-                      </span>
-                      <p className="text-sm text-muted-foreground mt-1">{prescription.prescribed}</p>
+                      <p className="font-medium">{record.result}</p>
+                      <p className="text-sm text-muted-foreground">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

-      {/* Recent Test Results */}
+      {/* Vital Signs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
-            <CardTitle>Recent Test Results</CardTitle>
-            <CardDescription>Your latest medical test results</CardDescription>
+            <CardTitle>Latest Vital Signs</CardTitle>
+            <CardDescription>Your most recent vital sign measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
-              {recentTests.map((test, index) => (
+              {vitalSigns.map((vital, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
-                    <h4 className="font-medium">{test.test}</h4>
+                    <h4 className="font-medium">{vital.test}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
-                      {test.status}
+                      {vital.status}
                    </span>
                  </div>
-                  <p className="text-2xl font-bold text-primary">{test.result}</p>
-                  <p className="text-sm text-muted-foreground">{test.date}</p>
+                  <p className="text-2xl font-bold text-primary">{vital.result}</p>
+                  <p className="text-sm text-muted-foreground">{vital.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your healthcare needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
-              <Button variant="outline" className="h-20 flex-col">
-                <Calendar className="h-6 w-6 mb-2" />
-                Book Appointment
-              </Button>
-              <Button variant="outline" className="h-20 flex-col">
-                <FileText className="h-6 w-6 mb-2" />
-                View Records
-              </Button>
-              <Button variant="outline" className="h-20 flex-col">
-                <Pill className="h-6 w-6 mb-2" />
-                Prescriptions
-              </Button>
-              <Button variant="outline" className="h-20 flex-col">
-                <DollarSign className="h-6 w-6 mb-2" />
-                Pay Bills
-              </Button>
+              <Link to="/appointments">
+                <Button variant="outline" className="h-20 flex-col w-full">
+                  <Calendar className="h-6 w-6 mb-2" />
+                  My Appointments
+                </Button>
+              </Link>
+              <Link to="/history">
+                <Button variant="outline" className="h-20 flex-col w-full">
+                  <FileText className="h-6 w-6 mb-2" />
+                  Medical History
+                </Button>
+              </Link>
+              <Link to="/prescriptions">
+                <Button variant="outline" className="h-20 flex-col w-full">
+                  <Pill className="h-6 w-6 mb-2" />
+                  Prescriptions
+                </Button>
+              </Link>
+              <Link to="/bills">
+                <Button variant="outline" className="h-20 flex-col w-full">
+                  <DollarSign className="h-6 w-6 mb-2" />
+                  Bills & Payments
+                </Button>
+              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;