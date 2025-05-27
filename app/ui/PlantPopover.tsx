import Image from "next/image"
import { Plant } from "../lib/definitions"
import { formatedUrl } from "../utils/utils"
import { useEffect, useRef } from "react"

interface PlantPopoverProps {
    index: number
    plants: Plant[]
    setIndex: (index: number) => void
}

export default function PlantPopover(
    {
        index,
        plants,
        setIndex,
    }: PlantPopoverProps) {

    const prevImage = (index: number) => {
        if (index === 0) {
            setIndex(plants.length - 1)
            return
        }
        setIndex(index - 1)
    }

    const nextImage = (index: number) => {
        if (index === plants.length - 1) {
            setIndex(0)
            return
        }
        setIndex(index + 1)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                prevImage(index)
            } else if (event.key === "ArrowRight") {
                nextImage(index)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [index])

    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.changedTouches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.changedTouches[0].clientX
        handleSwipeGesture()
    }

    const handleSwipeGesture = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const distance = touchStartX.current - touchEndX.current
            const threshold = 50 // px minimum pour considérer un swipe

            if (distance > threshold) {
                nextImage(index) // swipe gauche → image suivante
            } else if (distance < -threshold) {
                prevImage(index) // swipe droite → image précédente
            }

            // Reset
            touchStartX.current = null
            touchEndX.current = null
        }
    }

    return (
        <div
            id="popover_plant"
            popover="auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex flex-col w-full">
                <div className="flex flex-col justify-center h-dvh max-h-dvh w-full gap-4">
                    <div className="h-[85%] w-full relative">
                        <button
                            popoverTarget="popover_plant"
                            popoverTargetAction="hide"
                            className="absolute top-3 right-3 bg-white rounded-full p-2"
                        >
                            <Image src={'/close.svg'} width={12} height={12} alt="Svg de croix pour le bouton fermer la popoveR" />
                        </button>
                        <Image
                            src={`/plants/${formatedUrl(plants[index].title)}.png`}
                            width={300}
                            height={500}
                            alt={`Image en grs plan du dessin ${plants[index].title}`}
                            className="object-contain h-full w-full"
                        />
                    </div>
                    <div className="flex justify-center items-center gap-6">
                        <button onClick={() => prevImage(index)}>
                            <Image src={'/prev.svg'} width={35} height={35} alt="Icone bouton précédent" />
                        </button>
                        <button onClick={() => nextImage(index)}>
                            <Image src={'/next.svg'} width={35} height={35} alt="Icone bouton suivant" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}