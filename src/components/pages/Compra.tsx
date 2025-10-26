import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { espectaculos, salas, tiposEntrada, formasPago } from "../../data/mockData";
import { CheckCircle2, CreditCard } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CompraProps {
  selectedShowId: number | null;
  onNavigate: (page: string) => void;
}

export function Compra({ selectedShowId, onNavigate }: CompraProps) {
  const [cantidad, setCantidad] = useState("1");
  const [tipoEntrada, setTipoEntrada] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [compradorData, setCompradorData] = useState({
    nombre: "",
    email: "",
    dni: "",
  });
  const [compraExitosa, setCompraExitosa] = useState(false);

  const show = espectaculos.find((e) => e.id === selectedShowId);
  const sala = show ? salas.find((s) => s.id === show.salaId) : null;
  const tipoSeleccionado = tiposEntrada.find((t) => t.id.toString() === tipoEntrada);
  const precioTotal = tipoSeleccionado ? tipoSeleccionado.precio * parseInt(cantidad || "0") : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompraExitosa(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompradorData({
      ...compradorData,
      [e.target.name]: e.target.value,
    });
  };

  if (!show) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Espectáculo no encontrado</CardTitle>
              <CardDescription className="text-muted-foreground">
                Por favor, selecciona un espectáculo desde la cartelera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => onNavigate("cartelera")}
              >
                Ver Cartelera
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (compraExitosa) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-4 mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-green-400">¡Compra Exitosa!</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Tu reserva ha sido confirmada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-200">
                    Hemos enviado la confirmación y tus entradas a {compradorData.email}
                  </AlertDescription>
                </Alert>

                <div className="border border-border/50 rounded-lg p-4 bg-card">
                  <h3 className="mb-3 text-foreground">Resumen de tu compra</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Espectáculo:</span>
                      <span className="text-foreground">{show.nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span className="text-foreground">
                        {new Date(show.fecha).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })} - {show.hora}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sala:</span>
                      <span className="text-foreground">{sala?.nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cantidad:</span>
                      <span className="text-foreground">{cantidad} entrada{parseInt(cantidad) > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span className="text-foreground">{tipoSeleccionado?.nombre}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border/50">
                      <span className="text-foreground">Total pagado:</span>
                      <span className="text-primary">${precioTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Recuerda presentar tu entrada digital o impresa el día del evento.</p>
                  <p className="mt-2">Llega 30 minutos antes del inicio.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => onNavigate("cartelera")}
                  >
                    Ver Más Espectáculos
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onNavigate("home")}
                  >
                    Volver al Inicio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate("cartelera")}
              className="text-foreground hover:bg-muted"
            >
              ← Volver a Cartelera
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información del espectáculo */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 bg-card border-border">
                <CardContent className="pt-6">
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                    <ImageWithFallback
                      src={show.imagen}
                      alt={show.nombre}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <h2 className="text-xl font-semibold mb-1 text-foreground">{show.nombre}</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {show.genero}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Formulario de compra */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle className="text-foreground">Compra de Entradas</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Completa los datos para confirmar tu reserva
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selección de entradas */}
                    <div className="space-y-4">
                      <h3 className="text-foreground">Selección de Entradas</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cantidad" className="text-muted-foreground">Cantidad de Entradas</Label>
                        <Select value={cantidad} onValueChange={setCantidad} required>
                          <SelectTrigger id="cantidad" className="bg-input-background border-border text-foreground">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()} className="text-foreground hover:bg-muted">
                                {num} entrada{num > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>                        <div className="space-y-2">
                          <Label htmlFor="tipo" className="text-muted-foreground">Tipo de Entrada</Label>
                          <Select value={tipoEntrada} onValueChange={setTipoEntrada} required>
                            <SelectTrigger id="tipo" className="bg-input-background border-border text-foreground">
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              {tiposEntrada.map((tipo) => (
                                <SelectItem key={tipo.id} value={tipo.id.toString()} className="text-foreground hover:bg-muted">
                                  {tipo.nombre} - ${tipo.precio}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {tipoSeleccionado && (
                        <div className="bg-muted p-4 rounded-lg border border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span className="text-foreground font-medium">
                              ${precioTotal}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Datos del comprador */}
                    <div className="space-y-4 pt-6 border-t border-border/50">
                      <h3 className="text-foreground">Datos del Comprador</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-muted-foreground">Nombre Completo</Label>
                        <Input
                          id="nombre"
                          name="nombre"
                          type="text"
                          placeholder="Juan Pérez"
                          value={compradorData.nombre}
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
                          placeholder="juan@ejemplo.com"
                          value={compradorData.email}
                          onChange={handleChange}
                          required
                          className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                        />
                        <p className="text-xs text-muted-foreground">
                          Recibirás tus entradas en este correo
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dni" className="text-muted-foreground">DNI</Label>
                        <Input
                          id="dni"
                          name="dni"
                          type="text"
                          placeholder="12345678"
                          value={compradorData.dni}
                          onChange={handleChange}
                          required
                          className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Forma de pago */}
                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="text-foreground">Forma de Pago</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pago" className="text-muted-foreground">Método de Pago</Label>
                        <Select value={formaPago} onValueChange={setFormaPago} required>
                          <SelectTrigger id="pago" className="bg-input-background border-border text-foreground">
                            <SelectValue placeholder="Seleccionar método" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {formasPago.map((forma) => (
                              <SelectItem key={forma.id} value={forma.id.toString()} className="text-foreground hover:bg-muted">
                                {forma.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Alert className="bg-muted border-border">
                      <AlertDescription className="text-muted-foreground">
                        Al confirmar tu compra, aceptas los términos y condiciones de venta. Las entradas son personales e intransferibles.
                      </AlertDescription>
                    </Alert>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      Confirmar Compra - ${precioTotal}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}