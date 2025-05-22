import { type JSX } from 'react'
import { Kbd } from '@heroui/kbd'
import { Input, InputProps } from '@heroui/input'
import { SearchIcon } from 'lucide-react'

interface SearchInputProps {
  variant?: InputProps['variant']
}

function SearchInput({ variant }: SearchInputProps): JSX.Element {
  return (
    <Input
      variant={variant}
      aria-label="Search"
      classNames={{
        inputWrapper:
          !variant &&
          'bg-default-100 dark:bg-opacity-10 hover:bg-opacity-20 dark:group-data-[focus=true]:bg-opacity-10 dark:group-data-[hover=true]:bg-opacity-30',
        input: 'text-sm',
      }}
      endContent={<Kbd className="hidden lg:inline-block dark:bg-default-500 dark:bg-opacity-20 dark:text-default-500" keys={['enter']} />}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  )
}

export default SearchInput
