'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Pause, RotateCcw, Trophy, Clock, Target, CheckCircle, XCircle, Star, Zap, Mountain, Waves, TreePine, Flower2, Bird, Fish, Rabbit, Leaf, Shield, Heart, ArrowRight, ArrowLeft, Home, Map, BookOpen, Award, Volume2, VolumeX } from 'lucide-react'

interface Species {
  id: number
  name: string
  emoji: string
  type: 'flora' | 'fauna'
  ecosystem: 'valle' | 'laguna' | 'montana' | 'bosque' | 'pajonal'
  status: 'seguro' | 'vulnerable' | 'peligro' | 'critico'
  description: string
  habitat: string
  threats: string[]
  conservation: string
  funFact: string
}

interface Level {
  id: number
  name: string
  ecosystem: string
  description: string
  species: Species[]
  challenges: Challenge[]
  background: string
  difficulty: 'facil' | 'medio' | 'dificil'
  unlocked: boolean
}

interface Challenge {
  id: number
  type: 'rescue' | 'habitat' | 'identify' | 'protect' | 'feed'
  description: string
  species: Species
  timeLimit: number
  points: number
}

interface GameState {
  currentLevel: number
  score: number
  lives: number
  speciesRescued: number
  habitatsRestored: number
  level: number
  experience: number
  unlockedSpecies: number[]
  achievements: string[]
  soundEnabled: boolean
}

