import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSupabase } from "@/lib/supabase";
import { apiRequest } from "@/lib/queryClient";

export default function TestAuth() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const testSupabaseConfig = async () => {
    try {
      const response = await fetch('/api/config/supabase');
      const config = await response.json();
      console.log('Supabase config:', config);
      toast({
        title: "Supabase Config Retrieved",
        description: `URL: ${config.url ? 'Present' : 'Missing'}`,
      });
    } catch (error) {
      console.error('Config test failed:', error);
      toast({
        title: "Config test failed",
        description: "Check console for details",
        variant: "destructive",
      });
    }
  };

  const testSupabaseSignup = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User'
        }),
      });

      console.log('Signup response:', response);
      toast({
        title: "Signup Test Complete",
        description: "Check console for response details",
      });
    } catch (error: any) {
      console.error('Signup test failed:', error);
      toast({
        title: "Signup test failed",
        description: error.message || "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testSupabaseClient = async () => {
    try {
      const supabase = await getSupabase();
      console.log('Supabase client:', supabase);
      
      if (supabase) {
        toast({
          title: "Supabase Client Ready",
          description: "Client initialized successfully",
        });
      } else {
        toast({
          title: "Supabase Client Failed",
          description: "Client not available",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Client test failed:', error);
      toast({
        title: "Client test failed",
        description: "Check console for details",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Test Supabase Auth</CardTitle>
          <CardDescription>
            Test various authentication components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testSupabaseConfig} variant="outline" className="w-full">
            Test Config Endpoint
          </Button>
          
          <Button onClick={testSupabaseClient} variant="outline" className="w-full">
            Test Supabase Client
          </Button>
          
          <Button 
            onClick={testSupabaseSignup} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Testing Signup..." : "Test Signup API"}
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/login'}
            variant="secondary"
            className="w-full"
          >
            Go to Login Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}