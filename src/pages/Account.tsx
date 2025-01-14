import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Trophy, Bell, BellOff } from "lucide-react";

interface Profile {
  username: string;
  avatar_url: string | null;
  email_notifications: boolean;
  phone_notifications: boolean;
  default_avatar_icon: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data.",
        });
      } else if (profileData) {
        setProfile(profileData);
      }
      
      setUser(user);
      setLoading(false);
    };

    getProfile();
  }, [navigate, toast]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your profile.",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto py-20 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="container mx-auto py-20 px-4 flex-grow">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>
                {profile?.default_avatar_icon === 'trophy' ? (
                  <Trophy className="h-8 w-8 text-primary" />
                ) : (
                  <User className="h-8 w-8 text-primary" />
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-khand text-primary">My Account</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={profile?.username || ''}
                onChange={(e) => updateProfile({ username: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-khand text-primary">Notifications</h2>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <Switch
                  id="email-notifications"
                  checked={profile?.email_notifications || false}
                  onCheckedChange={(checked) => 
                    updateProfile({ email_notifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellOff className="h-5 w-5 text-primary" />
                  <Label htmlFor="phone-notifications">Phone Notifications</Label>
                </div>
                <Switch
                  id="phone-notifications"
                  checked={profile?.phone_notifications || false}
                  onCheckedChange={(checked) => 
                    updateProfile({ phone_notifications: checked })
                  }
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <Button
                variant="destructive"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;