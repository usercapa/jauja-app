'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Users, Star, Clock, Trophy, Target, Zap, Shield, Heart, Leaf, Fish, Mountain, TreePine, Flower2, Bird, Rabbit, Crown, Gamepad2 } from 'lucide-react'
import EcoSurvivalGame from './games/eco-survival-game'
import SpeciesRescueGame from './games/species-rescue-game'
import HabitatBuilderGame from './games/habitat-builder-game'
import ConservationHeroGame from './games/conservation-hero-game'

interface Game {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  players: string
  rating: number
  plays: string
  thumbnail: string
  isNew?: boolean
  isHot?: boolean
  icon: any
  color: string
}

const games: Game[] = [
  {
    id: 'eco-survival',
    title: 'EcoSurvival.io',
    description: 'Sobrevive en los ecosistemas de Jauja mientras proteges la biodiversidad',
    category: 'Aventura',
    difficulty: 'Medio',
    players: '1-100',
    rating: 4.8,
    plays: '125K',
    thumbnail: '/images/eco-survival-thumb.png',
    isHot: true,
    icon: TreePine,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'species-rescue',
    title: 'SpeciesRescue.io',
    description: 'Rescata especies en peligro en tiempo real con otros jugadores',
    category: 'Acción',
    difficulty: 'Fácil',
    players: '1-50',
    rating: 4.9,
    plays: '89K',
    thumbnail: '/images/species-rescue-thumb.png',
    isNew: true,
    icon: Heart,
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'habitat-builder',
    title: 'HabitatBuilder.io',
    description: 'Construye y gestiona ecosistemas prósperos para la fauna local',
    category: 'Estrategia',
    difficulty: 'Medio',
    players: '1-20',
    rating: 4.7,
    plays: '67K',
    thumbnail: '/images/habitat-builder-thumb.png',
    icon: Mountain,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'conservation-hero',
    title: 'ConservationHero.io',
    description: 'Conviértete en el héroe de la conservación más poderoso',
    category: 'RPG',
    difficulty: 'Difícil',
    players: '1-30',
    rating: 4.6,
    plays: '156K',
    thumbnail: '/images/conservation-hero-thumb.png',
    isHot: true,
    icon: Crown,
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'pollinator-rush',
    title: 'PollinatorRush.io',
    description: 'Ayuda a los polinizadores a fertilizar las flores nativas',
    category: 'Arcade',
    difficulty: 'Fácil',
    players: '1-40',
    rating: 4.5,
    plays: '43K',
    thumbnail: '/images/pollinator-rush-thumb.png',
    icon: Flower2,
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'aquatic-guardian',
    title: 'AquaticGuardian.io',
    description: 'Protege la vida acuática del río Mantaro y Laguna de Paca',
    category: 'Aventura',
    difficulty: 'Medio',
    players: '1-60',
    rating: 4.4,
    plays: '78K',
    thumbnail: '/images/aquatic-guardian-thumb.png',
    icon: Fish,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'migration-master',
    title: 'MigrationMaster.io',
    description: 'Guía las rutas migratorias de aves a través de los Andes',
    category: 'Simulación',
    difficulty: 'Medio',
    players: '1-25',
    rating: 4.3,
    plays: '52K',
    thumbnail: '/images/migration-master-thumb.png',
    icon: Bird,
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'seed-disperser',
    title: 'SeedDisperser.io',
    description: 'Esparce semillas nativas para reforestar los ecosistemas',
    category: 'Estrategia',
    difficulty: 'Fácil',
    players: '1-80',
    rating: 4.2,
    plays: '91K',
    thumbnail: '/images/seed-disperser-thumb.png',
    isNew: true,
    icon: Leaf,
    color: 'from-green-500 to-lime-600'
  },
  {
    id: 'predator-balance',
    title: 'PredatorBalance.io',
    description: 'Mantén el equilibrio entre depredadores y presas',
    category: 'Estrategia',
    difficulty: 'Difícil',
    players: '1-15',
    rating: 4.1,
    plays: '34K',
    thumbnail: '/images/predator-balance-thumb.png',
    icon: Rabbit,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'climate-defender',
    title: 'ClimateDefender.io',
    description: 'Defiende los ecosistemas del cambio climático',
    category: 'Torre Defensa',
    difficulty: 'Difícil',
    players: '1-10',
    rating: 4.0,
    plays: '28K',
    thumbnail: '/images/climate-defender-thumb.png',
    icon: Shield,
    color: 'from-gray-500 to-slate-600'
  },
  {
    id: 'eco-racing',
    title: 'EcoRacing.io',
    description: 'Carreras ecológicas por los paisajes de Jauja',
    category: 'Carreras',
    difficulty: 'Fácil',
    players: '1-100',
    rating: 4.4,
    plays: '112K',
    thumbnail: '/images/eco-racing-thumb.png',
    isHot: true,
    icon: Zap,
    color: 'from-yellow-500 to-green-600'
  },
  {
    id: 'biodiversity-tycoon',
    title: 'BiodiversityTycoon.io',
    description: 'Gestiona reservas naturales y maximiza la biodiversidad',
    category: 'Simulación',
    difficulty: 'Difícil',
    players: '1-5',
    rating: 4.7,
    plays: '45K',
    thumbnail: '/images/biodiversity-tycoon-thumb.png',
    icon: Trophy,
    color: 'from-purple-500 to-pink-600'
  }
]

