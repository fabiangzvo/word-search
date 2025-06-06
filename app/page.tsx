import { Fragment } from 'react'
import { Star, Users, Brain, Trophy, ChevronRight, Compass } from 'lucide-react'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'

import PuzzleAction from '@components/puzzleAction'
import FeatureList from '@components/home/components/featureList'
import StepList from '@components/home/components/stepList'
import Footer from '@components/footer'

import { PLAY_DEFAULT_PUZZLE, PLAY_PUZZLE } from './constants'

export default function LandingPage() {
  return (
    <Fragment>
      <div className="min-h-screen max-sm:mb-[85vh] sm:mb-[80vh] md:mb-[75vh] 2xl:mb-[80vh]">
        <PuzzleAction
          actionLink="/explore"
          buttonLink="/sign-up"
          description="Compite en tiempo real, invita a tus amigos y desafía la IA para crear tus propias sopas de letras. Encuentra la palabra 'Jugar' para ingresar a la app."
          foundCells={PLAY_DEFAULT_PUZZLE}
          gradientText="Descubre el desafío definitivo"
          puzzle={PLAY_PUZZLE}
          text="en sopas de letras"
          word="jugar"
        />
        {/* Features Section */}
        <section className="py-24 px-6 md:mt-24" id="features">
          <div className="max-w-6xl mx-auto">
            <h2 className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
              Características&nbsp;
              <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
                principales
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto text-center">
              Hemos reimaginado completamente la experiencia de las sopas de
              letras con tecnología de vanguardia.
            </p>
            <FeatureList
              features={[
                {
                  title: 'Multijugador en Tiempo Real',
                  description:
                    'Juega con amigos y compite contra jugadores de todo el mundo. Conecta hasta 8 jugadores simultáneos',
                  icon: <Users />,
                },
                {
                  title: 'Impulsada por IA',
                  description:
                    'Olvidate del trabajo tedioso, deja que nuestra inteligencia artificial cree la sopa de letras por ti.',
                  icon: <Brain />,
                },
                {
                  title: 'Clasificaciones Globales',
                  description:
                    'Mantente al tanto de las clasificaciones globales y compite con amigos en cualquier momento.',
                  icon: <Trophy />,
                },
                {
                  title: 'Diferentes Niveles',
                  description:
                    'Elige el nivel. Nosotros hacemos la magia. Sopas de letras fáciles, medias o difíciles con solo un clic.',
                  icon: <Star />,
                },
              ]}
            />
          </div>
        </section>
        {/* how to work Section */}
        <section className="py-24 px-6 md:mt-24" id="how-it-works">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Cómo&nbsp;
              <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
                funciona
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto text-center">
              Cuatro simples pasos para comenzar tu aventura.
            </p>
            <StepList
              steps={[
                {
                  step: 1,
                  title: 'Crea tu cuenta',
                  description:
                    'Regístrate gratis en segundos ó ingresa a tu cuenta.',
                },
                {
                  step: 3,
                  title: 'Elige tu reto',
                  description:
                    'Explora y elige la sopa de letras que más te guste... o crea una nueva al instante.',
                },
                {
                  step: 3,
                  title: 'Elige tu modo',
                  description:
                    'Juega en solitario o espera a que tus amigos ú otros jugadores se unan a la partida.',
                },
                {
                  step: 4,
                  title: '¡Juega y gana!',
                  description:
                    'Encuentra palabras, gana puntos y sube en las clasificaciones.',
                },
              ]}
            />
          </div>
        </section>
        {/* CTA section */}
        <section className="w-full py-24 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 dark:to-default-900 dark:via-default-600 absolute left-0 mt-36 text-white px-6">
          <p className="w-full text-3xl md:text-4xl font-bold text-center mb-6 max-lg:flex max-lg:flex-wrap max-lg:justify-center">
            ¿Listo para el desafío?
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-center">
            Únete a miles de jugadores y descubre por qué MindGrid es el futuro
            de las sopas de letras.
          </p>
          <div className="flex justify-center gap-4 max-md:flex-col max-md:px-8">
            <Button
              as={Link}
              className="dark:bg-primary-900"
              color="primary"
              href="/explore"
              size="lg"
            >
              Explorar
              <Compass />
            </Button>
            <Button
              as={Link}
              className="dark:bg-primary-900"
              color="primary"
              href="/sign-up"
              size="lg"
            >
              Comenzar ahora
              <ChevronRight />
            </Button>
          </div>
        </section>
        {/* Pricing Section
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
      */}
      </div>
      <Footer classname="mt-32" />
    </Fragment>
  )
}
