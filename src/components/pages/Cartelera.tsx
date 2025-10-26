import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { espectaculos, salas } from "../../data/mockData";
import { Calendar, MapPin, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CarteleraProps {
  onNavigate: (page: string, showId?: number) => void;
}

export function Cartelera({ onNavigate }: CarteleraProps) {
  const [filtroGenero, setFiltroGenero] = useState<string>("todos");
  const [filtroSala, setFiltroSala] = useState<string>("todas");
  const [filtroFecha, setFiltroFecha] = useState<string>("todas");

  const generos = [...new Set(espectaculos.map((e) => e.genero))];
  const fechas = [...new Set(espectaculos.map((e) => e.fecha))].sort();

  const espectaculosFiltrados = espectaculos.filter((show) => {
    const matchGenero = filtroGenero === "todos" || show.genero === filtroGenero;
    const matchSala = filtroSala === "todas" || show.salaId.toString() === filtroSala;
    const matchFecha = filtroFecha === "todas" || show.fecha === filtroFecha;
    return matchGenero && matchSala && matchFecha;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border/50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-foreground mb-2">Cartelera de Espectáculos</h1>
          <p className="text-muted-foreground">Explora toda nuestra programación y encuentra tu próxima experiencia teatral</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <Card className="mb-8 border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Filtrar Espectáculos</CardTitle>
            <CardDescription className="text-muted-foreground">Encuentra exactamente lo que buscas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Género</label>
                <Select value={filtroGenero} onValueChange={setFiltroGenero}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los géneros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los géneros</SelectItem>
                    {generos.map((genero) => (
                      <SelectItem key={genero} value={genero}>
                        {genero}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Sala</label>
                <Select value={filtroSala} onValueChange={setFiltroSala}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las salas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las salas</SelectItem>
                    {salas.map((sala) => (
                      <SelectItem key={sala.id} value={sala.id.toString()}>
                        {sala.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-muted-foreground">Fecha</label>
                <Select value={filtroFecha} onValueChange={setFiltroFecha}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las fechas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las fechas</SelectItem>
                    {fechas.map((fecha) => (
                      <SelectItem key={fecha} value={fecha}>
                        {new Date(fecha).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            Mostrando {espectaculosFiltrados.length} espectáculo{espectaculosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {espectaculosFiltrados.map((show) => {
            const sala = salas.find((s) => s.id === show.salaId);
            
            return (
              <Card key={show.id} className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all border-border/50">
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={show.imagen}
                    alt={show.nombre}
                    className="w-full h-full object-cover"
                  />
                  {show.destacado && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Destacado
                    </Badge>
                  )}
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    {show.genero}
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-foreground">{show.nombre}</CardTitle>
                  <CardDescription className="text-muted-foreground">{show.tematica}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
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
                      })} - {show.hora}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{sala?.nombre}</span>
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
            );
          })}
        </div>

        {espectaculosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No se encontraron espectáculos con los filtros seleccionados
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFiltroGenero("todos");
                setFiltroSala("todas");
                setFiltroFecha("todas");
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
