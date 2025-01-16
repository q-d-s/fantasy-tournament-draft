import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      }
      if (event === 'USER_UPDATED' && !session) {
        setError("Invalid login credentials");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <img
            src="/lovable-uploads/92bd31db-561d-4a64-8e0a-8fbd69724992.png"
            alt="TDL Logo"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-khand text-[#153624]">Welcome to TDL</h1>
          <p className="text-gray-600 mt-2">Sign in to join tournaments and leagues</p>
        </div>
        {error && (
          <Alert className="mb-4 bg-red-50 text-red-900 border border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <SupabaseAuth 
          supabaseClient={supabase} 
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#153624',
                  brandAccent: '#c2b067',
                }
              }
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;