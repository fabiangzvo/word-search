import { type JSX, useMemo } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Link,
} from '@heroui/react'
import { List, Component, Grid2X2 } from 'lucide-react'

import { DifficultEnum, type IPuzzleItem } from '@/types/puzzle'

import Options from '../options/index'

interface PuzzleCardProps extends IPuzzleItem {
  hideOptions?: boolean
}

function PuzzleCard(props: PuzzleCardProps): JSX.Element {
  const {
    title,
    categories,
    cols,
    difficult,
    questionCount,
    _id,
    hideOptions,
  } = props

  const categoryItems = useMemo(
    () =>
      categories.map((category) => (
        <Chip key={category._id} color="primary" variant="flat">
          <p className="font-semibold">{category.name}</p>
        </Chip>
      )),

    [categories]
  )

  return (
    <Card className="w-full cursor-default px-2">
      <CardHeader className="flex justify-between pb-0">
        <Link
          className="text-lg font-semibold text-default-500 cursor-pointer"
          href={`/puzzle/${_id}/detail`}
        >
          {title}
        </Link>
        {!hideOptions && <Options puzzleId={_id} />}
      </CardHeader>
      <CardBody className="w-full pt-2">
        <p className="mb-2 text-sm text-foreground-600">
          Esta es la descripción de la sopa de letras
        </p>
        <div className="gap-4 grid grid-cols-2">
          <p className="flex gap-4">
            <List className="text-default-500" />
            {questionCount} Palabras
          </p>
          <p className="flex gap-4">
            <Component className="text-default-500" />
            {DifficultEnum[difficult as keyof typeof DifficultEnum]}
          </p>
          <p className="flex gap-4">
            <Grid2X2 className="text-default-500" />
            {cols}x{cols}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex gap-2">{categoryItems}</CardFooter>
    </Card>
  )
}

export default PuzzleCard
