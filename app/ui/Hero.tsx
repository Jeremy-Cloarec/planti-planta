import Image from "next/image"
import { cabinRegular, cormorant } from "./fonts"

export default function Heading({ title }: { title: string }) {
  return (
    <header className="relative bg-linear-to-t from-[#B5E888] to-[#F6FFEE] h-dvh grid grid-cols-2 gap-1 overflow-hidden">
      {/* 1 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="scale-125 -translate-x-8 translate-y-28 w-full rotate-45
        
        sm:scale-90 sm:-translate-x-[80px] sm:translate-y-12
        
        md:scale-100 md:w-96 md:-translate-x-[110px] md:translate-y-3
        "
      />
      {/* 2 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="w-full scale-125 translate-x-8 translate-y-[160px] scale-y-[-1] -rotate-230
        
        sm:scale-90 sm:scale-y-[-1] sm:translate-x-20 sm:translate-y-0 sm:justify-self-end

        md:scale-100 md:scale-y-[-1] md:translate-x-28 md:w-96 
        "
      />
      {/* 3 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="scale-125 -translate-x-16 translate-y-[200px] w-full rotate-45
        
        sm:scale-90 sm:-translate-x-[80px] sm:translate-y-[90px]

        md:scale-100 md:w-96 md:-translate-x-[120px]
        "
      />
      {/* 4 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="opacity-0
        md:justify-self-end 
        md:scale-y-[-1] md:opacity-100 md:w-96 md:translate-x-[150px] md:translate-y-0 w-full rotate-130  
        "
      />
      {/* 5 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="scale-125 -translate-x-8 translate-y-[150px] w-full -rotate-12

        sm:scale-90 sm:-translate-x-[80px]
        md:scale-100 md:w-96 
        "
      />
      {/* 6 */}
      <Image
        src='/leaf.svg'
        width={200}
        height={50}
        alt="Dessin d'une feuille en svg"
        className="rotate-180 w-full scale-y-[-1] object-cover scale-125 translate-x-8 translate-y-5

        sm:scale-y-[-1] sm:scale-90 sm:translate-x-24 sm:justify-self-end 

        md:scale-y-[-1] md:scale-100 md:w-96  md:translate-x-28 md:translate-y-[100px]
        "
      />
      <div className="w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 flex flex-col gap-4 items-center">
        <h1 className={`${cormorant.className} text-5xl sm:text-6xl md:text-8xl`}>{title}</h1>
        <p className={`${cabinRegular.className} text-xl text-violet w-fit py-2 px-5 rounded-2xl bg-white/30 backdrop-blur-xs 
        md:text-3xl lg:text-5xl`}>
          Découvrez nos dessins de plantes dansantes
        </p>
      </div>
      <Image src={"/arrowBottom.svg"} width={28} height={28} alt="Icone fleche vers le bas" className="z-10 absolute bottom-4 left-1/2 -translate-x-1/2" />
    </header>
  )
}