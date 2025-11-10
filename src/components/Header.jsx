import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-primary py-4 px-6 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Heart className="w-8 h-8 text-white fill-accent" />
          <h1 className="text-2xl font-bold text-white">
            Hemo<span className="text-secondary">App</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-white font-medium">Hola, {user.username}</span>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Mi Perfil
              </Button>
              <Button variant="secondary" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate("/login")}>
                Iniciar sesión
              </Button>
              <Button variant="secondary" onClick={() => navigate("/register")}>
                Registrarse
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
