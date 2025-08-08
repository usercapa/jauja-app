'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, TreePine, Droplets, Mountain, Flower2, Users, Trophy, Target, Coins } from 'lucide-react'

interface Resource {
  water: number
  nutrients: number
  space: number
  biodiversity: number
}

interface Building {
  id: string
  name: string
  emoji: string
  cost: Partial<Resource>
  benefit: Partial<Resource>
  description: string
  unlocked: boolean
}

export default function HabitatBuilderGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu')
  const [resources, setResources] = useState<Resource>({
    water: 100,
    nutrients: 50,
    space: 200,
    biodiversity: 0
  })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  const buildings: Building[] = [
    {
      id: 'pond',
      name: 'Estanque Natural',
      emoji: '🏞️',
      cost: { space: 30, nutrients: 10 },
      benefit: { water: 50, biodiversity: 15 },
      description: 'Proporciona agua limpia para la fauna',
      unlocked: true
    },
    {
      id: 'forest',
      name: 'Bosque Nativo',
      emoji: '🌲',
      cost: { space: 50, water: 20 },
      benefit: { nutrients: 30, biodiversity: 25 },
      description: 'Genera oxígeno y refugio para especies',
      unlocked: true
    },
    {
      id: 'meadow',
      name: 'Pradera de Ichu',
      emoji: '🌾',
      cost: { space: 40, water: 15 },
      benefit: { nutrients: 20, biodiversity: 20 },
      description: 'Pasto nativo que alimenta herbívoros',
      unlocked: true
    },
    {
      id: 'sanctuary',
      name: 'Santuario de Aves',
      emoji: '🦅',
      cost: { space: 60, water: 30, nutrients: 25 },
      benefit: { biodiversity: 40 },
      description: 'Refugio especializado para aves migratorias',
      unlocked: false
    }
  ]

  const buildHabitat = (building: Building) => {
    const canBuild = Object.entries(building.cost).every(([resource, cost]) => 
      resources[resource as keyof Resource] >= (cost || 0)
    )

    if (!canBuild) return

    // Deducir costos
    const newResources = { ...resources }
    Object.entries(building.cost).forEach(([resource, cost]) => {
      newResources[resource as keyof Resource] -= cost || 0
    })

    // Agregar beneficios
    Object.entries(building.benefit).forEach(([resource, benefit]) => {
      newResources[resource as keyof Resource] += benefit || 0
    })

    setResources(newResources)
    setScore(prev => prev + 100)
  }

  const startGame = () => {
    setGameState('playing')
    setResources({ water: 100, nutrients: 50, space: 200, biodiversity: 0 })
    setScore(0)
    setLevel(1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {gameState === 'menu' && (
        <Card className="text-center bg-gradient-to-br from-blue-900/50 to-green-900/50 backdrop-blur-md border-blue-500/30 text-white">
          <CardHeader>
            <div className="text-6xl mb-4">🏗️</div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              HabitatBuilder.io
            </CardTitle>
            <p className="text-xl text-gray-300">Construye ecosistemas prósperos para la fauna de Jauja</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={startGame} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4">
              <TreePine className="mr-2 h-6 w-6" />
              ¡Comenzar Construcción!
            </Button>
          </CardContent>
        </Card>
      )}

      {gameState === 'playing' && (
        <div className="space-y-6">
          {/* Panel de recursos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-blue-900/50 border-blue-500/30 text-white">
              <CardContent className="p-3 text-center">
                <Droplets className="h-6 w-6 mx-auto mb-1 text-blue-400" />
                <div className="text-lg font-bold">{resources.water}</div>
                <div className="text-xs">Agua</div>
              </CardContent>
            </Card>
            <Card className="bg-green-900/50 border-green-500/30 text-white">
              <CardContent className="p-3 text-center">
                <Flower2 className="h-6 w-6 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold">{resources.nutrients}</div>
                <div className="text-xs">Nutrientes</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-500/30 text-white">
              <CardContent className="p-3 text-center">
                <Mountain className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                <div className="text-lg font-bold">{resources.space}</div>
                <div className="text-xs">Espacio</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/50 border-purple-500/30 text-white">
              <CardContent className="p-3 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-1 text-purple-400" />
                <div className="text-lg font-bold">{resources.biodiversity}</div>
                <div className="text-xs">Biodiversidad</div>
              </CardContent>
            </Card>
          </div>

          {/* Edificios disponibles */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle>🏗️ Construcciones Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {buildings.map((building) => {
                  const canBuild = Object.entries(building.cost).every(([resource, cost]) => 
                    resources[resource as keyof Resource] >= (cost || 0)
                  )

                  return (
                    <Card key={building.id} className={`bg-white/5 border-white/10 ${canBuild ? 'hover:bg-white/10 cursor-pointer' : 'opacity-50'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{building.emoji}</div>
                          <div>
                            <h3 className="font-bold text-white">{building.name}</h3>
                            <p className="text-xs text-gray-300">{building.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="text-xs text-red-300">Costo:</div>
                          <div className="flex gap-2 text-xs">
                            {Object.entries(building.cost).map(([resource, cost]) => (
                              <Badge key={resource} variant="outline" className="border-red-300 text-red-300">
                                {resource}: {cost}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-xs text-green-300">Beneficio:</div>
                          <div className="flex gap-2 text-xs">
                            {Object.entries(building.benefit).map(([resource, benefit]) => (
                              <Badge key={resource} variant="outline" className="border-green-300 text-green-300">
                                {resource}: +{benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button 
                          onClick={() => buildHabitat(building)}
                          disabled={!canBuild}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                          Construir
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Progreso del ecosistema */}
          <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-md border-green-500/30 text-white">
            <CardHeader>
              <CardTitle>🌿 Estado del Ecosistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Biodiversidad Total</span>
                  <span>{resources.biodiversity}/200</span>
                </div>
                <Progress value={(resources.biodiversity / 200) * 100} className="h-3" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-sm">Puntos</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{level}</div>
                  <div className="text-sm">Nivel</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
