@@ .. @@
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  )
}
-    <div className="flex h-screen bg-background">
+    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
-        <main className="flex-1 overflow-auto p-6">
+        <main className="flex-1 overflow-auto p-6 bg-slate-50 dark:bg-slate-900">
+          <div className="max-w-7xl mx-auto">
            {children}
+          </div>
        </main>
      </div>
    </div>
  );
};