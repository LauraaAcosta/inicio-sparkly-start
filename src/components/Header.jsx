import { Heart } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
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
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Mi Perfil
          </Button>
          <Button variant="secondary" className="bg-accent hover:bg-accent/90">
            Inicio
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
