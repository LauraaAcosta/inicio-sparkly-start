import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const result = login(formData.email, formData.password);
    
    if (result.success) {
      toast.success('¡Bienvenido de nuevo!');
      navigate('/');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-accent/20">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-white fill-accent" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">Iniciar Sesión</CardTitle>
          <CardDescription className="text-base">
            Ingresa a <span className="text-accent font-semibold">HemoApp</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <button 
              className="text-sm text-primary hover:underline"
              onClick={() => toast.info('Funcionalidad próximamente')}
            >
              ¿Olvidaste tu contraseña?
            </button>
            
            <div className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-accent font-semibold hover:underline"
              >
                Regístrate aquí
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
