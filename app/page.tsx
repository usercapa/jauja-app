import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Recycle, Leaf, Globe, TrendingUp, Users, Award, ArrowRight, CheckCircle, MapPin, Calendar, Phone, Mail, Mountain, Waves, ShoppingCart, TreePine, Fish, Flower2, Gamepad2, Trophy, Star, Zap } from 'lucide-react'
import Link from "next/link"
import BiodiversityGamesHub from "@/components/biodiversity-games-hub"

import { Play } from 'lucide-react';

export default function JaujaBiodiversityGames() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Header estilo Poki */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <TreePine className="h-8 w-8 text-green-600" />
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-800">EcoGames</div>
                    <div className="text-xs text-gray-600">Jauja Biodiversity</div>
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Gamepad2 className="mr-2 h-4 w-4" />
                Juegos
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Trophy className="mr-2 h-4 w-4" />
                Ranking
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Users className="mr-2 h-4 w-4" />
                Comunidad
              </Button>
            </nav>

            <div className="flex items-center space-x-3">
              <Badge className="bg-yellow-500 text-black font-bold px-3 py-1">
                🏆 NUEVO
              </Badge>
              <Button className="bg-white text-green-600 hover:bg-gray-100 font-bold">
                ¡Jugar Ahora!
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section estilo gaming */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl">🎮</span>
              <Badge className="bg-red-500 text-white text-xl px-6 py-3 animate-pulse">
                ¡GRATIS!
              </Badge>
              <span className="text-4xl">🌿</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
              EcoGames Jauja
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              ¡Los juegos más divertidos sobre biodiversidad y conservación!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4">
                <Play className="mr-2 h-6 w-6" />
                Jugar Ahora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 font-bold text-lg px-8 py-4">
                Ver Todos los Juegos
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
            
            {/* Stats estilo gaming */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm opacity-75">Juegos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-75">Jugadores</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm opacity-75">Especies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-75">Ecosistemas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hub de Juegos */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <BiodiversityGamesHub />
        </div>
      </section>

      {/* Footer estilo gaming */}
      <footer className="bg-black/30 backdrop-blur-md text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">EcoGames Jauja</span>
              </div>
              <p className="text-gray-300 text-sm">
                Juegos divertidos para aprender sobre la biodiversidad de Jauja.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Juegos Populares</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">EcoSurvival.io</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">SpeciesRescue.io</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">HabitatBuilder.io</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">ConservationHero.io</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorías</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Aventura</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Estrategia</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Educativo</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Multijugador</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Municipalidad de Jauja</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Jr. Grau 280, Jauja - Junín</li>
                <li>(064) 362-042</li>
                <li>ambiente@munijauja.gob.pe</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-600" />
          
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 EcoGames Jauja. Todos los derechos reservados.</p>
            <p className="mt-1">Desarrollado con 💚 para la conservación de la biodiversidad</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
