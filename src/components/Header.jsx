import { Heart, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
    navigate("/login");
  };

  return (
    <header className="bg-primary py-4 px-6 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-white fill-accent" />
          <h1 className="text-2xl font-bold text-white">
            Hemo<span className="text-secondary">App</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Necesito sangre
          </Button>
          {user && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white">
                <User className="w-5 h-5" />
                <span className="font-medium">{user.username}</span>
              </div>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
