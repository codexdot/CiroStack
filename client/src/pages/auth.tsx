import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Shield } from "lucide-react";

export default function AuthPage() {
  const { user, isLoading, isAuthenticated } = useAuth();

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
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] bg-clip-text text-transparent">
                CiroStack Dashboard
              </h1>
              <Button 
                onClick={() => window.location.href = "/api/logout"}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Welcome Back!
                </CardTitle>
                <CardDescription>
                  You are successfully signed in to your CiroStack account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  {user.profileImageUrl ? (
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {user.firstName || user.lastName 
                        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                        : 'Portfolio User'
                      }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email || 'No email provided'}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Account Status</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Active & Verified</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Member Since</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] hover:opacity-90"
                  >
                    View Portfolio
                  </Button>
                  <Button 
                    onClick={() => window.location.href = "/admin"}
                    variant="outline"
                  >
                    Admin Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] bg-clip-text text-transparent">
              CiroStack Portfolio
            </CardTitle>
            <CardDescription>
              Sign in to access your portfolio dashboard and admin features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Secure Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign in securely using your Replit account to access admin features and manage your portfolio content.
                </p>
              </div>

              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-gradient-to-r from-[#00f0ff] to-[#ff00f0] hover:opacity-90"
                size="lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In with Replit
              </Button>

              <p className="text-xs text-muted-foreground">
                By signing in, you agree to access portfolio management features
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}