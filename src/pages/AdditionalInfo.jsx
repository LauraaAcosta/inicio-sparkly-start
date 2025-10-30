import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdditionalInfo = () => {
  const [formData, setFormData] = useState({
    lastDonation: "",
    bloodType: "",
    hasTattoos: "",
    hasPiercings: "",
    hasAllergies: "",
    takingMedication: "",
    hasChronicIllness: "",
  });
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = updateUserProfile(formData);

    if (result.success) {
      toast.success("Información adicional guardada exitosamente");
      navigate("/login");
    } else {
      toast.error(result.error || "Error al guardar información");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg border-accent/20 backdrop-blur">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex justify-center">
            <div className="bg-accent/10 p-3 rounded-full">
              <Heart className="w-12 h-12 text-accent fill-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-accent">
            Información adicional
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Esta información nos ayudará a brindarte un mejor servicio (opcional)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastDonation">¿Cuándo fue tu última donación?</Label>
                <Input
                  id="lastDonation"
                  type="date"
                  value={formData.lastDonation}
                  onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodType">Tipo de sangre</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                >
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Selecciona tu tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">¿Tienes tatuajes?</Label>
                <RadioGroup
                  value={formData.hasTattoos}
                  onValueChange={(value) => setFormData({ ...formData, hasTattoos: value })}
                  className="flex gap-3"
                >
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="si" id="tattoos-si" />
                    <Label htmlFor="tattoos-si" className="cursor-pointer text-sm">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="no" id="tattoos-no" />
                    <Label htmlFor="tattoos-no" className="cursor-pointer text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">¿Tienes piercings?</Label>
                <RadioGroup
                  value={formData.hasPiercings}
                  onValueChange={(value) => setFormData({ ...formData, hasPiercings: value })}
                  className="flex gap-3"
                >
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="si" id="piercings-si" />
                    <Label htmlFor="piercings-si" className="cursor-pointer text-sm">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="no" id="piercings-no" />
                    <Label htmlFor="piercings-no" className="cursor-pointer text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">¿Tienes alergias conocidas?</Label>
                <RadioGroup
                  value={formData.hasAllergies}
                  onValueChange={(value) => setFormData({ ...formData, hasAllergies: value })}
                  className="flex gap-3"
                >
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="si" id="allergies-si" />
                    <Label htmlFor="allergies-si" className="cursor-pointer text-sm">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="no" id="allergies-no" />
                    <Label htmlFor="allergies-no" className="cursor-pointer text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">¿Estás tomando alguna medicación?</Label>
                <RadioGroup
                  value={formData.takingMedication}
                  onValueChange={(value) => setFormData({ ...formData, takingMedication: value })}
                  className="flex gap-3"
                >
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="si" id="medication-si" />
                    <Label htmlFor="medication-si" className="cursor-pointer text-sm">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="no" id="medication-no" />
                    <Label htmlFor="medication-no" className="cursor-pointer text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">¿Padeces alguna enfermedad crónica?</Label>
                <RadioGroup
                  value={formData.hasChronicIllness}
                  onValueChange={(value) => setFormData({ ...formData, hasChronicIllness: value })}
                  className="flex gap-3"
                >
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="si" id="chronic-si" />
                    <Label htmlFor="chronic-si" className="cursor-pointer text-sm">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                    <RadioGroupItem value="no" id="chronic-no" />
                    <Label htmlFor="chronic-no" className="cursor-pointer text-sm">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Guardar información
              </Button>
              <Button type="button" variant="outline" onClick={handleSkip} className="flex-1">
                Omitir
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
