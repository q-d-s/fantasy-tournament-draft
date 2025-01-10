import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
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
          <h1 className="text-3xl font-khand text-primary">Welcome to TDL</h1>
          <p className="text-gray-600 mt-2">Sign in to join tournaments and leagues</p>
        </div>
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