import Button from "./Button"
import Image from "next/image"
import ButtonNoStock from "./ButtonNoStock"

interface CardPlantProps {
    title: string
    price: number
    quantity: number
    handleClick: () => void
    isPlantOutOfStock: boolean
    notMuchPlant: boolean
}

export default function CardPlant({ title, price, quantity, handleClick, isPlantOutOfStock, notMuchPlant }: CardPlantProps) {
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
                {notMuchPlant &&  <p className="text-green text-xs">Plus que {quantity} en stock</p>}
            </div>
            {!isPlantOutOfStock ?
                (<Button text="Ajouter au panier" handleClick={handleClick} />)
                :
                (<ButtonNoStock text="Le stock est épuisé"/>)}

        </div>
    )
}