const speciesData: Species[] = [
  // Valle del Mantaro
  {
    id: 1, name: 'Trucha Arcoíris', emoji: '🐟', type: 'fauna', ecosystem: 'valle',
    status: 'vulnerable', description: 'Pez introducido que se adaptó al río Mantaro',
    habitat: 'Ríos y lagunas de agua fría', threats: ['Contaminación', 'Sobrepesca'],
    conservation: 'Regulación de pesca y limpieza de ríos', funFact: 'Puede saltar hasta 3 metros de altura'
  },
  {
    id: 2, name: 'Sauce Llorón', emoji: '🌳', type: 'flora', ecosystem: 'valle',
    status: 'seguro', description: 'Árbol emblemático de las riberas del Mantaro',
    habitat: 'Orillas de ríos y zonas húmedas', threats: ['Deforestación', 'Urbanización'],
    conservation: 'Reforestación ribereña', funFact: 'Sus raíces pueden extenderse 40 metros'
  },
  {
    id: 3, name: 'Pato Silvestre', emoji: '🦆', type: 'fauna', ecosystem: 'valle',
    status: 'seguro', description: 'Ave acuática común en lagunas y ríos',
    habitat: 'Cuerpos de agua dulce', threats: ['Pérdida de hábitat', 'Caza'],
    conservation: 'Protección de humedales', funFact: 'Migra hasta 1000 km en busca de alimento'
  },

  // Laguna de Paca
  {
    id: 4, name: 'Totora', emoji: '🌾', type: 'flora', ecosystem: 'laguna',
    status: 'vulnerable', description: 'Planta acuática tradicional de los Andes',
    habitat: 'Orillas de lagunas altoandinas', threats: ['Contaminación', 'Turismo excesivo'],
    conservation: 'Control de visitantes y limpieza', funFact: 'Los incas la usaban para hacer balsas'
  },
  {
    id: 5, name: 'Zambullidor', emoji: '🐦', type: 'fauna', ecosystem: 'laguna',
    status: 'vulnerable', description: 'Ave buceadora endémica de lagunas andinas',
    habitat: 'Lagunas de altura con vegetación acuática', threats: ['Contaminación', 'Disturbio humano'],
    conservation: 'Zonas de protección en lagunas', funFact: 'Puede bucear hasta 6 metros de profundidad'
  },
  {
    id: 6, name: 'Rana de Junín', emoji: '🐸', type: 'fauna', ecosystem: 'laguna',
    status: 'critico', description: 'Anfibio endémico de las lagunas altoandinas',
    habitat: 'Lagunas de altura entre 4000-4500 msnm', threats: ['Cambio climático', 'Minería'],
    conservation: 'Programas de reproducción en cautiverio', funFact: 'Es completamente acuática, nunca sale del agua'
  },

  // Montañas
  {
    id: 7, name: 'Vicuña', emoji: '🦙', type: 'fauna', ecosystem: 'montana',
    status: 'vulnerable', description: 'Camélido silvestre de los Andes centrales',
    habitat: 'Pajonales y praderas altoandinas', threats: ['Caza furtiva', 'Pérdida de territorio'],
    conservation: 'Reservas comunales y vigilancia', funFact: 'Su fibra es la más fina del mundo'
  },
  {
    id: 8, name: 'Puya Raimondi', emoji: '🌵', type: 'flora', ecosystem: 'montana',
    status: 'vulnerable', description: 'Planta gigante endémica de los Andes peruanos',
    habitat: 'Laderas rocosas entre 3200-4800 msnm', threats: ['Cambio climático', 'Pastoreo excesivo'],
    conservation: 'Áreas protegidas y educación', funFact: 'Vive 100 años y florece solo una vez antes de morir'
  },
  {
    id: 9, name: 'Cóndor Andino', emoji: '🦅', type: 'fauna', ecosystem: 'montana',
    status: 'peligro', description: 'Ave rapaz más grande del mundo',
    habitat: 'Acantilados y montañas altas', threats: ['Envenenamiento', 'Pérdida de carroña'],
    conservation: 'Programas de liberación y monitoreo', funFact: 'Puede volar 300 km sin batir las alas'
  },

  // Bosques
  {
    id: 10, name: 'Eucalipto', emoji: '🌲', type: 'flora', ecosystem: 'bosque',
    status: 'seguro', description: 'Árbol introducido que se adaptó al clima andino',
    habitat: 'Laderas de montañas templadas', threats: ['Tala excesiva', 'Plagas'],
    conservation: 'Manejo forestal sostenible', funFact: 'Crece hasta 2 metros por año'
  },
  {
    id: 11, name: 'Vizcacha', emoji: '🐰', type: 'fauna', ecosystem: 'bosque',
    status: 'seguro', description: 'Roedor andino que vive en colonias',
    habitat: 'Roquedales y bosques de montaña', threats: ['Caza', 'Destrucción de madrigueras'],
    conservation: 'Protección de hábitat rocoso', funFact: 'Puede saltar hasta 3 metros entre rocas'
  },
  {
    id: 12, name: 'Colibrí Gigante', emoji: '🐦', type: 'fauna', ecosystem: 'bosque',
    status: 'vulnerable', description: 'El colibrí más grande del mundo',
    habitat: 'Bosques y jardines con flores', threats: ['Deforestación', 'Uso de pesticidas'],
    conservation: 'Corredores biológicos', funFact: 'Bate sus alas 20 veces por segundo'
  },

  // Pajonales
  {
    id: 13, name: 'Ichu', emoji: '🌾', type: 'flora', ecosystem: 'pajonal',
    status: 'seguro', description: 'Pasto nativo fundamental del ecosistema andino',
    habitat: 'Praderas altoandinas sobre 3500 msnm', threats: ['Sobrepastoreo', 'Quemas'],
    conservation: 'Manejo rotativo de pastoreo', funFact: 'Sus raíces pueden llegar a 60 cm de profundidad'
  },
  {
    id: 14, name: 'Chinchilla', emoji: '🐭', type: 'fauna', ecosystem: 'pajonal',
    status: 'peligro', description: 'Roedor de pelaje extremadamente suave',
    habitat: 'Roquedales en pajonales altoandinos', threats: ['Caza por su piel', 'Pérdida de hábitat'],
    conservation: 'Prohibición de caza y reservas', funFact: 'Su pelaje es tan denso que no puede mojarse'
  },
  {
    id: 15, name: 'Quinua Silvestre', emoji: '🌱', type: 'flora', ecosystem: 'pajonal',
    status: 'vulnerable', description: 'Ancestro silvestre de la quinua cultivada',
    habitat: 'Laderas secas entre 3500-4200 msnm', threats: ['Hibridación', 'Recolección excesiva'],
    conservation: 'Bancos de germoplasma', funFact: 'Contiene todos los aminoácidos esenciales'
  }
]

