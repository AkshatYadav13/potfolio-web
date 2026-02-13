import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock, ArrowRight, UserCircle, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const login = useAppStore((state) => state.login);
  const loading = useAppStore((state) => state.loading.login);

  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer"); // 'Customer' or 'Vender'

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    await login({ identifier, password, role });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md border-green-200 dark:border-gray-700 shadow-xl overflow-hidden dark:bg-gray-800">
        <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-green-900 dark:text-gray-100">Welcome Back</CardTitle>
          <CardDescription className="text-green-700 dark:text-gray-300 font-medium">
            Login to access your fresh account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 p-1 bg-green-50 dark:bg-gray-700 rounded-xl border border-green-100 dark:border-gray-600">
              <button
                type="button"
                onClick={() => setRole("Customer")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === "Customer"
                  ? "bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm font-bold"
                  : "text-green-600/60 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium"
                  }`}
              >
                <UserCircle className="w-4 h-4" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole("Vender")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === "Vender"
                  ? "bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 shadow-sm font-bold"
                  : "text-green-600/60 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium"
                  }`}
              >
                <Store className="w-4 h-4" />
                Vendor
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-green-800 dark:text-gray-200">Email or Phone Number</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-green-500 dark:text-green-400" />
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone"
                  className="pl-10 border-green-200 dark:border-gray-600 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-800 dark:text-gray-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-green-500 dark:text-green-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 border-green-200 dark:border-gray-600 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 mt-2 group" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-green-50 dark:border-gray-700 bg-green-50/50 dark:bg-gray-700/50 py-4">
          <p className="text-sm text-green-700 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-green-800 dark:text-green-400 hover:underline">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
