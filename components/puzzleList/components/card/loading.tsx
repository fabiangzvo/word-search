'use client'

import type { JSX, Ref } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Skeleton } from '@heroui/react'

export function LoadingCard({
  loaderRef,
}: {
  loaderRef: Ref<HTMLDivElement>
}): JSX.Element {
  return (
    <Card ref={loaderRef} className="w-full cursor-default px-2">
      <CardHeader className="flex justify-between pb-0 mt-1">
        <Skeleton className="w-4/5 rounded-lg bg-default-500/5 after:bg-default-300/5 dark:after:bg-default-300/5 dark:bg-default-300/5 before:via-default-500/10 dark:before:via-default-500/10">
          <div className="h-7" />
        </Skeleton>
      </CardHeader>
      <CardBody className="w-full">
        <Skeleton className="w-full rounded-lg bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
          <div className="h-10 rounded-lg " />
        </Skeleton>
        <div className="gap-4 grid grid-cols-2 pt-4">
          <div className="flex gap-3">
            <Skeleton className="w-1/4 rounded-md bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-1/4 rounded-md bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
          </div>
          <div className="flex gap-3">
            <Skeleton className="w-1/4 rounded-lg bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
              <div className="h-7" />
            </Skeleton>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex gap-2">
        <Skeleton className="w-1/3 rounded-xl bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
          <div className="h-7" />
        </Skeleton>
        <Skeleton className="w-1/3 rounded-xl bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
          <div className="h-7" />
        </Skeleton>
        <Skeleton className="w-1/3 rounded-xl bg-default-500/5 dark:bg-default-300/5 before:via-default-300/10">
          <div className="h-7" />
        </Skeleton>
      </CardFooter>
    </Card>
  )
}
