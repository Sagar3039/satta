
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Hard-coded admin credentials (in a real app, use Firebase Authentication)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "sattaking2025";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
        variant: "default",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <section className="py-20 relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black z-0"></div>
        
        <div className="container relative z-10 mx-auto px-4">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto">
              <Card className="bg-black/40 border border-white/10">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    <span className="gold-text">Admin</span> Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-white">Username</label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-black/60 border-white/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-white">Password</label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/60 border-white/20"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gold hover:bg-gold/80 text-black">
                      Login
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          ) : (
            <AdminDashboard />
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Admin;
