import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  DollarSign, 
  BarChart3,
  Settings,
  UserCheck,
  Stethoscope,
  Heart,
  ClipboardList,
  Activity,
  Shield,
  X
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { icon: UserCheck, label: 'Patients', path: '/patients' },
          { icon: Stethoscope, label: 'Doctors', path: '/doctors' },
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: DollarSign, label: 'Billing', path: '/billing' },
          { icon: BarChart3, label: 'Reports', path: '/reports' },
          { icon: Shield, label: 'Staff Management', path: '/staff' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { icon: UserCheck, label: 'Patients', path: '/patients' },
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: FileText, label: 'Medical Records', path: '/records' },
          { icon: Pill, label: 'Prescriptions', path: '/prescriptions' },
          { icon: Activity, label: 'Schedule', path: '/schedule' },
        ];
      case 'nurse':
        return [
          ...baseItems,
          { icon: UserCheck, label: 'Patients', path: '/patients' },
          { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
          { icon: Calendar, label: 'Schedule', path: '/schedule' },
          { icon: Activity, label: 'Vitals', path: '/vitals' },
        ];
      case 'patient':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: FileText, label: 'Medical History', path: '/history' },
          { icon: Pill, label: 'Prescriptions', path: '/prescriptions' },
          { icon: DollarSign, label: 'Bills', path: '/bills' },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-50 transform transition-transform duration-300 ease-in-out shadow-xl",
          "lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Logo */}
          <div className="px-6 py-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-medical-500 to-medical-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  MediCare
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hospital Management
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-medical-500 to-medical-600 text-white shadow-lg shadow-medical-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    location.pathname === item.path 
                      ? "text-white" 
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )} />
                  <span className="font-medium">{item.label}</span>
                  {location.pathname === item.path && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* User info */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || user?.role?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || 'User Name'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {user?.role || 'Role'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;