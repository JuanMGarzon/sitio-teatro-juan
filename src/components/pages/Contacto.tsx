import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setFormData({ nombre: "", email: "", mensaje: "" });
      setEnviado(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-foreground mb-2">Contacto</h1>
          <p className="text-muted-foreground">Estamos para ayudarte. Comunícate con nosotros</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Información de Contacto</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Encuentra todas las formas de comunicarte con nosotros
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Dirección</p>
                    <p className="text-sm text-muted-foreground">
                      Av. Corrientes 1234<br />
                      Ciudad de Buenos Aires<br />
                      C1043 - Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Teléfono</p>
                    <p className="text-sm text-muted-foreground">
                      +54 11 4123-4567<br />
                      Lun a Vie: 10:00 - 20:00<br />
                      Sáb: 14:00 - 22:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">Correo Electrónico</p>
                    <p className="text-sm text-muted-foreground">
                      info@teatronacional.com.ar<br />
                      ventas@teatronacional.com.ar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Redes Sociales</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Síguenos en nuestras redes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">@TeatroNacional</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">@TeatroNacional</span>
                </a>
                
                <a
                  href="#"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                  <span className="text-sm text-foreground">@TeatroNacional</span>
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Horarios de Boletería</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lunes a Viernes:</span>
                    <span className="text-foreground">10:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábados:</span>
                    <span className="text-foreground">14:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingos:</span>
                    <span className="text-foreground">15:00 - 21:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Envíanos un Mensaje</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Completa el formulario y te responderemos a la brevedad
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enviado && (
                  <Alert className="mb-6 border-green-500/50 bg-green-500/10">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <AlertDescription className="text-green-200">
                      ¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-muted-foreground">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-muted-foreground">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-muted-foreground">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={enviado}
                  >
                    {enviado ? "Mensaje Enviado" : "Enviar Mensaje"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="mb-3 text-foreground">Preguntas Frecuentes</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-foreground">¿Cómo compro entradas?</p>
                      <p className="text-muted-foreground">
                        Puedes comprar en línea o en nuestra boletería física.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground">¿Puedo cambiar o devolver entradas?</p>
                      <p className="text-muted-foreground">
                        Las entradas son no reembolsables. Consulta condiciones específicas.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground">¿Hay descuentos?</p>
                      <p className="text-muted-foreground">
                        Ofrecemos descuentos para estudiantes, jubilados y grupos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
