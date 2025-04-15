import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Star, Users, Brain, Trophy, ChevronRight } from 'lucide-react'
import RedirectButton from '@components/registerButton'
import SignUp from '@components/signUp'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400 dark:to-purple-600">
            ¡Descubre el desafío definitivo en sopas de letras!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Compite en tiempo real, invita a tus amigos y desafía la IA para
            crear tus propias palabras.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <RedirectButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Características Principales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-4">
              <CardBody className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Multijugador en Tiempo Real
                </h3>
                <p className="text-gray-600">
                  Juega con amigos y compite contra jugadores de todo el mundo
                </p>
              </CardBody>
            </Card>
            <Card className="p-4">
              <CardBody className="text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">IA Avanzada</h3>
                <p className="text-gray-600">
                  Sopas de letras personalizadas generadas por inteligencia
                  artificial
                </p>
              </CardBody>
            </Card>
            <Card className="p-4">
              <CardBody className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Clasificaciones Globales
                </h3>
                <p className="text-gray-600">
                  Compite por los primeros puestos en nuestras tablas de
                  clasificación
                </p>
              </CardBody>
            </Card>
            <Card className="p-4">
              <CardBody className="text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Niveles Progresivos
                </h3>
                <p className="text-gray-600">
                  Desbloquea nuevos desafíos y mejora tus habilidades
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6" id="pricing">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Planes Disponibles
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <CardHeader className="flex-col items-start pb-0">
                <h3 className="text-lg font-semibold">Gratis</h3>
                <p className="text-4xl font-bold mt-2">$0</p>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Acceso a juegos básicos
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Tablas de clasificación
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Juego multijugador limitado
                  </li>
                </ul>
                <Button className="w-full mt-6" color="primary">
                  Comenzar Gratis
                </Button>
              </CardBody>
            </Card>
            <Card className="p-6 border-primary">
              <CardHeader className="flex-col items-start pb-0">
                <h3 className="text-lg font-semibold">Premium</h3>
                <p className="text-4xl font-bold mt-2">$9.99</p>
                <span className="text-sm text-gray-600">/mes</span>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Acceso ilimitado a todos los juegos
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Generación de sopas personalizadas
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Modo multijugador sin límites
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="mr-2 text-primary" />
                    Sin publicidad
                  </li>
                </ul>
                <Button
                  className="w-full mt-6"
                  color="primary"
                  variant="shadow"
                >
                  Obtener Premium
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
      <SignUp />
    </div>
  )
}
