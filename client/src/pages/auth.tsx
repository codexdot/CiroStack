import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const { user, isLoading, isAuthenticated, login, logout, isLoggingIn, loginError } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password });
      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] bg-clip-text text-transparent">
                CiroStack Dashboard
              </h1>
              <Button 
                onClick={() => logout()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>
                  You are successfully signed in. {user.isAdmin && "You have admin access."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold">
                      {user.firstName || user.lastName 
                        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                        : user.username
                      }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email || 'No email provided'}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => window.location.href = "/"}
                      className="bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] text-white"
                    >
                      Go to Portfolio
                    </Button>
                    {user.isAdmin && (
                      <Button 
                        onClick={() => window.location.href = "/admin"}
                        variant="outline"
                      >
                        Admin Dashboard
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] bg-clip-text text-transparent">
            CiroStack Dashboard
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-2 bg-gradient-to-br from-card/80 to-background/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] bg-clip-text text-transparent">
                Sign In
              </CardTitle>
              <CardDescription>
                Access the admin dashboard to manage your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {loginError && (
                  <div className="text-sm text-red-500 text-center">
                    {loginError.message}
                  </div>
                )}
                <Button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] text-white border-0 hover:opacity-90 transition-all"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 pt-6 border-t space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Demo credentials:
                </p>
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p><strong>Username:</strong> admin</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}