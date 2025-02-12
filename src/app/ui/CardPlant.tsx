import Button from "./Button"
import Image from "next/image"

interface CardPlantProps {
    title: string
    price: number
    quantity: number
    handleClick: () => void
}

export default function CardPlant({ title, price, quantity, handleClick }: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`

    return (
        <div className="ring-1 ring-green p-2 bg-white rounded-lg flex flex-col gap-4  h-fit">
            <Image
                src={url}
                alt={alt}
                className="rounded-md w-full"
                width={212}
                height={209}
            />
            <h2 className="text-ellipsis">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
                <p>{quantity} </p>
            </div>
            <Button text="Ajouter au panier" handleClick={handleClick} />
        </div>
    )
}