const categories = [
  { id: 'all', name: 'Todos', icon: Gamepad2 },
  { id: 'Aventura', name: 'Aventura', icon: Mountain },
  { id: 'Acción', name: 'Acción', icon: Zap },
  { id: 'Estrategia', name: 'Estrategia', icon: Target },
  { id: 'RPG', name: 'RPG', icon: Crown },
  { id: 'Arcade', name: 'Arcade', icon: Star },
  { id: 'Simulación', name: 'Simulación', icon: TreePine },
  { id: 'Torre Defensa', name: 'Defensa', icon: Shield },
  { id: 'Carreras', name: 'Carreras', icon: Zap }
]

export default function BiodiversityGamesHub() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory)

  const featuredGames = games.filter(game => game.isHot || game.isNew).slice(0, 3)

  if (selectedGame) {
    const gameComponents: { [key: string]: any } = {
      'eco-survival': EcoSurvivalGame,
      'species-rescue': SpeciesRescueGame,
      'habitat-builder': HabitatBuilderGame,
      'conservation-hero': ConservationHeroGame
    }
    
    const GameComponent = gameComponents[selectedGame]
    
    if (GameComponent) {
      return (
        <div className="space-y-4">
          <Button 
            onClick={() => setSelectedGame(null)}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            ← Volver a los juegos
          </Button>
          <GameComponent />
        </div>
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Juegos Destacados */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">🔥 Juegos Más Populares</h2>
        <p className="text-white/80 text-lg">Los favoritos de la comunidad EcoGames</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {featuredGames.map((game) => {
          const IconComponent = game.icon
          return (
            <Card 
              key={game.id}
              className="cursor-pointer hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-md border-white/20 text-white overflow-hidden group"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className={`h-48 bg-gradient-to-br ${game.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="absolute top-4 left-4">
                  {game.isNew && <Badge className="bg-green-500 text-white font-bold">NUEVO</Badge>}
                  {game.isHot && <Badge className="bg-red-500 text-white font-bold animate-pulse">HOT</Badge>}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconComponent className="h-20 w-20 text-white/80" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{game.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4" />
                      <span className="text-sm ml-1">{game.plays}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-white/80 mb-3">{game.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="border-white/30 text-white">
                    {game.category}
                  </Badge>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <Play className="h-4 w-4 mr-1" />
                    Jugar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Categorías */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">🎮 Todos los Juegos</h3>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 bg-black/20 p-2 rounded-lg mb-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70 hover:text-white transition-all"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGames.map((game) => {
                  const IconComponent = game.icon
                  return (
                    <Card 
                      key={game.id}
                      className="cursor-pointer hover:scale-105 transition-all duration-200 bg-white/5 backdrop-blur-sm border-white/10 text-white overflow-hidden group"
                      onClick={() => setSelectedGame(game.id)}
                    >
                      <div className={`h-32 bg-gradient-to-br ${game.color} relative`}>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                        <div className="absolute top-2 left-2">
                          {game.isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                          {game.isHot && <Badge className="bg-red-500 text-white text-xs">HOT</Badge>}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <IconComponent className="h-12 w-12 text-white/80" />
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-bold text-sm mb-1 truncate">{game.title}</h4>
                        <p className="text-xs text-white/70 mb-2 line-clamp-2">{game.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{game.plays}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-2 bg-green-500 hover:bg-green-600 text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          Jugar
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Estadísticas de la Plataforma */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Estadísticas de EcoGames</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500K+</div>
            <div className="text-white/70">Partidas Jugadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">25K+</div>
            <div className="text-white/70">Especies Salvadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-white/70">Hábitats Restaurados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">12K+</div>
            <div className="text-white/70">Jugadores Activos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