const levels: Level[] = [
  {
    id: 1, name: 'Valle del Mantaro', ecosystem: 'valle', difficulty: 'facil', unlocked: true,
    description: 'Explora las riberas del río Mantaro y protege la vida acuática',
    species: speciesData.filter(s => s.ecosystem === 'valle'),
    challenges: [], background: 'bg-gradient-to-br from-green-400 to-blue-500'
  },
  {
    id: 2, name: 'Laguna de Paca', ecosystem: 'laguna', difficulty: 'facil', unlocked: false,
    description: 'Sumérgete en el ecosistema lacustre más importante de Jauja',
    species: speciesData.filter(s => s.ecosystem === 'laguna'),
    challenges: [], background: 'bg-gradient-to-br from-cyan-400 to-blue-600'
  },
  {
    id: 3, name: 'Montañas Andinas', ecosystem: 'montana', difficulty: 'medio', unlocked: false,
    description: 'Escala las alturas y protege la fauna de las cumbres',
    species: speciesData.filter(s => s.ecosystem === 'montana'),
    challenges: [], background: 'bg-gradient-to-br from-gray-400 to-purple-600'
  },
  {
    id: 4, name: 'Bosques de Eucalipto', ecosystem: 'bosque', difficulty: 'medio', unlocked: false,
    description: 'Navega por los bosques introducidos que se volvieron hogar',
    species: speciesData.filter(s => s.ecosystem === 'bosque'),
    challenges: [], background: 'bg-gradient-to-br from-green-500 to-emerald-600'
  },
  {
    id: 5, name: 'Pajonales Altoandinos', ecosystem: 'pajonal', difficulty: 'dificil', unlocked: false,
    description: 'Conquista las praderas más altas y sus especies únicas',
    species: speciesData.filter(s => s.ecosystem === 'pajonal'),
    challenges: [], background: 'bg-gradient-to-br from-yellow-400 to-orange-500'
  }
]

const achievements = [
  { id: 'first_rescue', name: 'Primer Rescate', description: 'Rescata tu primera especie', icon: '🏥' },
  { id: 'habitat_master', name: 'Maestro del Hábitat', description: 'Restaura 5 hábitats', icon: '🏗️' },
  { id: 'species_expert', name: 'Experto en Especies', description: 'Identifica 10 especies correctamente', icon: '🔬' },
  { id: 'conservation_hero', name: 'Héroe de la Conservación', description: 'Completa todos los niveles', icon: '🦸' },
  { id: 'speed_runner', name: 'Corredor Veloz', description: 'Completa un nivel en menos de 2 minutos', icon: '⚡' },
  { id: 'perfect_score', name: 'Puntuación Perfecta', description: 'Obtén 100% en un nivel', icon: '💯' }
]

