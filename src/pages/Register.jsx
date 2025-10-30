import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "donante",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const result = register({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role,
    });

    if (result.success) {
      toast.success("Registro exitoso");
      
      if (formData.role === "donante" || formData.role === "paciente") {
        navigate("/additional-info", { state: { userId: result.user.id } });
      } else {
        navigate("/login");
      }
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg border-accent/20 backdrop-blur">
        <CardHeader className="space-y-3 pb-4">
          <div className="flex justify-center">
            <div className="bg-accent/10 p-3 rounded-full">
              <Heart className="w-12 h-12 text-accent fill-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-accent">
            Hemo<span className="text-primary">App</span>
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Crea tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                placeholder="tu_usuario"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Rol</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                  <RadioGroupItem value="donante" id="donante" />
                  <Label htmlFor="donante" className="cursor-pointer text-sm">
                    Donante
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                  <RadioGroupItem value="paciente" id="paciente" />
                  <Label htmlFor="paciente" className="cursor-pointer text-sm">
                    Paciente
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-accent/5 px-4 py-2 rounded-lg border border-accent/20">
                  <RadioGroupItem value="institucion" id="institucion" />
                  <Label htmlFor="institucion" className="cursor-pointer text-sm">
                    Institución
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full">
              Registrarse
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-accent hover:underline font-semibold">
                Inicia sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
