import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSupabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = await getSupabase();
        if (!supabase) {
          throw new Error('Supabase client not available');
        }
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          toast({
            title: "Authentication failed",
            description: error.message,
            variant: "destructive",
          });
          setLocation('/auth');
          return;
        }

        if (data.session) {
          // Store the session token
          localStorage.setItem('supabase_session', JSON.stringify(data.session));
          
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          });
          setLocation('/');
        } else {
          setLocation('/auth');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setLocation('/auth');
      }
    };

    handleAuthCallback();
  }, [setLocation, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Processing authentication...</p>
      </div>
    </div>
  );
}