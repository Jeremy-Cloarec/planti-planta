import { cabinRegular } from "./fonts"

export default function Heading({ title }: { title: string }) {
  return (
    <header className="bg-[url(/hero.png)]  h-80 md:h-130 flex justify-center items-center pt-16 md:pt-0" >
      <div>
        <h1 className={`${cabinRegular.className} text-4xl sm:text-4xl md:text-7xl text-center`}>{title}</h1>
      </div>
    </header>
  )
}