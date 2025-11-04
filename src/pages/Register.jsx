import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Mail, Lock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'donante'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const result = register(formData);
    
    if (result.success) {
      toast.success('¡Cuenta creada exitosamente!');
      
      // Redirigir según el rol
      if (formData.role === 'donante' || formData.role === 'paciente') {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-accent/20">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-white fill-accent" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Crear Cuenta</CardTitle>
          <CardDescription className="text-base">
            Únete a <span className="text-accent font-semibold">HemoApp</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Nombre de Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Tu nombre"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Selecciona tu rol
              </Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center space-x-3 border-2 border-accent/30 rounded-lg p-3 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="donante" id="donante" />
                  <Label htmlFor="donante" className="cursor-pointer flex-1 font-medium">
                    Donante
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border-2 border-accent/30 rounded-lg p-3 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="paciente" id="paciente" />
                  <Label htmlFor="paciente" className="cursor-pointer flex-1 font-medium">
                    Paciente
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border-2 border-accent/30 rounded-lg p-3 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="institucion" id="institucion" />
                  <Label htmlFor="institucion" className="cursor-pointer flex-1 font-medium">
                    Institución
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Crear Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-accent font-semibold hover:underline"
            >
              Inicia sesión
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
