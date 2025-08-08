'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, RotateCcw, Trophy, Clock, Target, CheckCircle, XCircle, Star, Zap, Mountain, Waves, ShoppingCart, Heart } from 'lucide-react'

interface EcoItem {
  id: number
  name: string
  emoji: string
  category: 'rio' | 'laguna' | 'mercado' | 'ciudad'
  location: string
  description: string
  action: 'reciclar' | 'limpiar' | 'proteger' | 'conservar'
}

interface GameStats {
  score: number
  correct: number
  incorrect: number
  streak: number
  level: number
}

const ecoItems: EcoItem[] = [
  // Río Mantaro
  { id: 1, name: 'Botella en el Río Mantaro', emoji: '🍶', category: 'rio', location: 'Puente Balta', description: 'Botella plástica flotando en el río', action: 'reciclar' },
  { id: 2, name: 'Bolsa en la Ribera', emoji: '🛍️', category: 'rio', location: 'Malecón Mantaro', description: 'Bolsa plástica en la orilla del río', action: 'limpiar' },
  { id: 3, name: 'Lata de Chicha de Jora', emoji: '🥤', category: 'rio', location: 'Puente Ferrocarril', description: 'Lata vacía cerca del río', action: 'reciclar' },
  
  // Laguna de Paca
  { id: 4, name: 'Residuos en Laguna de Paca', emoji: '🗑️', category: 'laguna', location: 'Laguna de Paca', description: 'Basura dejada por turistas', action: 'limpiar' },
  { id: 5, name: 'Totora de la Laguna', emoji: '🌾', category: 'laguna', location: 'Orillas de Paca', description: 'Planta acuática nativa', action: 'proteger' },
  { id: 6, name: 'Pato Silvestre', emoji: '🦆', category: 'laguna', location: 'Centro de la laguna', description: 'Ave migratoria en peligro', action: 'conservar' },
  
  // Mercado Central
  { id: 7, name: 'Cáscara de Papa Nativa', emoji: '🥔', category: 'mercado', location: 'Mercado Central', description: 'Residuo orgánico de papa jaujina', action: 'reciclar' },
  { id: 8, name: 'Envase de Queso Mantecoso', emoji: '🧀', category: 'mercado', location: 'Sección lácteos', description: 'Envoltorio de queso local', action: 'reciclar' },
  { id: 9, name: 'Bolsa del Mercado', emoji: '🛒', category: 'mercado', location: 'Entrada principal', description: 'Bolsa plástica del mercado', action: 'reciclar' },
  
  // Ciudad de Jauja
  { id: 10, name: 'Papel de Tamales', emoji: '🌽', category: 'ciudad', location: 'Plaza de Armas', description: 'Papel usado para tamales', action: 'reciclar' },
  { id: 11, name: 'Eucalipto del Parque', emoji: '🌳', category: 'ciudad', location: 'Parque Bolognesi', description: 'Árbol emblemático de Jauja', action: 'proteger' },
  { id: 12, name: 'Colilla en la Calle', emoji: '🚬', category: 'ciudad', location: 'Jr. Junín', description: 'Colilla de cigarro en la vía pública', action: 'limpiar' },
  
  // Productos típicos
  { id: 13, name: 'Cáscara de Tuna', emoji: '🌵', category: 'ciudad', location: 'Cerro de Pasco', description: 'Residuo de fruta andina', action: 'reciclar' },
  { id: 14, name: 'Frasco de Miel de Jauja', emoji: '🍯', category: 'mercado', location: 'Puesto de mieles', description: 'Envase de miel local', action: 'reciclar' },
  { id: 15, name: 'Periódico Correo', emoji: '📰', category: 'ciudad', location: 'Kiosco central', description: 'Diario regional de Huancayo', action: 'reciclar' },
  
  // Festividades y cultura
  { id: 16, name: 'Adorno de Fiesta Patronal', emoji: '🎊', category: 'ciudad', location: 'Plaza de Armas', description: 'Decoración de festividad local', action: 'limpiar' },
  { id: 17, name: 'Botella de Pisco', emoji: '🍷', category: 'ciudad', location: 'Restaurante típico', description: 'Botella de pisco peruano', action: 'reciclar' },
  { id: 18, name: 'Hoja de Pachamanca', emoji: '🍃', category: 'mercado', location: 'Comedor popular', description: 'Hoja usada en pachamanca', action: 'reciclar' },
  
  // Naturaleza local
  { id: 19, name: 'Trucha del Mantaro', emoji: '🐟', category: 'rio', location: 'Río Mantaro', description: 'Pez nativo en peligro', action: 'conservar' },
  { id: 20, name: 'Flor de Retama', emoji: '🌼', category: 'ciudad', location: 'Cerros de Jauja', description: 'Flor típica de la región', action: 'proteger' }
]

