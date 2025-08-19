@@ .. @@
import React from 'react';
-import { Menu, Bell, Moon, Sun, LogOut } from 'lucide-react';
+import { Menu, Bell, Moon, Sun, LogOut, Search, Settings, User, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
-    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between">
+    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
-          className="lg:hidden"
+          className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
-        <h1 className="text-xl font-semibold">Hospital Management System</h1>
+        
+        {/* Search Bar */}
+        <div className="hidden md:flex items-center relative">
+          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
+          <input
+            type="text"
+            placeholder="Search patients, doctors..."
+            className="pl-10 pr-4 py-2 w-80 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent"
+          />
+        </div>
      </div>

-      <div className="flex items-center space-x-2">
-        <Button variant="ghost" size="icon">
+      <div className="flex items-center space-x-3">
+        {/* Notifications */}
+        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-700">
          <Bell className="h-5 w-5" />
+          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
+            3
+          </span>
        </Button>
        
-        <Button variant="ghost" size="icon" onClick={toggleTheme}>
+        {/* Theme Toggle */}
+        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hover:bg-slate-100 dark:hover:bg-slate-700">
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

-        <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-accent">
-          <span className="text-sm font-medium">{user?.role}</span>
+        {/* User Profile Dropdown */}
+        <div className="relative group">
+          <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
+            <div className="w-8 h-8 bg-gradient-to-r from-medical-500 to-medical-600 rounded-full flex items-center justify-center">
+              <User className="h-4 w-4 text-white" />
+            </div>
+            <div className="hidden md:block text-left">
+              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
+                {user?.name || 'User'}
+              </div>
+              <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
+                {user?.role || 'Role'}
+              </div>
+            </div>
+            <ChevronDown className="h-4 w-4 text-slate-400" />
+          </Button>
+          
+          {/* Dropdown Menu */}
+          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-elevated border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
+            <div className="p-2">
+              <Button variant="ghost" className="w-full justify-start text-sm">
+                <User className="h-4 w-4 mr-2" />
+                Profile
+              </Button>
+              <Button variant="ghost" className="w-full justify-start text-sm">
+                <Settings className="h-4 w-4 mr-2" />
+                Settings
+              </Button>
+              <hr className="my-2 border-slate-200 dark:border-slate-700" />
+              <Button 
+                variant="ghost" 
+                className="w-full justify-start text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
+                onClick={logout}
+              >
+                <LogOut className="h-4 w-4 mr-2" />
+                Sign Out
+              </Button>
+            </div>
+          </div>
        </div>
-
-        <Button variant="ghost" size="icon" onClick={logout}>
-          <LogOut className="h-5 w-5" />
-        </Button>
      </div>
    </header>
  );
};