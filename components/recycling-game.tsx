'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, RotateCcw, Trophy, Clock, Target, CheckCircle, XCircle, Star, Zap } from 'lucide-react'

interface GameItem {
  id: number
  name: string
  emoji: string
  category: 'papel' | 'plastico' | 'vidrio' | 'metal' | 'organico'
  description: string
}

interface GameStats {
  score: number
  correct: number
  incorrect: number
  streak: number
  level: number
}

const gameItems: GameItem[] = [
  { id: 1, name: 'Botella de Agua San Mateo', emoji: '🍶', category: 'plastico', description: 'Botella PET de agua mineral local' },
  { id: 2, name: 'Periódico Correo Huancayo', emoji: '📰', category: 'papel', description: 'Diario regional de Junín' },
  { id: 3, name: 'Lata de Chicha de Jora', emoji: '🥤', category: 'metal', description: 'Lata de bebida tradicional andina' },
  { id: 4, name: 'Frasco de Miel de Jauja', emoji: '🫙', category: 'vidrio', description: 'Envase de miel local de Jauja' },
  { id: 5, name: 'Cáscara de Papa Nativa', emoji: '🥔', category: 'organico', description: 'Residuo de papa andina de Junín' },
  { id: 6, name: 'Caja de Queso Mantecoso', emoji: '📦', category: 'papel', description: 'Empaque de queso típico de Jauja' },
  { id: 7, name: 'Bolsa del Mercado Central', emoji: '🛍️', category: 'plastico', description: 'Bolsa del mercado de Jauja' },
  { id: 8, name: 'Botella de Pisco Acholado', emoji: '🍷', category: 'vidrio', description: 'Botella de pisco peruano' },
  { id: 9, name: 'Lata de Duraznos en Almíbar', emoji: '🥫', category: 'metal', description: 'Conserva de duraznos de Tarma' },
  { id: 10, name: 'Restos de Pachamanca', emoji: '🍖', category: 'organico', description: 'Desperdicios de comida tradicional' },
  { id: 11, name: 'Volante de Fiesta Patronal', emoji: '📄', category: 'papel', description: 'Publicidad de festividades locales' },
  { id: 12, name: 'Envase de Yogurt Gloria', emoji: '🥛', category: 'plastico', description: 'Envase de yogurt nacional' },
  { id: 13, name: 'Vidrio de Ventana Colonial', emoji: '🪟', category: 'vidrio', description: 'Cristal de arquitectura jaujina' },
  { id: 14, name: 'Cable de Minería', emoji: '🔌', category: 'metal', description: 'Cable de actividad minera regional' },
  { id: 15, name: 'Hojas de Eucalipto', emoji: '🍃', category: 'organico', description: 'Hojas de eucalipto andino' },
  { id: 16, name: 'Cáscara de Tuna', emoji: '🌵', category: 'organico', description: 'Residuo de fruta andina típica' },
  { id: 17, name: 'Envase de Leche Gloria', emoji: '🥛', category: 'plastico', description: 'Envase de leche de empresa peruana' },
  { id: 18, name: 'Lata de Atún Campomar', emoji: '🐟', category: 'metal', description: 'Conserva de pescado peruano' },
  { id: 19, name: 'Papel de Tamales', emoji: '🌽', category: 'papel', description: 'Papel de tamales tradicionales' },
  { id: 20, name: 'Botella de Inca Kola', emoji: '🥤', category: 'plastico', description: 'Botella de gaseosa peruana' }
]

const categories = {
  papel: { name: 'Papel', color: 'bg-blue-500', emoji: '📄' },
  plastico: { name: 'Plástico', color: 'bg-yellow-500', emoji: '🥤' },
  vidrio: { name: 'Vidrio', color: 'bg-green-500', emoji: '🍶' },
  metal: { name: 'Metal', color: 'bg-gray-500', emoji: '🥫' },
  organico: { name: 'Orgánico', color: 'bg-orange-500', emoji: '🍌' }
}

