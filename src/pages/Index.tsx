import { Heart, Map, Activity } from "lucide-react";
import Header from "@/components/Header";
import ActionCard from "@/components/ActionCard";
import { toast } from "sonner";

const Index = () => {
  const handleDonar = () => {
    toast.success("Redirigiendo a donación de sangre...");
  };

  const handleMapa = () => {
    toast.success("Abriendo mapa de centros de donación...");
  };

  const handleEstado = () => {
    toast.success("Verificando estado de salud...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        <h2 className="text-6xl font-bold text-accent text-center mb-20">
          ¿Qué quieres ver hoy?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto justify-items-center">
          <ActionCard
            icon={Heart}
            title="Donar"
            onClick={handleDonar}
          />
          
          <ActionCard
            icon={Map}
            title="Mapa"
            onClick={handleMapa}
          />
          
          <ActionCard
            icon={Activity}
            title="Estado como"
            onClick={handleEstado}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
