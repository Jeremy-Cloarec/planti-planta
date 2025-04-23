import Button from "./Button"
import Image from "next/image"
import ButtonNoStock from "./ButtonNoStock"

interface CardPlantProps {
    title: string
    price: number
    quantity: number
    handleClick?: () => void
    isPlantOutOfStock?: boolean
    notMuchPlant?: boolean
    id:number
}

export default function CardPlant({ title, price, quantity, handleClick, isPlantOutOfStock, notMuchPlant, id }: CardPlantProps) {
    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`

    const imgIsStock = !isPlantOutOfStock ? "rounded-2xl w-full" : "rounded-2xl w-full opacity-50"

    return (
        <div className="ring-1 ring-green p-3 bg-white rounded-3xl flex flex-col gap-4 h-full justify-between">
            <div className="relative bg-white flex items-center">
                {isPlantOutOfStock && <p className="text-black z-10 absolute text-center w-full">Victime de son succès 🦋</p>}
                <Image
                    src={url}
                    alt={alt}
                    className={imgIsStock}
                    width={212}
                    height={209}
                />
            </div>
            <h2 className="text-ellipsis overflow-hidden">{title}</h2>
            <div className="flex items-center justify-between">
                <p>{price}€</p>
                {notMuchPlant && <p className="text-green text-xs">Plus que {quantity} en stock</p>}
            </div>
            {!isPlantOutOfStock ?
                (<Button text="Ajouter au panier" id={id}/>)
                :
                (<ButtonNoStock text="Bientôt de retour !" />)}
        </div>
    )
}