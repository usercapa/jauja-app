'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Crown, Zap, Shield, Heart, Sword, Star } from 'lucide-react'

interface Hero {
  name: string
  level: number
  experience: number
  health: number
  energy: number
  skills: {
    rescue: number
    protection: number
    restoration: number
    education: number
  }
}

export default function ConservationHeroGame() {
  const [gameState, setGameState] = useState<'menu' | 'character' | 'playing'>('menu')
  const [hero, setHero] = useState<Hero>({
    name: 'EcoHero',
    level: 1,
    experience: 0,
    health: 100,
    energy: 100,
    skills: {
      rescue: 1,
      protection: 1,
      restoration: 1,
      education: 1
    }
  })

  const startGame = () => {
    setGameState('character')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {gameState === 'menu' && (
        <Card className="text-center bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md border-purple-500/30 text-white">
          <CardHeader>
            <div className="text-6xl mb-4">👑</div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              ConservationHero.io
            </CardTitle>
            <p className="text-xl text-gray-300">Conviértete en el héroe de la conservación más poderoso</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={startGame} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4">
              <Crown className="mr-2 h-6 w-6" />
              ¡Crear Héroe!
            </Button>
          </CardContent>
        </Card>
      )}

      {gameState === 'character' && (
        <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md border-purple-500/30 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">⚔️ Tu Héroe de la Conservación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-8xl mb-4">🦸‍♂️</div>
              <h2 className="text-3xl font-bold mb-2">{hero.name}</h2>
              <Badge className="bg-purple-500 text-white text-lg px-4 py-2">
                Nivel {hero.level}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">📊 Estadísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>❤️ Salud:</span>
                    <span>{hero.health}/100</span>
                  </div>
                  <Progress value={hero.health} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>⚡ Energía:</span>
                    <span>{hero.energy}/100</span>
                  </div>
                  <Progress value={hero.energy} className="h-2" />
                  
                  <div className="flex justify-between">
                    <span>⭐ Experiencia:</span>
                    <span>{hero.experience}/100</span>
                  </div>
                  <Progress value={hero.experience} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">🎯 Habilidades</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>🚑 Rescate:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < hero.skills.rescue ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>🛡️ Protección:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < hero.skills.protection ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>🌱 Restauración:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < hero.skills.restoration ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>📚 Educación:</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < hero.skills.education ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={() => setGameState('playing')} size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Sword className="mr-2 h-6 w-6" />
                ¡Comenzar Aventura!
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {gameState === 'playing' && (
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">🚧 Modo Aventura en Desarrollo</h2>
          <p className="text-gray-300 mb-6">¡Próximamente podrás vivir épicas aventuras de conservación!</p>
          <Button onClick={() => setGameState('menu')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Volver al Menú
          </Button>
        </div>
      )}
    </div>
  )
}
