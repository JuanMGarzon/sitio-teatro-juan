import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, UserPlus } from "lucide-react";

export function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    dni: "",
  });
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de registro
    setRegistered(true);
    setTimeout(() => {
      setFormData({ nombre: "", email: "", password: "", dni: "" });
      setRegistered(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-4">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-foreground mb-2">Crear Cuenta</h1>
            <p className="text-muted-foreground">
              Regístrate para gestionar tus entradas y recibir notificaciones exclusivas
            </p>
          </div>

          {registered && (
            <Alert className="mb-6 border-green-500 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                ¡Registro exitoso! Bienvenido al Teatro Lux. Te hemos enviado un correo de confirmación.
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Información Personal</CardTitle>
              <CardDescription className="text-muted-foreground">
                Completa el formulario para crear tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-foreground">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dni" className="text-foreground">DNI</Label>
                  <Input
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={registered}
                >
                  {registered ? "Registrado" : "Registrarse"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <button className="text-primary hover:underline">
                    Inicia sesión
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Al registrarte, aceptas nuestros términos y condiciones y política de privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
