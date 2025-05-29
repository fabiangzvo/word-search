import { Fragment, type JSX } from 'react'

import PuzzleAction from '@components/puzzleAction'
import Footer from '@components/footer'

import { NOT_FOUND_PUZZLE, NOT_FOUND_DEFAULT_PUZZLE } from './constants'

function NotFound(): JSX.Element {
  return (
    <Fragment>
      <PuzzleAction
        actionLink="/"
        buttonLink="/explore"
        description='Parece que la página que buscas se ha perdido en nuestra sopa de letras. Encuentra la palabra "regresar" para volver a la página principal.'
        foundCells={NOT_FOUND_DEFAULT_PUZZLE}
        gradientText="¡Palabra no "
        puzzle={NOT_FOUND_PUZZLE}
        text="encontrada!"
        word="regresar"
      />
      <Footer />
    </Fragment>
  )
}

export default NotFound