const categories = {
  rio: { name: 'Río Mantaro', color: 'bg-blue-500', emoji: '🏞️', icon: Waves },
  laguna: { name: 'Laguna de Paca', color: 'bg-cyan-500', emoji: '🏔️', icon: Mountain },
  mercado: { name: 'Mercado Central', color: 'bg-orange-500', emoji: '🏪', icon: ShoppingCart },
  ciudad: { name: 'Ciudad de Jauja', color: 'bg-green-500', emoji: '🏛️', icon: Heart }
}

const actions = {
  reciclar: { name: 'Reciclar', color: 'bg-green-600', emoji: '♻️' },
  limpiar: { name: 'Limpiar', color: 'bg-blue-600', emoji: '🧹' },
  proteger: { name: 'Proteger', color: 'bg-yellow-600', emoji: '🛡️' },
  conservar: { name: 'Conservar', color: 'bg-purple-600', emoji: '🌿' }
}

export default function JaujaEcoGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'finished'>('menu')
  const [currentItem, setCurrentItem] = useState<EcoItem | null>(null)
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    level: 1
  })
  const [timeLeft, setTimeLeft] = useState(90)
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: '' })
  const [usedItems, setUsedItems] = useState<number[]>([])

  const getRandomItem = useCallback(() => {
    const availableItems = ecoItems.filter(item => !usedItems.includes(item.id))
    if (availableItems.length === 0) {
      setUsedItems([])
      return ecoItems[Math.floor(Math.random() * ecoItems.length)]
    }
    return availableItems[Math.floor(Math.random() * availableItems.length)]
  }, [usedItems])

  const startGame = () => {
    setGameState('playing')
    setStats({ score: 0, correct: 0, incorrect: 0, streak: 0, level: 1 })
    setTimeLeft(90)
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
    setTimeLeft(90)
    setUsedItems([])
    setFeedback({ type: null, message: '' })
  }

  const handleActionSelect = (selectedAction: string) => {
    if (!currentItem || gameState !== 'playing') return

    const isCorrect = currentItem.action === selectedAction
    const points = isCorrect ? (15 + stats.streak * 3) : 0
    const newStreak = isCorrect ? stats.streak + 1 : 0

    setStats(prev => ({
      ...prev,
      score: prev.score + points,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      streak: newStreak,
      level: Math.floor((prev.correct + (isCorrect ? 1 : 0)) / 6) + 1
    }))

    const actionName = actions[selectedAction as keyof typeof actions].name
    const locationInfo = `en ${currentItem.location}`

    setFeedback({
      type: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect 
        ? `¡Correcto! Hay que ${actionName.toLowerCase()} ${currentItem.name} ${locationInfo}. +${points} puntos` 
        : `Incorrecto. ${currentItem.name} ${locationInfo} requiere: ${actions[currentItem.action].name}`
    })

    setUsedItems(prev => [...prev, currentItem.id])

    setTimeout(() => {
      setCurrentItem(getRandomItem())
      setFeedback({ type: null, message: '' })
    }, 2000)
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
    if (accuracy >= 90) return "¡Eres un Guardián de Jauja! 🏆"
    if (accuracy >= 75) return "¡Excelente Jaujino Ecológico! 🌟"
    if (accuracy >= 60) return "¡Buen Cuidador del Valle! 👍"
    return "¡Sigue aprendiendo sobre nuestra tierra! 💪"
  }

  return (
    <div className="max-w-5xl mx-auto">
      {gameState === 'menu' && (
        <Card className="text-center overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <img 
              src="/images/jauja-game-hero.png" 
              alt="Jauja panorámica para juego" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Trophy className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">EcoJauja: El Juego de Nuestra Tierra</h2>
                <p className="text-lg opacity-90">Cuida el ambiente de la Primera Capital del Perú</p>
              </div>
            </div>
          </div>
          <CardContent className="p-8 space-y-6">
            <div className="text-lg text-gray-600">
              <p className="mb-6">¡Conviértete en un guardián del medio ambiente jaujino!</p>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Cómo Jugar:
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• Identifica problemas ambientales en Jauja</li>
                    <li>• Elige la acción correcta para cada situación</li>
                    <li>• Tienes 90 segundos para obtener la mayor puntuación</li>
                    <li>• Aprende sobre lugares emblemáticos de nuestra ciudad</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-600" />
                    Puntuación:
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>• Acción correcta: 15 puntos base</li>
                    <li>• Racha de aciertos: +3 puntos extra</li>
                    <li>• Conoce productos típicos de Jauja</li>
                    <li>• Protege nuestro patrimonio natural</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 via-white to-green-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mountain className="h-6 w-6 text-green-600" />
                <h4 className="font-bold text-lg text-gray-800">Lugares de Jauja en el Juego</h4>
                <Waves className="h-6 w-6 text-blue-600" />
              </div>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="text-2xl mb-1">🏞️</div>
                  <div className="text-sm font-medium">Río Mantaro</div>
                  <div className="text-xs text-gray-600">Puente Balta</div>
                </div>
                <div className="bg-cyan-100 p-3 rounded-lg">
                  <div className="text-2xl mb-1">🏔️</div>
                  <div className="text-sm font-medium">Laguna de Paca</div>
                  <div className="text-xs text-gray-600">Joya natural</div>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <div className="text-2xl mb-1">🏪</div>
                  <div className="text-sm font-medium">Mercado Central</div>
                  <div className="text-xs text-gray-600">Desde 1908</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="text-sm font-medium">Plaza de Armas</div>
                  <div className="text-xs text-gray-600">Centro histórico</div>
                </div>
              </div>
            </div>

            <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3">
              <Play className="mr-2 h-6 w-6" />
              Comenzar EcoJauja
            </Button>
          </CardContent>
        </Card>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.score}</div>
                <div className="text-sm text-gray-600">Puntos</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-1" />
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600">Segundos</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-1" />
                  {stats.streak}
                </div>
                <div className="text-sm text-gray-600">Racha</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.level}</div>
                <div className="text-sm text-gray-600">Nivel</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-gray-600">{stats.correct}/{stats.correct + stats.incorrect}</div>
                <div className="text-sm text-gray-600">Aciertos</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tiempo Restante</span>
              <span>{Math.round((timeLeft / 90) * 100)}%</span>
            </div>
            <Progress value={(timeLeft / 90) * 100} className="h-3" />
          </div>

          {/* Game Controls */}
          <div className="flex justify-center gap-4">
            <Button onClick={pauseGame} variant="outline" size="lg">
              {gameState === 'paused' ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
            <Button onClick={resetGame} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {gameState === 'paused' && (
            <Card className="text-center bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Juego Pausado</h3>
                <p className="text-gray-600 mb-6">Tómate un respiro y continúa cuidando Jauja</p>
                <Button onClick={pauseGame} size="lg" className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-5 w-5" />
                  Continuar Cuidando Jauja
                </Button>
              </CardContent>
            </Card>
          )}

          {gameState === 'playing' && currentItem && (
            <div className="space-y-6">
              {/* Current Item */}
              <Card className="text-center overflow-hidden">
                <div className={`${categories[currentItem.category].color} text-white p-4`}>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {React.createElement(categories[currentItem.category].icon, { className: "h-6 w-6" })}
                    <h4 className="font-bold text-lg">{categories[currentItem.category].name}</h4>
                  </div>
                  <p className="text-sm opacity-90">{currentItem.location}</p>
                </div>
                <CardContent className="p-8">
                  <div className="text-8xl mb-4">{currentItem.emoji}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">{currentItem.name}</h3>
                  <p className="text-gray-600 mb-4">{currentItem.description}</p>
                  <Badge variant="outline" className="text-lg px-6 py-2 border-2">
                    ¿Qué acción tomar?
                  </Badge>
                </CardContent>
              </Card>

              {/* Feedback */}
              {feedback.type && (
                <Card className={`text-center border-2 ${
                  feedback.type === 'correct' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-red-500 bg-red-50'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-3">
                      {feedback.type === 'correct' ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <XCircle className="h-8 w-8 text-red-600" />
                      )}
                      <span className={`font-semibold text-lg ${
                        feedback.type === 'correct' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback.message}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(actions).map(([key, action]) => (
                  <Button
                    key={key}
                    onClick={() => handleActionSelect(key)}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 ${action.color} hover:opacity-90 text-white text-lg font-semibold`}
                    disabled={feedback.type !== null}
                  >
                    <span className="text-3xl">{action.emoji}</span>
                    <span>{action.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && (
        <Card className="text-center overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-8">
            <Trophy className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">¡Juego Terminado!</h2>
            <p className="text-lg opacity-90">Has completado tu misión como Guardián de Jauja</p>
          </div>
          <CardContent className="p-8 space-y-8">
            <div className="text-2xl font-semibold text-green-600">
              {getPerformanceMessage()}
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-xl text-gray-800">📊 Estadísticas Finales:</h4>
                <div className="space-y-3 text-left bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Puntuación Total:</span>
                    <span className="font-bold text-2xl text-green-600">{stats.score}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Acciones Correctas:</span>
                    <span className="font-bold text-blue-600">{stats.correct}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Acciones Incorrectas:</span>
                    <span className="font-bold text-red-600">{stats.incorrect}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mejor Racha:</span>
                    <span className="font-bold text-yellow-600">{stats.streak}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Nivel Alcanzado:</span>
                    <span className="font-bold text-purple-600">{stats.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Precisión:</span>
                    <span className="font-bold text-lg">
                      {stats.correct + stats.incorrect > 0 
                        ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-xl text-gray-800">🏆 Logros Jaujinos:</h4>
                <div className="space-y-3">
                  {stats.score >= 150 && (
                    <Badge className="bg-yellow-100 text-yellow-800 p-3 text-base w-full justify-start">
                      <Star className="h-5 w-5 mr-2" />
                      Guardián del Valle del Mantaro
                    </Badge>
                  )}
                  {stats.streak >= 6 && (
                    <Badge className="bg-orange-100 text-orange-800 p-3 text-base w-full justify-start">
                      <Zap className="h-5 w-5 mr-2" />
                      Racha Imparable Jaujina
                    </Badge>
                  )}
                  {stats.correct >= 12 && (
                    <Badge className="bg-green-100 text-green-800 p-3 text-base w-full justify-start">
                      <Target className="h-5 w-5 mr-2" />
                      Experto en Ecología Local
                    </Badge>
                  )}
                  {(stats.correct / (stats.correct + stats.incorrect)) >= 0.85 && (
                    <Badge className="bg-blue-100 text-blue-800 p-3 text-base w-full justify-start">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Precisión de Primera Capital
                    </Badge>
                  )}
                  {stats.score >= 200 && (
                    <Badge className="bg-purple-100 text-purple-800 p-3 text-base w-full justify-start">
                      <Trophy className="h-5 w-5 mr-2" />
                      Héroe Ambiental de Jauja
                    </Badge>
                  )}
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg mt-6">
                  <h5 className="font-semibold text-gray-800 mb-3">💡 Mensaje Educativo:</h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Cada acción que tomas en el juego refleja la realidad de nuestra querida Jauja. 
                    El río Mantaro, la Laguna de Paca, nuestro mercado central y toda nuestra ciudad 
                    necesitan de ciudadanos comprometidos como tú. ¡Aplica lo aprendido en tu vida diaria!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={startGame} size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Play className="mr-2 h-5 w-5" />
                Jugar de Nuevo
              </Button>
              <Button onClick={resetGame} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-5 w-5" />
                Volver al Menú
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
