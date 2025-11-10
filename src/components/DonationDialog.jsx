import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DonationDialog = ({ open, onOpenChange }) => {
  // Datos de ejemplo - en una app real vendrían de una base de datos
  const lastDonation = new Date("2024-08-15");
  const nextDonation = new Date("2024-12-15");
  const peopleHelped = 18; // 3 personas por cada donación × 6 donaciones
  const totalDonations = 6;

  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const daysUntilNextDonation = Math.ceil((nextDonation.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const canDonateNow = daysUntilNextDonation <= 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-accent flex items-center gap-2">
            <Heart className="w-6 h-6 fill-accent" />
            Tus Donaciones
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Última donación */}
          <Card className="border-2 border-accent/20 bg-secondary/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Última donación
                  </h3>
                  <p className="text-2xl font-bold text-accent">
                    {formatDate(lastDonation)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próxima donación disponible */}
          <Card className="border-2 border-accent/20 bg-secondary/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {canDonateNow ? "¡Puedes donar ahora!" : "Próxima donación disponible"}
                  </h3>
                  {canDonateNow ? (
                    <p className="text-xl font-bold text-green-500">
                      ¡Ya estás listo para donar de nuevo!
                    </p>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-accent">
                        {formatDate(nextDonation)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Faltan {daysUntilNextDonation} días
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impacto - personas ayudadas */}
          <Card className="border-2 border-accent/20 bg-secondary/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Personas ayudadas
                  </h3>
                  <p className="text-4xl font-bold text-accent mb-2">
                    {peopleHelped}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Con {totalDonations} donaciones realizadas
                  </p>
                  
                  {/* Barra de progreso visual */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progreso hacia 30 personas</span>
                      <span>{Math.round((peopleHelped / 30) * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden border border-accent/20">
                      <div 
                        className="h-full bg-accent transition-all duration-500 rounded-full"
                        style={{ width: `${(peopleHelped / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mensaje motivacional */}
          <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-foreground font-medium">
              ¡Gracias por ser un héroe! 💪
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Cada donación salva hasta 3 vidas
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