export default function JaujaWildlifeGame() {
  const [gameMode, setGameMode] = useState<'menu' | 'levelSelect' | 'playing' | 'paused' | 'gameOver' | 'encyclopedia'>('menu')
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    lives: 3,
    speciesRescued: 0,
    habitatsRestored: 0,
    level: 1,
    experience: 0,
    unlockedSpecies: [],
    achievements: [],
    soundEnabled: true
  })
  
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [challengeProgress, setChallengeProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null)
  const [showSpeciesDetail, setShowSpeciesDetail] = useState(false)

  // Generar desafíos para cada nivel
  const generateChallenges = useCallback((levelId: number) => {
    const level = levels.find(l => l.id === levelId)
    if (!level) return []

    const challenges: Challenge[] = []
    level.species.forEach((species, index) => {
      // Desafío de rescate
      challenges.push({
        id: index * 5 + 1,
        type: 'rescue',
        description: `¡${species.name} está en peligro! Rescátalo antes de que sea tarde.`,
        species,
        timeLimit: 20,
        points: 50
      })

      // Desafío de identificación
      challenges.push({
        id: index * 5 + 2,
        type: 'identify',
        description: `Identifica correctamente esta especie de ${level.name}`,
        species,
        timeLimit: 15,
        points: 30
      })

      // Desafío de hábitat
      if (species.type === 'flora') {
        challenges.push({
          id: index * 5 + 3,
          type: 'habitat',
          description: `Restaura el hábitat de ${species.name}`,
          species,
          timeLimit: 25,
          points: 40
        })
      }

      // Desafío de protección
      if (species.status === 'peligro' || species.status === 'critico') {
        challenges.push({
          id: index * 5 + 4,
          type: 'protect',
          description: `Protege a ${species.name} de sus amenazas`,
          species,
          timeLimit: 30,
          points: 60
        })
      }
    })

    return challenges.slice(0, 8) // Máximo 8 desafíos por nivel
  }, [])

  const startLevel = (levelId: number) => {
    const level = levels.find(l => l.id === levelId)
    if (!level || !level.unlocked) return

    const challenges = generateChallenges(levelId)
    level.challenges = challenges
    
    setGameState(prev => ({ ...prev, currentLevel: levelId, lives: 3 }))
    setCurrentChallenge(challenges[0] || null)
    setTimeLeft(challenges[0]?.timeLimit || 30)
    setChallengeProgress(0)
    setGameMode('playing')
  }

  const completeChallenge = (success: boolean) => {
    if (!currentChallenge) return

    const level = levels.find(l => l.id === gameState.currentLevel)
    if (!level) return

    if (success) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + currentChallenge.points,
        experience: prev.experience + 10,
        speciesRescued: currentChallenge.type === 'rescue' ? prev.speciesRescued + 1 : prev.speciesRescued,
        habitatsRestored: currentChallenge.type === 'habitat' ? prev.habitatsRestored + 1 : prev.habitatsRestored,
        unlockedSpecies: [...prev.unlockedSpecies, currentChallenge.species.id]
      }))
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1
      }))
    }

    // Siguiente desafío
    const currentIndex = level.challenges.findIndex(c => c.id === currentChallenge.id)
    const nextChallenge = level.challenges[currentIndex + 1]

    if (nextChallenge && gameState.lives > 0) {
      setCurrentChallenge(nextChallenge)
      setTimeLeft(nextChallenge.timeLimit)
      setChallengeProgress(((currentIndex + 1) / level.challenges.length) * 100)
    } else {
      // Nivel completado o game over
      if (gameState.lives > 0) {
        // Desbloquear siguiente nivel
        const nextLevel = levels.find(l => l.id === gameState.currentLevel + 1)
        if (nextLevel) {
          nextLevel.unlocked = true
        }
        setGameMode('levelSelect')
      } else {
        setGameMode('gameOver')
      }
    }
  }

  // Timer effect
  useEffect(() => {
    if (gameMode === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameMode === 'playing') {
      completeChallenge(false)
    }
  }, [gameMode, timeLeft])

  const resetGame = () => {
    setGameState({
      currentLevel: 1,
      score: 0,
      lives: 3,
      speciesRescued: 0,
      habitatsRestored: 0,
      level: 1,
      experience: 0,
      unlockedSpecies: [],
      achievements: [],
      soundEnabled: true
    })
    setGameMode('menu')
    setCurrentChallenge(null)
    setChallengeProgress(0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'seguro': return 'bg-green-100 text-green-800'
      case 'vulnerable': return 'bg-yellow-100 text-yellow-800'
      case 'peligro': return 'bg-orange-100 text-orange-800'
      case 'critico': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'seguro': return '✅'
      case 'vulnerable': return '⚠️'
      case 'peligro': return '🚨'
      case 'critico': return '🆘'
      default: return '❓'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Menú Principal */}
      {gameMode === 'menu' && (
        <Card className="text-center overflow-hidden">
          <div className="relative h-80 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <img 
              src="/images/jauja-wildlife-hero.png" 
              alt="Fauna y flora de Jauja" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <TreePine className="h-16 w-16" />
                  <Trophy className="h-20 w-20" />
                  <Bird className="h-16 w-16" />
                </div>
                <h1 className="text-4xl font-bold mb-4">EcoAventura Jauja</h1>
                <p className="text-xl opacity-90 mb-2">Guardianes de la Biodiversidad</p>
                <p className="text-lg opacity-75">Provincia de Jauja • Junín • Perú</p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">15 Especies</h3>
                <p className="text-sm text-gray-600">Flora y fauna nativa de los 5 ecosistemas principales</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <Mountain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">5 Ecosistemas</h3>
                <p className="text-sm text-gray-600">Desde el valle hasta los pajonales altoandinos</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">6 Logros</h3>
                <p className="text-sm text-gray-600">Desbloquea achievements y conviértete en héroe</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">🎮 Modos de Juego</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => setGameMode('levelSelect')} 
                  size="lg" 
                  className="h-16 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Play className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-bold">Aventura</div>
                    <div className="text-sm opacity-90">Completa todos los ecosistemas</div>
                  </div>
                </Button>
                <Button 
                  onClick={() => setGameMode('encyclopedia')} 
                  size="lg" 
                  variant="outline"
                  className="h-16 border-2"
                >
                  <BookOpen className="mr-3 h-6 w-6" />
                  <div className="text-left">
                    <div className="font-bold">Enciclopedia</div>
                    <div className="text-sm opacity-75">Aprende sobre las especies</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 via-white to-green-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl">🏔️</span>
                <h4 className="font-bold text-xl text-gray-800">Biodiversidad de Jauja</h4>
                <span className="text-3xl">🦙</span>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                Desde las aguas cristalinas del río Mantaro hasta las cumbres nevadas de los Andes, 
                la provincia de Jauja alberga una increíble diversidad de vida. Cada ecosistema cuenta 
                una historia única de adaptación y supervivencia en el corazón de los Andes centrales.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selección de Niveles */}
      {gameMode === 'levelSelect' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button onClick={() => setGameMode('menu')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Menú
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Selecciona tu Ecosistema</h2>
              <p className="text-gray-600">Progreso: {gameState.level}/5 niveles completados</p>
            </div>
            <Button onClick={() => setGameMode('encyclopedia')} variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Enciclopedia
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card 
                key={level.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  level.unlocked ? 'opacity-100' : 'opacity-50'
                } ${level.unlocked ? 'hover:scale-105' : ''}`}
                onClick={() => level.unlocked && startLevel(level.id)}
              >
                <div className={`h-32 ${level.background} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-bold">{level.name}</h3>
                      <Badge className={`mt-2 ${
                        level.difficulty === 'facil' ? 'bg-green-500' :
                        level.difficulty === 'medio' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {level.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  {!level.unlocked && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-4xl">🔒</div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">{level.species.length}</span> especies
                    </div>
                    <div className="flex gap-1">
                      {level.species.slice(0, 3).map((species) => (
                        <span key={species.id} className="text-lg">{species.emoji}</span>
                      ))}
                      {level.species.length > 3 && <span className="text-sm text-gray-500">+{level.species.length - 3}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Estadísticas del Jugador */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Estadísticas del Guardián
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{gameState.score}</div>
                  <div className="text-sm text-gray-600">Puntos Totales</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{gameState.speciesRescued}</div>
                  <div className="text-sm text-gray-600">Especies Rescatadas</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{gameState.habitatsRestored}</div>
                  <div className="text-sm text-gray-600">Hábitats Restaurados</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{gameState.unlockedSpecies.length}</div>
                  <div className="text-sm text-gray-600">Especies Descubiertas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Juego en Progreso */}
      {gameMode === 'playing' && currentChallenge && (
        <div className="space-y-6">
          {/* HUD del Juego */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-green-600">{gameState.score}</div>
                <div className="text-xs text-gray-600">Puntos</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-red-600 flex items-center justify-center">
                  {Array.from({ length: gameState.lives }).map((_, i) => (
                    <Heart key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs text-gray-600">Vidas</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-blue-600 flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {timeLeft}
                </div>
                <div className="text-xs text-gray-600">Segundos</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-purple-600">{levels.find(l => l.id === gameState.currentLevel)?.name}</div>
                <div className="text-xs text-gray-600">Nivel Actual</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-4 text-center">
                <div className="text-xl font-bold text-yellow-600">{Math.round(challengeProgress)}%</div>
                <div className="text-xs text-gray-600">Progreso</div>
              </CardContent>
            </Card>
          </div>

          {/* Progreso del Nivel */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progreso del Nivel</span>
              <span>{Math.round(challengeProgress)}%</span>
            </div>
            <Progress value={challengeProgress} className="h-3" />
          </div>

          {/* Controles del Juego */}
          <div className="flex justify-center gap-4">
            <Button onClick={() => setGameMode('paused')} variant="outline">
              <Pause className="h-4 w-4" />
            </Button>
            <Button onClick={() => setGameMode('levelSelect')} variant="outline">
              <Home className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))} 
              variant="outline"
            >
              {gameState.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          {/* Desafío Actual */}
          <Card className="text-center overflow-hidden">
            <div className={`${levels.find(l => l.id === gameState.currentLevel)?.background} text-white p-6`}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                  {currentChallenge.type === 'rescue' && '🚑 RESCATE'}
                  {currentChallenge.type === 'identify' && '🔍 IDENTIFICAR'}
                  {currentChallenge.type === 'habitat' && '🏗️ RESTAURAR'}
                  {currentChallenge.type === 'protect' && '🛡️ PROTEGER'}
                  {currentChallenge.type === 'feed' && '🍃 ALIMENTAR'}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold mb-2">{currentChallenge.description}</h3>
              <p className="opacity-90">+{currentChallenge.points} puntos por completar</p>
            </div>
            
            <CardContent className="p-8">
              <div className="text-8xl mb-6">{currentChallenge.species.emoji}</div>
              <h4 className="text-3xl font-bold mb-4 text-gray-800">{currentChallenge.species.name}</h4>
              <p className="text-lg text-gray-600 mb-6">{currentChallenge.species.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">📍 Hábitat</h5>
                  <p className="text-sm text-gray-600">{currentChallenge.species.habitat}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">
                    {getStatusIcon(currentChallenge.species.status)} Estado
                  </h5>
                  <Badge className={getStatusColor(currentChallenge.species.status)}>
                    {currentChallenge.species.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Botones de Acción según el tipo de desafío */}
              <div className="space-y-4">
                {currentChallenge.type === 'rescue' && (
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => completeChallenge(true)}
                      className="h-16 bg-green-600 hover:bg-green-700 text-lg"
                    >
                      🚑 Rescatar Ahora
                    </Button>
                    <Button 
                      onClick={() => completeChallenge(false)}
                      variant="outline"
                      className="h-16 text-lg"
                    >
                      ⏰ Esperar Ayuda
                    </Button>
                  </div>
                )}

                {currentChallenge.type === 'identify' && (
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => completeChallenge(true)}
                      className="h-16 bg-blue-600 hover:bg-blue-700 text-lg"
                    >
                      ✅ Es {currentChallenge.species.name}
                    </Button>
                    <Button 
                      onClick={() => completeChallenge(false)}
                      variant="outline"
                      className="h-16 text-lg"
                    >
                      ❌ Es otra especie
                    </Button>
                  </div>
                )}

                {currentChallenge.type === 'habitat' && (
                  <div className="grid grid-cols-3 gap-4">
                    <Button 
                      onClick={() => completeChallenge(currentChallenge.species.type === 'flora')}
                      className="h-16 bg-green-600 hover:bg-green-700"
                    >
                      🌱 Plantar
                    </Button>
                    <Button 
                      onClick={() => completeChallenge(currentChallenge.species.type === 'fauna')}
                      className="h-16 bg-blue-600 hover:bg-blue-700"
                    >
                      🏠 Construir Refugio
                    </Button>
                    <Button 
                      onClick={() => completeChallenge(false)}
                      variant="outline"
                      className="h-16"
                    >
                      🚫 No Hacer Nada
                    </Button>
                  </div>
                )}

                {currentChallenge.type === 'protect' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Amenazas principales:</strong> {currentChallenge.species.threats.join(', ')}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={() => completeChallenge(true)}
                        className="h-16 bg-purple-600 hover:bg-purple-700 text-lg"
                      >
                        🛡️ Implementar Protección
                      </Button>
                      <Button 
                        onClick={() => completeChallenge(false)}
                        variant="outline"
                        className="h-16 text-lg"
                      >
                        🤷 Ignorar Amenazas
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dato Curioso */}
              <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">💡 Dato Curioso</h5>
                <p className="text-sm text-yellow-700">{currentChallenge.species.funFact}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Juego Pausado */}
      {gameMode === 'paused' && (
        <Card className="text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Juego Pausado</h2>
            <p className="text-lg text-gray-600 mb-8">Tómate un respiro, la naturaleza te espera</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setGameMode('playing')} size="lg" className="bg-green-600 hover:bg-green-700">
                <Play className="mr-2 h-5 w-5" />
                Continuar Aventura
              </Button>
              <Button onClick={() => setGameMode('levelSelect')} variant="outline" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Volver a Niveles
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Over */}
      {gameMode === 'gameOver' && (
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="text-6xl mb-6">😔</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">¡Misión Fallida!</h2>
            <p className="text-lg text-gray-600 mb-8">
              No te rindas, guardián. La naturaleza necesita tu protección.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold mb-4">Estadísticas Finales:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-600">{gameState.score}</div>
                  <div className="text-sm text-gray-600">Puntos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{gameState.speciesRescued}</div>
                  <div className="text-sm text-gray-600">Rescatadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{gameState.habitatsRestored}</div>
                  <div className="text-sm text-gray-600">Restaurados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{gameState.unlockedSpecies.length}</div>
                  <div className="text-sm text-gray-600">Descubiertas</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => startLevel(gameState.currentLevel)} size="lg" className="bg-green-600 hover:bg-green-700">
                <RotateCcw className="mr-2 h-5 w-5" />
                Intentar de Nuevo
              </Button>
              <Button onClick={() => setGameMode('levelSelect')} variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Elegir Otro Nivel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enciclopedia */}
      {gameMode === 'encyclopedia' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button onClick={() => setGameMode('menu')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Menú
            </Button>
            <h2 className="text-2xl font-bold text-gray-800">Enciclopedia de Biodiversidad</h2>
            <div className="w-32"></div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="valle">Valle</TabsTrigger>
              <TabsTrigger value="laguna">Laguna</TabsTrigger>
              <TabsTrigger value="montana">Montaña</TabsTrigger>
              <TabsTrigger value="bosque">Bosque</TabsTrigger>
              <TabsTrigger value="pajonal">Pajonal</TabsTrigger>
            </TabsList>

            {['all', 'valle', 'laguna', 'montana', 'bosque', 'pajonal'].map((ecosystem) => (
              <TabsContent key={ecosystem} value={ecosystem} className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {speciesData
                    .filter(species => ecosystem === 'all' || species.ecosystem === ecosystem)
                    .map((species) => (
                      <Card 
                        key={species.id} 
                        className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => {
                          setSelectedSpecies(species)
                          setShowSpeciesDetail(true)
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <div className="text-6xl mb-3">{species.emoji}</div>
                            <h3 className="text-xl font-bold text-gray-800">{species.name}</h3>
                            <Badge className={`mt-2 ${getStatusColor(species.status)}`}>
                              {getStatusIcon(species.status)} {species.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">Tipo:</span>
                              <span>{species.type === 'flora' ? '🌱 Flora' : '🐾 Fauna'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Ecosistema:</span>
                              <span className="capitalize">{species.ecosystem}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{species.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {/* Modal de Detalle de Especie */}
      {showSpeciesDetail && selectedSpecies && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center">
              <div className="text-8xl mb-4">{selectedSpecies.emoji}</div>
              <CardTitle className="text-2xl">{selectedSpecies.name}</CardTitle>
              <Badge className={`${getStatusColor(selectedSpecies.status)} text-lg px-4 py-2`}>
                {getStatusIcon(selectedSpecies.status)} {selectedSpecies.status.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">📝 Descripción</h4>
                <p className="text-gray-600">{selectedSpecies.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🏠 Hábitat</h4>
                <p className="text-gray-600">{selectedSpecies.habitat}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">⚠️ Amenazas</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {selectedSpecies.threats.map((threat, index) => (
                    <li key={index}>{threat}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">🛡️ Conservación</h4>
                <p className="text-gray-600">{selectedSpecies.conservation}</p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Dato Curioso</h4>
                <p className="text-yellow-700">{selectedSpecies.funFact}</p>
              </div>
              
              <Button 
                onClick={() => setShowSpeciesDetail(false)} 
                className="w-full"
              >
                Cerrar
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
