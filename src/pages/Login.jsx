import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    const result = login(email, password);

    if (result.success) {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-accent/20 backdrop-blur">
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
            Inicia sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-accent hover:underline font-semibold">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