export default function RecyclingGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'finished'>('menu')
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null)
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    level: 1
  })
  const [timeLeft, setTimeLeft] = useState(60)
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' })
  const [usedItems, setUsedItems] = useState<number[]>([])

  const getRandomItem = useCallback(() => {
    const availableItems = gameItems.filter(item => !usedItems.includes(item.id))
    if (availableItems.length === 0) {
      setUsedItems([])
      return gameItems[Math.floor(Math.random() * gameItems.length)]
    }
    return availableItems[Math.floor(Math.random() * availableItems.length)]
  }, [usedItems])

  const startGame = () => {
    setGameState('playing')
    setStats({ score: 0, correct: 0, incorrect: 0, streak: 0, level: 1 })
    setTimeLeft(60)
    setUsedItems([])
    setCurrentItem(getRandomItem())
    setFeedback({ type: null, message: '' })
  }

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused')
  }

  const resetGame = () => {
    setGameState('menu')
    setCurrentItem(null)
    setStats({ score: 0, correct: 0, incorrect: 0, streak: 0, level: 1 })
    setTimeLeft(60)
    setUsedItems([])
    setFeedback({ type: null, message: '' })
  }

  const handleCategorySelect = (selectedCategory: string) => {
    if (!currentItem || gameState !== 'playing') return

    const isCorrect = currentItem.category === selectedCategory
    const points = isCorrect ? (10 + stats.streak * 2) : 0
    const newStreak = isCorrect ? stats.streak + 1 : 0

    setStats(prev => ({
      ...prev,
      score: prev.score + points,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      streak: newStreak,
      level: Math.floor((prev.correct + (isCorrect ? 1 : 0)) / 5) + 1
    }))

    setFeedback({
      type: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect 
        ? `¡Correcto! +${points} puntos` 
        : `Incorrecto. ${currentItem.name} va en ${categories[currentItem.category].name}`
    })

    setUsedItems(prev => [...prev, currentItem.id])

    setTimeout(() => {
      setCurrentItem(getRandomItem())
      setFeedback({ type: null, message: '' })
    }, 1500)
  }

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished')
    }
  }, [gameState, timeLeft])

  const getPerformanceMessage = () => {
    const accuracy = stats.correct + stats.incorrect > 0 ? (stats.correct / (stats.correct + stats.incorrect)) * 100 : 0
    if (accuracy >= 90) return "¡Eres un Maestro del Reciclaje! 🏆"
    if (accuracy >= 75) return "¡Excelente trabajo! 🌟"
    if (accuracy >= 60) return "¡Buen trabajo! 👍"
    return "¡Sigue practicando! 💪"
  }

  return (
    <div className="max-w-4xl mx-auto">
      {gameState === 'menu' && (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              EcoGame: Clasificación de Residuos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg text-gray-600">
              <p className="mb-4">¡Pon a prueba tus conocimientos sobre reciclaje!</p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold mb-2">📋 Cómo Jugar:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Clasifica cada objeto en el contenedor correcto</li>
                    <li>• Tienes 60 segundos para obtener la mayor puntuación</li>
                    <li>• Las respuestas consecutivas correctas dan bonus</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎯 Puntuación:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Respuesta correcta: 10 puntos base</li>
                    <li>• Racha de aciertos: +2 puntos extra</li>
                    <li>• Respuesta incorrecta: 0 puntos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-lg border border-red-200 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏔️</span>
                <h4 className="font-bold text-lg text-red-800">Especial: Jauja, Junín - Perú</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <img 
                    src="/images/jauja-plaza.png" 
                    alt="Plaza de Jauja" 
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    Aprende a reciclar con productos típicos de Jauja, la primera capital del Perú.
                  </p>
                </div>
                <div>
                  <img 
                    src="/images/jauja-laguna.png" 
                    alt="Laguna de Paca" 
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    Protejamos nuestros hermosos paisajes andinos con un reciclaje responsable.
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
              <Play className="mr-2 h-5 w-5" />
              Comenzar Juego
            </Button>
          </CardContent>
        </Card>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.score}</div>
                <div className="text-sm text-gray-600">Puntos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-1" />
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600">Segundos</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-1" />
                  {stats.streak}
                </div>
                <div className="text-sm text-gray-600">Racha</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.level}</div>
                <div className="text-sm text-gray-600">Nivel</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.correct}/{stats.correct + stats.incorrect}</div>
                <div className="text-sm text-gray-600">Aciertos</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progreso del Tiempo</span>
              <span>{Math.round((timeLeft / 60) * 100)}%</span>
            </div>
            <Progress value={(timeLeft / 60) * 100} className="h-2" />
          </div>

          {/* Game Controls */}
          <div className="flex justify-center gap-4">
            <Button onClick={pauseGame} variant="outline">
              {gameState === 'paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {gameState === 'paused' && (
            <Card className="text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Juego Pausado</h3>
                <p className="text-gray-600 mb-4">Haz clic en play para continuar</p>
                <Button onClick={pauseGame} className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" />
                  Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {gameState === 'playing' && currentItem && (
            <div className="space-y-6">
              {/* Current Item */}
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="text-8xl mb-4">{currentItem.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{currentItem.name}</h3>
                  <p className="text-gray-600">{currentItem.description}</p>
                  <div className="mt-4">
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      ¿En qué contenedor va?
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              {feedback.type && (
                <Card className={`text-center border-2 ${
                  feedback.type === 'correct' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {feedback.type === 'correct' ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span className={`font-semibold ${
                        feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback.message}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Category Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(categories).map(([key, category]) => (
                  <Button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 ${category.color} hover:opacity-90 text-white`}
                    disabled={feedback.type !== null}
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              ¡Juego Terminado!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-lg font-semibold text-green-600">
              {getPerformanceMessage()}
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">📊 Estadísticas Finales:</h4>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Puntuación Total:</span>
                    <span className="font-bold text-green-600">{stats.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Respuestas Correctas:</span>
                    <span className="font-bold text-blue-600">{stats.correct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Respuestas Incorrectas:</span>
                    <span className="font-bold text-red-600">{stats.incorrect}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mejor Racha:</span>
                    <span className="font-bold text-yellow-600">{stats.streak}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nivel Alcanzado:</span>
                    <span className="font-bold text-purple-600">{stats.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precisión:</span>
                    <span className="font-bold">
                      {stats.correct + stats.incorrect > 0 
                        ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">🏆 Logros Desbloqueados:</h4>
                <div className="space-y-2">
                  {stats.score >= 100 && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-4 w-4 mr-1" />
                      Centurión del Reciclaje
                    </Badge>
                  )}
                  {stats.streak >= 5 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      <Zap className="h-4 w-4 mr-1" />
                      Racha Imparable
                    </Badge>
                  )}
                  {stats.correct >= 10 && (
                    <Badge className="bg-green-100 text-green-800">
                      <Target className="h-4 w-4 mr-1" />
                      Experto Clasificador
                    </Badge>
                  )}
                  {(stats.correct / (stats.correct + stats.incorrect)) >= 0.9 && (
                    <Badge className="bg-blue-100 text-blue-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Precisión Perfecta
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
                <Play className="mr-2 h-4 w-4" />
                Jugar de Nuevo
              </Button>
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Volver al Menú
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
