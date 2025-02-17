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

    const imgIsStock = !isPlantOutOfStock ? "rounded-md w-full" : "rounded-md w-full opacity-50"

    return (
        <div className="ring-1 ring-green p-2 bg-white rounded-lg flex flex-col gap-4  h-fit">
            <div className="relative bg-white flex items-center">
                {isPlantOutOfStock && <p className="text-black z-10 absolute text-center w-full">Plus de stock !</p>}
                <Image
                    src={url}
                    alt={alt}
                    className={imgIsStock}
                    width={212}
                    height={209}
                />
            </div>
            <h2 className="text-ellipsis">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
                {notMuchPlant && <p className="text-green text-xs">Plus que {quantity} en stock</p>}
            </div>
            {!isPlantOutOfStock ?
                (<Button text="Ajouter au panier" handleClick={handleClick} />)
                :
                (<ButtonNoStock text="Bientôt de retour !" />)}

        </div>
    )
}