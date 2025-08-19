@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Activity, TrendingUp, UserCheck, Stethoscope, ArrowUpRight, Plus, Eye } from 'lucide-react';
+import { Users, Calendar, DollarSign, Activity, TrendingUp, UserCheck, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
-      value: '2,847',
+      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'text-medical-600',
      bgColor: 'bg-medical-50',
      iconColor: 'text-medical-600'
    },
    {
-      title: 'Appointments Today',
-      value: '156',
+      title: 'Active Doctors',
+      value: '24',
      change: '+8%',
      changeType: 'increase',
-      icon: Calendar,
+      icon: Stethoscope,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
-      title: 'Revenue This Month',
-      value: '$84,290',
+      title: 'Today\'s Appointments',
+      value: '45',
      change: '+23%',
      changeType: 'increase',
-      icon: DollarSign,
+      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
-      title: 'Active Staff',
-      value: '89',
+      title: 'Monthly Revenue',
+      value: '$52,340',
      change: '+2%',
      changeType: 'increase',
-      icon: UserCheck,
+      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  const monthlyData = [
-    { month: 'Jan', patients: 400, revenue: 24000 },
-    { month: 'Feb', patients: 300, revenue: 18000 },
-    { month: 'Mar', patients: 500, revenue: 32000 },
-    { month: 'Apr', patients: 450, revenue: 28000 },
-    { month: 'May', patients: 600, revenue: 38000 },
-    { month: 'Jun', patients: 550, revenue: 35000 },
+    { month: 'Jan', patients: 120, revenue: 24000 },
+    { month: 'Feb', patients: 98, revenue: 18000 },
+    { month: 'Mar', patients: 156, revenue: 32000 },
+    { month: 'Apr', patients: 134, revenue: 28000 },
+    { month: 'May', patients: 178, revenue: 38000 },
+    { month: 'Jun', patients: 165, revenue: 35000 },
  ];

  const departmentData = [
    { name: 'Cardiology', value: 30, color: '#0ea5e9' },
    { name: 'Neurology', value: 25, color: '#10b981' },
    { name: 'Orthopedics', value: 20, color: '#f59e0b' },
    { name: 'Pediatrics', value: 15, color: '#ef4444' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
  ];

  const recentActivities = [
    { action: 'New patient registered', time: '2 minutes ago', type: 'patient', icon: Users },
    { action: 'Dr. Johnson completed consultation', time: '15 minutes ago', type: 'consultation', icon: Stethoscope },
    { action: 'Appointment scheduled for tomorrow', time: '1 hour ago', type: 'appointment', icon: Calendar },
    { action: 'New doctor added to cardiology', time: '2 hours ago', type: 'staff', icon: UserCheck },
    { action: 'Patient bill generated', time: '3 hours ago', type: 'billing', icon: DollarSign },
  ];
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back! Here's what's happening at your hospital today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
+          <p className="text-muted-foreground">Hospital Management Overview</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-elevated transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <ArrowUpRight className="h-4 w-4" />
                      <span>{stat.change}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      vs last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patient Registrations</CardTitle>
                  <CardDescription>New patient registrations by month</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
+              <CardDescription>New patient registrations by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Patient distribution by department</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest hospital activities and updates</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New patient registered', time: '2 minutes ago', type: 'patient' },
-                { action: 'Dr. Smith completed surgery', time: '15 minutes ago', type: 'surgery' },
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-medical-50 dark:group-hover:bg-medical-900/20 transition-colors">
                    <activity.icon className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-medical-600 dark:group-hover:text-medical-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;