const constants: Record<string, any> = {}

constants.animationFromLeft = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 10, opacity: 0 },
}

constants.animationFromRight = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -10, opacity: 0 },
}

constants.initialAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

constants.tabItems = [
  { title: 'Información esencial', key: 'main' },
  { title: 'Modificar información', key: 'edit' },
  { title: 'Finalizar creación', key: 'confirm' },
]

export { constants }
