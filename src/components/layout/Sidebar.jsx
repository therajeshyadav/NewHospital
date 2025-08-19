@@ .. @@
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
-  Pill, 
  DollarSign, 
-  BarChart3,
  Settings,
  UserCheck,
  Stethoscope,
  Heart,
-  ClipboardList
+  ClipboardList,
+  UserPlus,
+  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
+import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
+  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
    ];

    switch (user?.role) {
-      case 'Administrator':
+      case 'admin':
        return [
          ...baseItems,
-          { icon: Users, label: 'Staff Management', path: '/staff' },
-          { icon: UserCheck, label: 'Patient Management', path: '/patients' },
+          { icon: UserCheck, label: 'Patients', path: '/patients' },
+          { icon: Stethoscope, label: 'Doctors', path: '/doctors' },
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
-          { icon: Pill, label: 'Pharmacy', path: '/pharmacy' },
          { icon: DollarSign, label: 'Billing', path: '/billing' },
-          { icon: BarChart3, label: 'Reports', path: '/reports' },
+          { icon: Activity, label: 'Reports', path: '/reports' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
-      case 'Doctor':
+      case 'doctor':
        return [
          ...baseItems,
-          { icon: UserCheck, label: 'My Patients', path: '/patients' },
+          { icon: UserCheck, label: 'My Patients', path: '/my-patients' },
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: FileText, label: 'Medical Records', path: '/records' },
-          { icon: Pill, label: 'Prescriptions', path: '/prescriptions' },
+          { icon: ClipboardList, label: 'Prescriptions', path: '/prescriptions' },
        ];
-      case 'Nurse':
-        return [
-          ...baseItems,
-          { icon: UserCheck, label: 'Patients', path: '/patients' },
-          { icon: ClipboardList, label: 'Tasks', path: '/tasks' },
-          { icon: FileText, label: 'Reports', path: '/reports' },
-          { icon: Calendar, label: 'Schedule', path: '/schedule' },
-        ];
-      case 'Patient':
+      case 'patient':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: FileText, label: 'Medical History', path: '/history' },
-          { icon: Pill, label: 'Prescriptions', path: '/prescriptions' },
+          { icon: ClipboardList, label: 'Prescriptions', path: '/prescriptions' },
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50",
          "lg:relative lg:translate-x-0 lg:z-auto"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
-              <span className="text-xl font-bold">MediCare</span>
+              <span className="text-xl font-bold">Hospital MS</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
-                  <a
-                    href={item.path}
-                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
+                  <Link
+                    to={item.path}
+                    className={cn(
+                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
+                      location.pathname === item.path
+                        ? "bg-primary text-primary-foreground"
+                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
+                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
-                  </a>
+                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
-                  {user?.role?.charAt(0)}
+                  {user?.name?.charAt(0) || user?.role?.charAt(0)}
                </span>
              </div>
              <div>
-                <p className="text-sm font-medium">{user?.role}</p>
-                <p className="text-xs text-muted-foreground">ID: {user?.id?.slice(-6)}</p>
+                <p className="text-sm font-medium">{user?.name}</p>
+                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;