import Image from "next/image"
import { cabinRegular, cormorant } from "./fonts"

export default function Heading({ title }: { title: string }) {
  return (
    <header className="bg-slate-200 h-64 md:h-110 flex justify-center items-center pt-16">
      <div>
        <h1 className={`text-4xl sm:text-4xl md:text-7xl text-center`}>{title}</h1>
      </div>
    </header>
  )
}