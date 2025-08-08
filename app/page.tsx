import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Recycle, Leaf, Globe, TrendingUp, Users, Award, ArrowRight, CheckCircle, MapPin, Calendar, Phone, Mail, Mountain, Waves, ShoppingCart, TreePine, Fish, Flower2 } from 'lucide-react'
import Link from "next/link"
import JaujaEcoGame from "@/components/jauja-eco-game"

export default function JaujaMunicipalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-white">
      {/* Header Municipal */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MPJ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Municipalidad Provincial de Jauja</h1>
                <p className="text-sm text-gray-600">Primera Capital del Perú • Cuidando nuestro ambiente</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="#inicio" className="text-gray-700 hover:text-green-600 transition-colors">Inicio</Link>
              <Link href="#rios" className="text-gray-700 hover:text-blue-600 transition-colors">Ríos</Link>
              <Link href="#lagunas" className="text-gray-700 hover:text-cyan-600 transition-colors">Lagunas</Link>
              <Link href="#mercado" className="text-gray-700 hover:text-orange-600 transition-colors">Mercado</Link>
              <Link href="#juego" className="text-gray-700 hover:text-purple-600 transition-colors">EcoJuego</Link>
              <Link href="#estadisticas" className="text-gray-700 hover:text-red-600 transition-colors">Datos</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mountain className="h-8 w-8 text-green-600" />
              <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-lg px-4 py-2">
                🏛️ Primera Capital del Perú
              </Badge>
              <Waves className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Jauja Verde: Cuidando Nuestro Patrimonio Natural
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Desde el corazón del Valle del Mantaro, a 3,395 metros de altura, 
              construimos un futuro sostenible para nuestra histórica ciudad y sus 34,000 habitantes.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <img 
                  src="/images/jauja-panoramica.png" 
                  alt="Vista panorámica de Jauja" 
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">Centro Histórico</h4>
                <p className="text-sm text-gray-600">Patrimonio colonial que preservamos</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <img 
                  src="/images/laguna-paca.png" 
                  alt="Laguna de Paca" 
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">Laguna de Paca</h4>
                <p className="text-sm text-gray-600">Joya natural que protegemos</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <img 
                  src="/images/valle-mantaro.png" 
                  alt="Valle del Mantaro" 
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900">Valle del Mantaro</h4>
                <p className="text-sm text-gray-600">Tierra fértil que cuidamos</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Leaf className="mr-2 h-5 w-5" />
                Plan Ambiental 2024
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Ver Proyectos Verdes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Ríos */}
      <section id="rios" className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Waves className="h-8 w-8 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900">
                Protegiendo Nuestros Ríos
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              El río Mantaro es la arteria vital de nuestra región. Su cuidado es responsabilidad de todos los jaujinos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="/images/rio-mantaro.png" 
                    alt="Río Mantaro en Jauja" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="text-white p-6">
                      <h4 className="font-bold text-xl mb-2">Río Mantaro</h4>
                      <p className="text-sm opacity-90">Principal fuente hídrica del Valle del Mantaro</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estado de Conservación</span>
                      <Badge className="bg-yellow-100 text-yellow-800">En Recuperación</Badge>
                    </div>
                    <Progress value={65} className="h-3" />
                    <p className="text-sm text-gray-600">
                      Implementamos el "Plan Mantaro Limpio" con monitoreo constante de la calidad del agua 
                      y campañas de limpieza comunitaria.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Fish className="h-6 w-6" />
                    Acciones de Conservación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Plantas de Tratamiento</h5>
                        <p className="text-sm text-gray-600">3 plantas operativas tratando 2,500 m³/día</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Monitoreo de Calidad</h5>
                        <p className="text-sm text-gray-600">Análisis mensual en 8 puntos de control</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Reforestación Ribereña</h5>
                        <p className="text-sm text-gray-600">5,000 plantones nativos sembrados en 2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold">Educación Ambiental</h5>
                        <p className="text-sm text-gray-600">Talleres en 25 instituciones educativas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-800">Datos del Río Mantaro en Jauja</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">127 km</div>
                      <div className="text-sm text-gray-600">Longitud en la provincia</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-gray-600">Cobertura de tratamiento</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">12</div>
                      <div className="text-sm text-gray-600">Especies de peces nativas</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">3,200</div>
                      <div className="text-sm text-gray-600">Familias beneficiadas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/images/limpieza-rio.png" 
                    alt="Limpieza del río Mantaro" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="text-white p-4">
                      <h4 className="font-bold text-lg">Jornada de Limpieza</h4>
                      <p className="text-sm opacity-90">Voluntarios jaujinos en acción</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Próxima jornada:</span>
                      <Badge className="bg-blue-100 text-blue-800">15 de Diciembre</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Punto de encuentro:</span>
                      <span className="text-sm text-gray-600">Puente Balta - 8:00 AM</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Users className="mr-2 h-4 w-4" />
                      Inscribirse como Voluntario
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Lagunas */}
      <section id="lagunas" className="py-16 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Waves className="h-8 w-8 text-cyan-600" />
              <h3 className="text-3xl font-bold text-gray-900">
                Conservando Nuestras Lagunas
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La Laguna de Paca es nuestro tesoro natural más preciado, destino turístico y ecosistema vital.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-80">
                  <img 
                    src="/images/laguna-paca-panorama.png" 
                    alt="Laguna de Paca vista panorámica" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="text-white p-6">
                      <h4 className="font-bold text-2xl mb-2">Laguna de Paca</h4>
                      <p className="opacity-90">Espejo de agua a 3,395 msnm • Área: 230 hectáreas</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-cyan-50 border-cyan-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyan-800">
                      <TreePine className="h-6 w-6" />
                      Flora y Fauna
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Aves acuáticas</span>
                        <Badge className="bg-green-100 text-green-800">18 especies</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Peces nativos</span>
                        <Badge className="bg-blue-100 text-blue-800">5 especies</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Plantas acuáticas</span>
                        <Badge className="bg-purple-100 text-purple-800">12 especies</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Totorales</span>
                        <Badge className="bg-yellow-100 text-yellow-800">45 hectáreas</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-teal-50 border-teal-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-800">
                      <Globe className="h-6 w-6" />
                      Turismo Sostenible
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Visitantes/año</span>
                        <Badge className="bg-orange-100 text-orange-800">85,000</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Botes registrados</span>
                        <Badge className="bg-blue-100 text-blue-800">24 unidades</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Restaurantes</span>
                        <Badge className="bg-green-100 text-green-800">12 locales</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Empleos directos</span>
                        <Badge className="bg-purple-100 text-purple-800">180 personas</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-cyan-800">Plan de Conservación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">Control de Residuos</h5>
                        <p className="text-xs text-gray-600">Contenedores especializados en todo el perímetro</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">Monitoreo de Calidad</h5>
                        <p className="text-xs text-gray-600">Análisis trimestral del agua y sedimentos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">Regulación Turística</h5>
                        <p className="text-xs text-gray-600">Límite de capacidad y horarios controlados</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm">Educación Ambiental</h5>
                        <p className="text-xs text-gray-600">Guías capacitados y señalización educativa</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-40">
                  <img 
                    src="/images/aves-laguna.png" 
                    alt="Aves en la Laguna de Paca" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end">
                    <div className="text-white p-3">
                      <h4 className="font-bold text-sm">Observación de Aves</h4>
                      <p className="text-xs opacity-90">Actividad ecoturística destacada</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mejor época:</span>
                      <Badge className="bg-cyan-100 text-cyan-800">Mayo - Agosto</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Horario ideal:</span>
                      <span className="text-sm text-gray-600">6:00 - 9:00 AM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-lg mb-2">Estado Actual</h4>
                  <div className="text-3xl font-bold mb-2">BUENO</div>
                  <p className="text-sm opacity-90 mb-4">Calidad del agua y ecosistema</p>
                  <Progress value={78} className="h-2 bg-white/20" />
                  <p className="text-xs mt-2 opacity-75">Índice de Conservación: 78/100</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Mercado */}
      <section id="mercado" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="h-8 w-8 text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900">
                Mercado Central Sostenible
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              El corazón comercial de Jauja se transforma en un modelo de gestión ambiental responsable.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <img 
                    src="/images/mercado-central-jauja.png" 
                    alt="Mercado Central de Jauja" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="text-white p-6">
                      <h4 className="font-bold text-xl mb-2">Mercado Central de Jauja</h4>
                      <p className="text-sm opacity-90">Centro neurálgico del comercio local desde 1908</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">450</div>
                      <div className="text-sm text-gray-600">Comerciantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">8 ton</div>
                      <div className="text-sm text-gray-600">Residuos orgánicos/día</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15,000</div>
                      <div className="text-sm text-gray-600">Visitantes/día</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">95%</div>
                      <div className="text-sm text-gray-600">Productos locales</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Recycle className="h-6 w-6" />
                    Programa "Mercado Verde"
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Separación en Origen</h5>
                        <p className="text-sm text-gray-600">Contenedores diferenciados por tipo de residuo en cada puesto</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Compostaje Comunitario</h5>
                        <p className="text-sm text-gray-600">Planta de compostaje que procesa 6 toneladas diarias</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-yellow-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Bolsas Biodegradables</h5>
                        <p className="text-sm text-gray-600">Distribución gratuita de 2,000 bolsas ecológicas semanales</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h5 className="font-semibold">Capacitación Continua</h5>
                        <p className="text-sm text-gray-600">Talleres mensuales para comerciantes sobre manejo de residuos</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-800">Productos Típicos de Jauja</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-yellow-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🥔</div>
                      <div className="text-sm font-medium">Papa Nativa</div>
                      <div className="text-xs text-gray-600">15 variedades</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🧀</div>
                      <div className="text-sm font-medium">Queso Mantecoso</div>
                      <div className="text-xs text-gray-600">Especialidad local</div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🌽</div>
                      <div className="text-sm font-medium">Maíz Amiláceo</div>
                      <div className="text-xs text-gray-600">Grano andino</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🍯</div>
                      <div className="text-sm font-medium">Miel de Abeja</div>
                      <div className="text-xs text-gray-600">Producción local</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🫘</div>
                      <div className="text-sm font-medium">Habas</div>
                      <div className="text-xs text-gray-600">Legumbre andina</div>
                    </div>
                    <div className="bg-pink-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🌶️</div>
                      <div className="text-sm font-medium">Ají Amarillo</div>
                      <div className="text-xs text-gray-600">Condimento típico</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src="/images/compostaje-jauja.png" 
                    alt="Planta de compostaje" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end">
                    <div className="text-white p-4">
                      <h4 className="font-bold text-lg">Planta de Compostaje</h4>
                      <p className="text-sm opacity-90">Transformando residuos en abono</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Capacidad diaria:</span>
                      <Badge className="bg-green-100 text-green-800">6 toneladas</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Compost producido:</span>
                      <Badge className="bg-brown-100 text-brown-800">1.8 ton/día</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Agricultores beneficiados:</span>
                      <Badge className="bg-blue-100 text-blue-800">340 familias</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-600 to-yellow-600 text-white">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-lg mb-2">Impacto Ambiental</h4>
                  <div className="text-3xl font-bold mb-2">-65%</div>
                  <p className="text-sm opacity-90 mb-4">Reducción de residuos al relleno sanitario</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Meta 2024:</span>
                      <span>-75%</span>
                    </div>
                    <Progress value={87} className="h-2 bg-white/20" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Juego EcoJauja */}
      <section id="juego" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-8 w-8 text-purple-600" />
              <h3 className="text-3xl font-bold text-gray-900">
                🎮 EcoJauja: El Juego de Nuestra Tierra
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Aprende sobre el cuidado ambiental de Jauja mientras te diviertes con productos, lugares y costumbres de nuestra querida ciudad.
            </p>
          </div>
          <JaujaEcoGame />
        </div>
      </section>

      {/* Estadísticas y Datos */}
      <section id="estadisticas" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              📊 Datos Ambientales de Jauja 2024
            </h3>
            <p className="text-lg text-gray-600">
              Transparencia en nuestros avances hacia una ciudad más sostenible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-green-200 bg-white">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-green-600 mb-2">34,582</div>
                <p className="text-gray-600">Habitantes comprometidos con el ambiente</p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-white">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">127 km</div>
                <p className="text-gray-600">De río Mantaro en nuestra provincia</p>
              </CardContent>
            </Card>

            <Card className="text-center border-cyan-200 bg-white">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-cyan-600 mb-2">230 ha</div>
                <p className="text-gray-600">Área de la Laguna de Paca protegida</p>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200 bg-white">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-orange-600 mb-2">8 ton</div>
                <p className="text-gray-600">Residuos orgánicos procesados diariamente</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Avances Ambientales 2024
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Tratamiento de Aguas Residuales</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Reciclaje de Residuos Sólidos</span>
                      <span className="text-sm text-gray-600">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Reforestación Urbana</span>
                      <span className="text-sm text-gray-600">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Educación Ambiental</span>
                      <span className="text-sm text-gray-600">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  Proyectos en Ejecución
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-green-800">Plan Mantaro Limpio</h4>
                    <p className="text-sm text-gray-600">Inversión: S/ 2.8 millones</p>
                    <p className="text-sm text-gray-600">Avance: 78%</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-blue-800">Conservación Laguna de Paca</h4>
                    <p className="text-sm text-gray-600">Inversión: S/ 1.5 millones</p>
                    <p className="text-sm text-gray-600">Avance: 65%</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-800">Mercado Verde</h4>
                    <p className="text-sm text-gray-600">Inversión: S/ 850,000</p>
                    <p className="text-sm text-gray-600">Avance: 92%</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-800">Parques Ecológicos</h4>
                    <p className="text-sm text-gray-600">Inversión: S/ 1.2 millones</p>
                    <p className="text-sm text-gray-600">Avance: 45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            ¡Jauja Verde es Responsabilidad de Todos!
          </h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Desde la primera capital del Perú, construimos un legado ambiental para las futuras generaciones. 
            Tu participación hace la diferencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Contactar Municipalidad
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="mr-2 h-5 w-5" />
              Reportar Problema Ambiental
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Oficina Principal</h4>
              <p className="text-sm opacity-90">Jr. Grau 280, Jauja</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Teléfono</h4>
              <p className="text-sm opacity-90">(064) 362-042</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Horario</h4>
              <p className="text-sm opacity-90">Lun - Vie: 8:00 - 17:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MPJ</span>
                </div>
                <span className="text-lg font-bold">Municipalidad Provincial de Jauja</span>
              </div>
              <p className="text-gray-400 text-sm">
                Trabajando por un Jauja más verde y sostenible desde 1534.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Servicios Ambientales</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Gestión de Residuos</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Tratamiento de Aguas</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Áreas Verdes</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Educación Ambiental</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Proyectos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Plan Mantaro Limpio</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Laguna de Paca</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Mercado Verde</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Parques Ecológicos</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Jr. Grau 280, Jauja - Junín</li>
                <li>(064) 362-042</li>
                <li>ambiente@munijauja.gob.pe</li>
                <li>www.munijauja.gob.pe</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 Municipalidad Provincial de Jauja. Todos los derechos reservados.</p>
            <p className="mt-1">Primera Capital del Perú • Patrimonio Cultural y Natural</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
