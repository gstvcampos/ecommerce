import { SearchIcon } from '@/components/icons/SearchIcon'
import { cn } from '@/lib/ultis'
import { redirect } from 'next/navigation'

async function searchProducts(formData: FormData) {
  'use server'

  const search = formData.get('search')?.toString()

  if (search) {
    redirect('/busca/' + search)
  }
}

export default function SearchInput({ className }: { className?: string }) {
  return (
    <form
      action={searchProducts}
      className={cn('relative w-full max-w-3xl inline-block', className)}
    >
      <input
        type="text"
        id="floating_outlined"
        name="search"
        className="w-full border-[1px] px-3 focus:outline-none pb-2.5 pt-4 text-sm bg-transparent peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-primary-content"
      >
        Buscar
      </label>
      <button type="submit" className="absolute top-0 end-0 h-full p-2.5">
        <SearchIcon />
        <span className="sr-only">Search</span>
      </button>
    </form>
  )
}
