import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { salas } from "../../data/mockData";
import { Users, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Salas() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-foreground mb-2">Nuestras Salas</h1>
          <p className="text-muted-foreground">Espacios diseñados para ofrecer la mejor experiencia teatral</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salas.map((sala) => (
            <Card key={sala.id} className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all border-border/50">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={sala.imagen}
                  alt={sala.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-foreground">{sala.nombre}</CardTitle>
                <CardDescription className="text-muted-foreground">{sala.descripcion}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Capacidad</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{sala.capacidad} personas</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Ubicación</span>
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">{sala.ubicacion}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Accesibilidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Todas nuestras salas cuentan con acceso para personas con movilidad reducida y sistemas de audio para personas con discapacidad auditiva.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Tecnología</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Equipadas con sistemas de sonido e iluminación de última generación para garantizar la mejor experiencia audiovisual.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Comodidad</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Butacas ergonómicas, climatización controlada y excelente visibilidad desde cualquier ubicación.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
