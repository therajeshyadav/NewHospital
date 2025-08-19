import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Eye, Trash2, Filter, Users, Phone, Mail, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { patientsAPI } from '../../api/patients';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    status: 'active'
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockPatients = [
      {
        id: '1',
        patientId: 'P001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-06-15',
        gender: 'male',
        address: '123 Main St, New York, NY',
        lastVisit: '2024-01-15',
        status: 'active'
      },
      {
        id: '2',
        patientId: 'P002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        phone: '+1 (555) 987-6543',
        dateOfBirth: '1990-03-22',
        gender: 'female',
        address: '456 Oak Ave, Los Angeles, CA',
        lastVisit: '2024-01-10',
        status: 'active'
      },
      {
        id: '3',
        patientId: 'P003',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@email.com',
        phone: '+1 (555) 456-7890',
        dateOfBirth: '1978-11-08',
        gender: 'male',
        address: '789 Pine St, Chicago, IL',
        lastVisit: '2024-01-05',
        status: 'active'
      }
    ];
    
    setPatients(mockPatients);
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        // await patientsAPI.deletePatient(patientId);
        setPatients(patients.filter(p => p.id !== patientId));
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return statusConfig[status] || statusConfig.active;
  };
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white">
            Patient Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage patient records and information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link to="/patients/new">
            <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-medical-50 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-medical-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Patients</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">New This Month</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Today</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Appointments</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Patients</CardTitle>
          <CardDescription>Find patients by name, email, phone, or patient ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name, email, or phone..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patients ({patients.length})</CardTitle>
              <CardDescription>
                Complete list of registered patients
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-500"></div>
                <span className="text-slate-600 dark:text-slate-400">Loading patients...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 dark:border-slate-700">
                      <TableHead className="font-semibold">Patient</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold">Age</TableHead>
                      <TableHead className="font-semibold">Gender</TableHead>
                      <TableHead className="font-semibold">Last Visit</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id} className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {patient.firstName} {patient.lastName}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                ID: {patient.patientId}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-600 dark:text-slate-400">{patient.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-600 dark:text-slate-400">{patient.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {calculateAge(patient.dateOfBirth)}
                        </TableCell>
                        <TableCell>
                          <span className="capitalize text-slate-600 dark:text-slate-400">
                            {patient.gender}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {patient.lastVisit ? formatDate(patient.lastVisit) : 'Never'}
                        </TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(patient.status)}`}>
                            {patient.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Link to={`/patients/${patient.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/patients/${patient.id}/edit`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(patient.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {patients.map((patient) => (
                  <Card key={patient.id} className="hover:shadow-soft transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {patient.firstName} {patient.lastName}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              ID: {patient.patientId}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(patient.status)}`}>
                          {patient.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{patient.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">{patient.address}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Age: </span>
                          <span className="font-medium text-slate-900 dark:text-white">
                            {calculateAge(patient.dateOfBirth)}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Link to={`/patients/${patient.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/patients/${patient.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(patient.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;