@@ .. @@
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from '../../hooks/useAuth';
+import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
-    username: '',
+    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

-    const result = await login(formData.username, formData.password);
+    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 bg-[size:20px_20px] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-r from-medical-500/10 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-medical-500 to-medical-600 rounded-2xl flex items-center justify-center shadow-lg shadow-medical-500/25">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold font-display text-slate-900 dark:text-white mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to your MediCare account to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
-                <Label htmlFor="username">Username</Label>
+                <Label htmlFor="email">Email</Label>
                <Input
-                  id="username"
-                  name="username"
-                  type="text"
-                  value={formData.username}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-medical-600 focus:ring-medical-500" />
                  <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-medical-600 hover:text-medical-700 font-medium">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-6">
-              <p className="text-sm text-muted-foreground">
-                Demo Credentials:
-              </p>
-              <div className="mt-2 text-xs space-y-1">
-                <p><strong>Admin:</strong> admin / admin123</p>
-                <p><strong>Doctor:</strong> doctor1 / password</p>
-                <p><strong>Nurse:</strong> nurse1 / password</p>
-                <p><strong>Patient:</strong> patient1 / password</p>
-              </div>
-            </div>
+            <div className="mt-6 text-center space-y-4">
+              <p className="text-sm text-muted-foreground">
+                New patient?{' '}
                <Link to="/register" className="text-medical-600 hover:text-medical-700 font-semibold">
+                  Register here
+                </Link>
+              </p>
+              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">
+                  Demo Credentials:
+                </p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <strong className="text-medical-600">Admin:</strong> admin@hospital.com / admin123
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <strong className="text-green-600">Doctor:</strong> doctor@hospital.com / doctor123
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <strong className="text-blue-600">Patient:</strong> patient@hospital.com / patient123
                  </div>
+                </div>
+              </div>
+            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginForm;