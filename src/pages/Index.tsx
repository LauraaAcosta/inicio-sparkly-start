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

        {/* Información sobre donación de sangre */}
        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-accent text-center mb-12">
            Información sobre la donación de sangre
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Requisitos para donar */}
            <div className="bg-secondary/50 p-8 rounded-2xl border-2 border-accent/20">
              <h3 className="text-2xl font-bold text-accent mb-4">Requisitos para donar</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Tener entre 18 y 65 años de edad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Pesar más de 50 kg</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Gozar de buen estado de salud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>No haber donado en los últimos 2 meses (hombres) o 3 meses (mujeres)</span>
                </li>
              </ul>
            </div>

            {/* Beneficios de donar */}
            <div className="bg-secondary/50 p-8 rounded-2xl border-2 border-accent/20">
              <h3 className="text-2xl font-bold text-accent mb-4">Beneficios de donar</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Salvas hasta 3 vidas con cada donación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Chequeo médico gratuito</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Ayudas a tu comunidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Estimula la producción de nuevas células sanguíneas</span>
                </li>
              </ul>
            </div>

            {/* Proceso de donación */}
            <div className="bg-secondary/50 p-8 rounded-2xl border-2 border-accent/20">
              <h3 className="text-2xl font-bold text-accent mb-4">Proceso de donación</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">1.</span>
                  <span>Registro y cuestionario de salud</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">2.</span>
                  <span>Revisión médica y toma de signos vitales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">3.</span>
                  <span>Extracción de sangre (10-15 minutos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">4.</span>
                  <span>Refrigerio y descanso</span>
                </li>
              </ul>
            </div>

            {/* Recomendaciones */}
            <div className="bg-secondary/50 p-8 rounded-2xl border-2 border-accent/20">
              <h3 className="text-2xl font-bold text-accent mb-4">Recomendaciones</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Dormir bien la noche anterior</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Desayunar o almorzar antes de donar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Beber abundante agua</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Llevar documento de identidad</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
