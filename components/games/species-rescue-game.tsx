'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, RotateCcw, Heart, Clock, Users, Target, Zap, AlertTriangle } from 'lucide-react'

interface RescueMission {
  id: string
  species: {
    name: string
    emoji: string
    status: 'critical' | 'endangered' | 'vulnerable'
  }
  location: string
  timeLimit: number
  difficulty: number
  points: number
  playersNeeded: number
  currentPlayers: number
}

export default function SpeciesRescueGame() {
  const [gameState, setGameState] = useState<'menu' | 'lobby' | 'mission' | 'completed'>('menu')
  const [selectedMission, setSelectedMission] = useState<RescueMission | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const [score, setScore] = useState(0)
  const [onlinePlayers] = useState(Math.floor(Math.random() * 30) + 15)

  const missions: RescueMission[] = [
    {
      id: '1',
      species: { name: 'Rana de Junín', emoji: '🐸', status: 'critical' },
      location: 'Laguna de Paca',
      timeLimit: 120,
      difficulty: 5,
      points: 500,
      playersNeeded: 3,
      currentPlayers: 2
    },
    {
      id: '2',
      species: { name: 'Cóndor Andino', emoji: '🦅', status: 'endangered' },
      location: 'Montañas de Jauja',
      timeLimit: 180,
      difficulty: 4,
      points: 400,
      playersNeeded: 4,
      currentPlayers: 3
    },
    {
      id: '3',
      species: { name: 'Vicuña', emoji: '🦙', status: 'vulnerable' },
      location: 'Pajonales Altoandinos',
      timeLimit: 90,
      difficulty: 3,
      points: 300,
      playersNeeded: 2,
      currentPlayers: 1
    },
    {
      id: '4',
      species: { name: 'Chinchilla', emoji: '🐭', status: 'endangered' },
      location: 'Roquedales de Altura',
      timeLimit: 150,
      difficulty: 4,
      points: 450,
      playersNeeded: 3,
      currentPlayers: 2
    }
  ]

  const startMission = (mission: RescueMission) => {
    setSelectedMission(mission)
    setTimeLeft(mission.timeLimit)
    setProgress(0)
    setGameState('mission')
  }

  const completeMissionStep = () => {
    if (!selectedMission) return
    
    const newProgress = Math.min(100, progress + 25)
    setProgress(newProgress)
    setScore(prev => prev + 50)
    
    if (newProgress >= 100) {
      setScore(prev => prev + selectedMission.points)
      setGameState('completed')
    }
  }

  useEffect(() => {
    if (gameState === 'mission' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'mission') {
      setGameState('completed')
    }
  }, [gameState, timeLeft])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500'
      case 'endangered': return 'bg-orange-500'
      case 'vulnerable': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {gameState === 'menu' && (
        <Card className="text-center bg-gradient-to-br from-red-900/50 to-pink-900/50 backdrop-blur-md border-red-500/30 text-white">
          <CardHeader>
            <div className="text-6xl mb-4">🚑</div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              SpeciesRescue.io
            </CardTitle>
            <p className="text-xl text-gray-300">Rescata especies en peligro con otros jugadores</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-500/20 p-4 rounded-lg border border-red-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-red-400" />
                <span className="text-red-400 font-bold">{onlinePlayers} rescatistas online</span>
              </div>
              <p className="text-sm text-gray-300">¡Únete a las misiones de rescate colaborativas!</p>
            </div>

            <Button onClick={() => setGameState('lobby')} size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4">
              <Heart className="mr-2 h-6 w-6" />
              ¡Comenzar Rescates!
            </Button>
          </CardContent>
        </Card>
      )}

      {gameState === 'lobby' && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-pink-900/50 backdrop-blur-md border-red-500/30 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">🚨 Misiones de Rescate Activas</CardTitle>
              <p className="text-center text-gray-300">Selecciona una misión para unirte al equipo de rescate</p>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission) => (
              <Card key={mission.id} className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:scale-105 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{mission.species.emoji}</div>
                    <Badge className={`${getStatusColor(mission.species.status)} text-white font-bold`}>
                      {mission.species.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{mission.species.name}</h3>
                  <p className="text-gray-300 mb-4">📍 {mission.location}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>⏱️ Tiempo límite:</span>
                      <span>{Math.floor(mission.timeLimit / 60)}:{(mission.timeLimit % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>⭐ Puntos:</span>
                      <span>{mission.points}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>👥 Equipo:</span>
                      <span>{mission.currentPlayers}/{mission.playersNeeded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>🔥 Dificultad:</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < mission.difficulty ? 'text-red-400' : 'text-gray-600'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Progress value={(mission.currentPlayers / mission.playersNeeded) * 100} className="mb-4" />
                  
                  <Button 
                    onClick={() => startMission(mission)}
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={mission.currentPlayers >= mission.playersNeeded}
                  >
                    {mission.currentPlayers >= mission.playersNeeded ? (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Equipo Completo
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Unirse al Rescate
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => setGameState('menu')} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Volver al Menú
            </Button>
          </div>
        </div>
      )}

      {gameState === 'mission' && selectedMission && (
        <div className="space-y-6">
          {/* HUD de la misión */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-red-900/50 border-red-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-red-400">{score}</div>
                <div className="text-xs">Puntos</div>
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
            <Card className="bg-green-900/50 border-green-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-green-400">{Math.round(progress)}%</div>
                <div className="text-xs">Progreso</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/50 border-purple-500/30 text-white">
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1 text-purple-400" />
                  <span className="text-lg font-bold">{selectedMission.currentPlayers}</span>
                </div>
                <div className="text-xs">Equipo</div>
              </CardContent>
            </Card>
          </div>

          {/* Área de la misión */}
          <Card className="bg-gradient-to-br from-green-400/20 to-blue-400/20 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center text-white">
              <div className="text-8xl mb-4">{selectedMission.species.emoji}</div>
              <h2 className="text-3xl font-bold mb-2">Rescatando {selectedMission.species.name}</h2>
              <p className="text-xl text-gray-300 mb-6">📍 {selectedMission.location}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Progreso del Rescate</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-4" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button 
                  onClick={completeMissionStep}
                  className="bg-green-600 hover:bg-green-700 h-16"
                  disabled={progress >= 100}
                >
                  <Heart className="mr-2 h-6 w-6" />
                  Rescatar Especie
                </Button>
                <Button 
                  onClick={completeMissionStep}
                  className="bg-blue-600 hover:bg-blue-700 h-16"
                  disabled={progress >= 100}
                >
                  <Target className="mr-2 h-6 w-6" />
                  Asegurar Área
                </Button>
              </div>

              <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Estado: {selectedMission.species.status.toUpperCase()}</span>
                </div>
                <p className="text-sm text-gray-300">¡Cada segundo cuenta! Trabaja en equipo para salvar esta especie.</p>
              </div>
            </CardContent>
          </Card>

          {/* Controles */}
          <div className="flex justify-center gap-4">
            <Button onClick={() => setGameState('lobby')} variant="outline" className="bg-white/10 border-white/20 text-white">
              Abandonar Misión
            </Button>
          </div>
        </div>
      )}

      {gameState === 'completed' && selectedMission && (
        <Card className="text-center bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-md border-green-500/30 text-white">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">
              {progress >= 100 ? '🎉' : '😔'}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {progress >= 100 ? '¡Rescate Exitoso!' : '¡Tiempo Agotado!'}
            </h2>
            <div className="text-6xl mb-4">{selectedMission.species.emoji}</div>
            <h3 className="text-2xl font-bold mb-6">{selectedMission.species.name}</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-sm">Puntos Totales</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{Math.round(progress)}%</div>
                <div className="text-sm">Progreso Completado</div>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">{selectedMission.currentPlayers}</div>
                <div className="text-sm">Rescatistas</div>
              </div>
            </div>

            {progress >= 100 && (
              <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 mb-6">
                <h4 className="font-bold text-green-400 mb-2">¡Especie Salvada!</h4>
                <p className="text-sm text-gray-300">
                  Gracias a tu trabajo en equipo, {selectedMission.species.name} ahora está a salvo en {selectedMission.location}.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setGameState('lobby')} className="bg-red-600 hover:bg-red-700">
                <Heart className="mr-2 h-4 w-4" />
                Nueva Misión
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
