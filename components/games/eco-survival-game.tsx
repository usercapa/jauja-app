'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, RotateCcw, Trophy, Clock, Heart, Zap, TreePine, Droplets, Sun, Moon, Users, Target } from 'lucide-react'

interface Player {
  id: string
  name: string
  x: number
  y: number
  health: number
  energy: number
  score: number
  speciesProtected: number
  isAlive: boolean
}

interface Species {
  id: string
  name: string
  emoji: string
  x: number
  y: number
  health: number
  type: 'flora' | 'fauna'
  rarity: 'common' | 'rare' | 'endangered'
  points: number
}

interface Threat {
  id: string
  type: 'pollution' | 'deforestation' | 'hunting' | 'climate'
  x: number
  y: number
  damage: number
  emoji: string
}

export default function EcoSurvivalGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [player, setPlayer] = useState<Player>({
    id: 'player1',
    name: 'EcoGuardian',
    x: 50,
    y: 50,
    health: 100,
    energy: 100,
    score: 0,
    speciesProtected: 0,
    isAlive: true
  })
  
  const [species, setSpecies] = useState<Species[]>([])
  const [threats, setThreats] = useState<Threat[]>([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos
  const [dayTime, setDayTime] = useState(true)
  const [onlinePlayers, setOnlinePlayers] = useState(Math.floor(Math.random() * 50) + 20)

  // Generar especies aleatorias
  const generateSpecies = useCallback(() => {
    const speciesTypes = [
      { name: 'Vicuña', emoji: '🦙', type: 'fauna', rarity: 'endangered', points: 50 },
      { name: 'Trucha', emoji: '🐟', type: 'fauna', rarity: 'common', points: 20 },
      { name: 'Cóndor', emoji: '🦅', type: 'fauna', rarity: 'endangered', points: 100 },
      { name: 'Puya Raimondi', emoji: '🌵', type: 'flora', rarity: 'rare', points: 75 },
      { name: 'Totora', emoji: '🌾', type: 'flora', rarity: 'common', points: 15 },
      { name: 'Chinchilla', emoji: '🐭', type: 'fauna', rarity: 'endangered', points: 80 }
    ]

    const newSpecies: Species[] = []
    for (let i = 0; i < 8; i++) {
      const speciesType = speciesTypes[Math.floor(Math.random() * speciesTypes.length)]
      newSpecies.push({
        id: `species-${i}`,
        name: speciesType.name,
        emoji: speciesType.emoji,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        health: 100,
        type: speciesType.type as 'flora' | 'fauna',
        rarity: speciesType.rarity as 'common' | 'rare' | 'endangered',
        points: speciesType.points
      })
    }
    setSpecies(newSpecies)
  }, [])

  // Generar amenazas
  const generateThreats = useCallback(() => {
    const threatTypes = [
      { type: 'pollution', emoji: '☠️', damage: 30 },
      { type: 'deforestation', emoji: '🪓', damage: 40 },
      { type: 'hunting', emoji: '🎯', damage: 50 },
      { type: 'climate', emoji: '🌡️', damage: 25 }
    ]

    const newThreats: Threat[] = []
    for (let i = 0; i < 4; i++) {
      const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      newThreats.push({
        id: `threat-${i}`,
        type: threatType.type as any,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        damage: threatType.damage,
        emoji: threatType.emoji
      })
    }
    setThreats(newThreats)
  }, [])

  const startGame = () => {
    setGameState('playing')
    setPlayer(prev => ({ ...prev, health: 100, energy: 100, score: 0, speciesProtected: 0, isAlive: true }))
    setTimeLeft(300)
    generateSpecies()
    generateThreats()
    setOnlinePlayers(Math.floor(Math.random() * 50) + 20)
  }

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState !== 'playing' || !player.isAlive) return

    setPlayer(prev => {
      let newX = prev.x
      let newY = prev.y
      
      switch (direction) {
        case 'up': newY = Math.max(0, prev.y - 5); break
        case 'down': newY = Math.min(95, prev.y + 5); break
        case 'left': newX = Math.max(0, prev.x - 5); break
        case 'right': newX = Math.min(95, prev.x + 5); break
      }

      return {
        ...prev,
        x: newX,
        y: newY,
        energy: Math.max(0, prev.energy - 2)
      }
    })
  }

  const protectSpecies = (speciesId: string) => {
    setSpecies(prev => prev.filter(s => s.id !== speciesId))
    setPlayer(prev => ({
      ...prev,
      score: prev.score + species.find(s => s.id === speciesId)?.points || 0,
      speciesProtected: prev.speciesProtected + 1,
      energy: Math.min(100, prev.energy + 10)
    }))
  }

  const eliminateThreat = (threatId: string) => {
    setThreats(prev => prev.filter(t => t.id !== threatId))
    setPlayer(prev => ({
      ...prev,
      score: prev.score + 25,
      energy: Math.max(0, prev.energy - 15)
    }))
  }

  // Timer y ciclo día/noche
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        if (timeLeft % 60 === 0) {
          setDayTime(prev => !prev)
        }
        if (timeLeft % 30 === 0) {
          generateThreats()
        }
        if (timeLeft % 45 === 0) {
          generateSpecies()
        }
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('gameOver')
    }
  }, [gameState, timeLeft, generateThreats, generateSpecies])

  // Verificar colisiones
  useEffect(() => {
    if (gameState !== 'playing') return

    // Colisión con especies
    species.forEach(s => {
      const distance = Math.sqrt(Math.pow(player.x - s.x, 2) + Math.pow(player.y - s.y, 2))
      if (distance < 8) {
        protectSpecies(s.id)
      }
    })

    // Colisión con amenazas
    threats.forEach(t => {
      const distance = Math.sqrt(Math.pow(player.x - t.x, 2) + Math.pow(player.y - t.y, 2))
      if (distance < 10) {
        setPlayer(prev => ({
          ...prev,
          health: Math.max(0, prev.health - t.damage)
        }))
        eliminateThreat(t.id)
      }
    })

    // Verificar si el jugador murió
    if (player.health <= 0) {
      setPlayer(prev => ({ ...prev, isAlive: false }))
      setGameState('gameOver')
    }
  }, [player.x, player.y, species, threats, gameState])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-green-400'
      case 'rare': return 'text-blue-400'
      case 'endangered': return 'text-red-400'
      default: return 'text-white'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {gameState === 'menu' && (
        <Card className="text-center bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-md border-green-500/30 text-white">
          <CardHeader>
            <div className="text-6xl mb-4">🌿</div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              EcoSurvival.io
            </CardTitle>
            <p className="text-xl text-gray-300">Sobrevive y protege la biodiversidad de Jauja</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <TreePine className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <h3 className="font-bold">Protege Especies</h3>
                <p className="text-sm text-gray-300">Rescata flora y fauna nativa</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <h3 className="font-bold">Elimina Amenazas</h3>
                <p className="text-sm text-gray-300">Combate la contaminación</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-bold">Multijugador</h3>
                <p className="text-sm text-gray-300">Hasta 100 jugadores online</p>
              </div>
            </div>
            
            <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-bold">{onlinePlayers} jugadores online</span>
              </div>
              <p className="text-sm text-gray-300">¡Únete a la batalla por la conservación!</p>
            </div>

            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4">
              <Play className="mr-2 h-6 w-6" />
              ¡Comenzar Supervivencia!
            </Button>
          </CardContent>
        </Card>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="space-y-4">
          {/* HUD del juego */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="bg-green-900/50 border-green-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-green-400">{player.score}</div>
                <div className="text-xs">Puntos</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/50 border-red-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Heart className="h-4 w-4 mr-1 text-red-400" />
                  <span className="text-lg font-bold">{player.health}</span>
                </div>
                <div className="text-xs">Salud</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/50 border-yellow-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-400" />
                  <span className="text-lg font-bold">{player.energy}</span>
                </div>
                <div className="text-xs">Energía</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/50 border-blue-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-400" />
                  <span className="text-lg font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                <div className="text-xs">Tiempo</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/50 border-purple-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-purple-400">{player.speciesProtected}</div>
                <div className="text-xs">Protegidas</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center">
                  {dayTime ? <Sun className="h-4 w-4 mr-1 text-yellow-400" /> : <Moon className="h-4 w-4 mr-1 text-blue-400" />}
                  <span className="text-sm font-bold">{dayTime ? 'Día' : 'Noche'}</span>
                </div>
                <div className="text-xs">Ciclo</div>
              </CardContent>
            </Card>
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-4">
            <Button onClick={() => setGameState('paused')} variant="outline" className="bg-white/10 border-white/20 text-white">
              <Pause className="h-4 w-4" />
            </Button>
            <Button onClick={() => setGameState('menu')} variant="outline" className="bg-white/10 border-white/20 text-white">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {gameState === 'paused' && (
            <Card className="text-center bg-black/50 backdrop-blur-md border-white/20 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Juego Pausado</h3>
                <Button onClick={() => setGameState('playing')} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Campo de juego */}
          {gameState === 'playing' && (
            <Card className={`relative overflow-hidden ${dayTime ? 'bg-gradient-to-br from-green-200 to-blue-200' : 'bg-gradient-to-br from-gray-800 to-blue-900'}`}>
              <CardContent className="p-0">
                <div className="relative w-full h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20">
                  {/* Jugador */}
                  <div 
                    className="absolute w-6 h-6 bg-white rounded-full border-2 border-green-500 flex items-center justify-center text-xs transition-all duration-200"
                    style={{ left: `${player.x}%`, top: `${player.y}%` }}
                  >
                    🧑‍🌾
                  </div>

                  {/* Especies */}
                  {species.map(s => (
                    <div
                      key={s.id}
                      className={`absolute w-8 h-8 flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-all ${getRarityColor(s.rarity)}`}
                      style={{ left: `${s.x}%`, top: `${s.y}%` }}
                      onClick={() => protectSpecies(s.id)}
                      title={`${s.name} (${s.rarity}) - ${s.points} puntos`}
                    >
                      {s.emoji}
                    </div>
                  ))}

                  {/* Amenazas */}
                  {threats.map(t => (
                    <div
                      key={t.id}
                      className="absolute w-8 h-8 flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-all animate-pulse"
                      style={{ left: `${t.x}%`, top: `${t.y}%` }}
                      onClick={() => eliminateThreat(t.id)}
                      title={`Amenaza: ${t.type} - ${t.damage} daño`}
                    >
                      {t.emoji}
                    </div>
                  ))}

                  {/* Controles de movimiento */}
                  <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1">
                    <div></div>
                    <Button size="sm" onClick={() => movePlayer('up')} className="bg-white/20 hover:bg-white/30">↑</Button>
                    <div></div>
                    <Button size="sm" onClick={() => movePlayer('left')} className="bg-white/20 hover:bg-white/30">←</Button>
                    <div></div>
                    <Button size="sm" onClick={() => movePlayer('right')} className="bg-white/20 hover:bg-white/30">→</Button>
                    <div></div>
                    <Button size="sm" onClick={() => movePlayer('down')} className="bg-white/20 hover:bg-white/30">↓</Button>
                    <div></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Barras de progreso */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-white text-sm">
                <span>Salud</span>
                <span>{player.health}/100</span>
              </div>
              <Progress value={player.health} className="h-3 bg-red-900/50" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-white text-sm">
                <span>Energía</span>
                <span>{player.energy}/100</span>
              </div>
              <Progress value={player.energy} className="h-3 bg-yellow-900/50" />
            </div>
          </div>
        </div>
      )}

      {gameState === 'gameOver' && (
        <Card className="text-center bg-gradient-to-br from-red-900/50 to-gray-900/50 backdrop-blur-md border-red-500/30 text-white">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">
              {player.isAlive ? '🏆' : '💀'}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {player.isAlive ? '¡Misión Completada!' : '¡Misión Fallida!'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{player.score}</div>
                <div className="text-sm">Puntos Totales</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{player.speciesProtected}</div>
                <div className="text-sm">Especies Protegidas</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{Math.floor((300 - timeLeft) / 60)}:{((300 - timeLeft) % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm">Tiempo Sobrevivido</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
                <Play className="mr-2 h-4 w-4" />
                Jugar de Nuevo
              </Button>
              <Button onClick={() => setGameState('menu')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Volver al Menú
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
