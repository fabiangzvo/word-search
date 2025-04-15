import { type JSX } from 'react'
import { Kbd } from '@heroui/kbd'
import { Input } from '@heroui/input'
import { SearchIcon } from 'lucide-react'

function SearchInput(): JSX.Element {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper:
          'bg-default-100 dark:bg-opacity-10 hover:bg-opacity-20 dark:focus:bg-opacity-30',
        input: 'text-sm',
      }}
      endContent={<Kbd className="hidden lg:inline-block" keys={['enter']} />}
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
