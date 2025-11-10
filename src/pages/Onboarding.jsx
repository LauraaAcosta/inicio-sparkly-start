import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Droplet, Calendar, Syringe, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState({
    lastDonation: '',
    bloodType: '',
    hasTattoos: '',
    hasPiercings: '',
    hasAllergies: '',
    takesMedication: '',
    hasChronicIllness: ''
  });

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    updateUser({ 
      ...formData, 
      onboardingCompleted: true 
    });
    toast.success('¡Perfil completado!');
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Droplet className="w-16 h-16 mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Tipo de Sangre</h3>
              <p className="text-muted-foreground">¿Cuál es tu tipo de sangre?</p>
            </div>
            <div className="space-y-2">
              <Label>Selecciona tu tipo de sangre</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
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
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Calendar className="w-16 h-16 mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Última Donación</h3>
              <p className="text-muted-foreground">¿Cuándo fue tu última donación?</p>
            </div>
            <div className="space-y-2">
              <Label>Selecciona el tiempo</Label>
              <Select
                value={formData.lastDonation}
                onValueChange={(value) => setFormData({ ...formData, lastDonation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Nunca he donado</SelectItem>
                  <SelectItem value="<3months">Hace menos de 3 meses</SelectItem>
                  <SelectItem value="3-6months">Hace 3-6 meses</SelectItem>
                  <SelectItem value="6-12months">Hace 6-12 meses</SelectItem>
                  <SelectItem value=">1year">Hace más de 1 año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Syringe className="w-16 h-16 mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Modificaciones Corporales</h3>
              <p className="text-muted-foreground">Información sobre tatuajes y piercings</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>¿Tienes tatuajes recientes? (últimos 12 meses)</Label>
                <RadioGroup
                  value={formData.hasTattoos}
                  onValueChange={(value) => setFormData({ ...formData, hasTattoos: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="yes" id="tattoo-yes" />
                    <Label htmlFor="tattoo-yes" className="cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="no" id="tattoo-no" />
                    <Label htmlFor="tattoo-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>¿Tienes piercings recientes? (últimos 12 meses)</Label>
                <RadioGroup
                  value={formData.hasPiercings}
                  onValueChange={(value) => setFormData({ ...formData, hasPiercings: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="yes" id="piercing-yes" />
                    <Label htmlFor="piercing-yes" className="cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="no" id="piercing-no" />
                    <Label htmlFor="piercing-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 mx-auto text-accent mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Alergias y Medicación</h3>
              <p className="text-muted-foreground">Información médica importante</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>¿Tienes alergias conocidas?</Label>
                <RadioGroup
                  value={formData.hasAllergies}
                  onValueChange={(value) => setFormData({ ...formData, hasAllergies: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="yes" id="allergy-yes" />
                    <Label htmlFor="allergy-yes" className="cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="no" id="allergy-no" />
                    <Label htmlFor="allergy-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>¿Tomas medicación regularmente?</Label>
                <RadioGroup
                  value={formData.takesMedication}
                  onValueChange={(value) => setFormData({ ...formData, takesMedication: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="yes" id="medication-yes" />
                    <Label htmlFor="medication-yes" className="cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                    <RadioGroupItem value="no" id="medication-no" />
                    <Label htmlFor="medication-no" className="cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 mx-auto text-accent mb-4 fill-accent" />
              <h3 className="text-2xl font-bold text-primary mb-2">Condiciones Crónicas</h3>
              <p className="text-muted-foreground">Última pregunta</p>
            </div>
            
            <div className="space-y-3">
              <Label>¿Padeces alguna enfermedad crónica?</Label>
              <RadioGroup
                value={formData.hasChronicIllness}
                onValueChange={(value) => setFormData({ ...formData, hasChronicIllness: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                  <RadioGroupItem value="yes" id="chronic-yes" />
                  <Label htmlFor="chronic-yes" className="cursor-pointer">Sí</Label>
                </div>
                <div className="flex items-center space-x-2 border-2 border-accent/30 rounded-lg px-4 py-2 flex-1">
                  <RadioGroupItem value="no" id="chronic-no" />
                  <Label htmlFor="chronic-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-accent/20">
        <CardHeader className="space-y-4 pb-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Paso {currentStep} de {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-primary">
            Completa tu Perfil
          </CardTitle>
          <CardDescription className="text-center">
            Esta información nos ayuda a brindarte un mejor servicio
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderStep()}
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
            >
              Saltar por ahora
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1"
            >
              {currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
