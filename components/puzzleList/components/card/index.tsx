import { type JSX, useMemo } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
  Link,
} from '@heroui/react'

import Options from '../options/index'

import { type IPuzzleItem } from '@/types/puzzle'

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
    <Card className="w-full cursor-default">
      <CardHeader className="flex justify-between">
        <Link
          className="text-lg font-semibold text-default-500 cursor-pointer"
          href={`/puzzle/${_id}/detail`}
        >
          {title}
        </Link>
        {!hideOptions && <Options puzzleId={_id} />}
      </CardHeader>
      <Divider />
      <CardBody className="w-full gap-2">
        <p>
          <span className="font-semibold">Número de preguntas:</span>&nbsp;
          {questionCount}
        </p>
        <p>
          <span className="font-semibold">Dificultad:</span>&nbsp;{difficult}
        </p>
        <p>
          <span className="font-semibold">Tamaño:</span>&nbsp;{cols}x{cols}
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="flex gap-5">{categoryItems}</CardFooter>
    </Card>
  )
}

export default PuzzleCard
