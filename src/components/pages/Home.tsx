import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { espectaculos } from "../../data/mockData";
import { Calendar, Users, Theater } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomeProps {
  onNavigate: (page: string, showId?: number) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const destacados = espectaculos.filter((e) => e.destacado);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1675469223182-65887f1925df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwc3RhZ2UlMjBsaWdodHMlMjBhdWRpZW5jZXxlbnwxfHx8fDE3NjEyMzA2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Teatro escenario"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/90 via-[#1a2332]/70 to-[#1a2332]/90"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Viví el teatro en primera fila
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre los mejores espectáculos teatrales de la temporada. Vive la magia del teatro en vivo con producciones de clase mundial.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("cartelera")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              Ver Cartelera
            </Button>
          </div>
        </div>
      </section>

      {/* Espectáculos Destacados */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-foreground mb-3">
            Espectáculos Destacados
          </h2>
          <p className="text-muted-foreground">
            No te pierdas las producciones más esperadas de la temporada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destacados.map((show) => (
            <Card key={show.id} className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all border-border/50">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={show.imagen}
                  alt={show.nombre}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  Destacado
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-foreground">{show.nombre}</CardTitle>
                <CardDescription className="text-muted-foreground">{show.tematica}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{show.elenco}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(show.fecha).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} - {show.hora}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => onNavigate("compra", show.id)}
                >
                  Comprar Entradas
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-card border-y border-border/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Theater className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-foreground mb-4">
            ¿Nuevo en nuestro teatro?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto text-muted-foreground">
            Regístrate hoy y recibe información sobre estrenos, ofertas especiales y eventos exclusivos.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => onNavigate("registro")}
          >
            Crear Cuenta
          </Button>
        </div>
      </section>
    </div>
  );
}
