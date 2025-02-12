import Image from "next/image"
import { PlusIcon } from "@heroicons/react/24/solid"
import { MinusIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/solid"

interface CardPlantStoreProps {
    id: number
    title: string
    price: number
    quantity: number
    addOnePlant: (id: number) => void
    removeOnePlant: (id: number) => void
    removeAllPlants: (id: number) => void
}

export default function CardPlantStore({
    id,
    title,
    price,
    quantity,
    addOnePlant,
    removeOnePlant,
    removeAllPlants
}: CardPlantStoreProps) {

    const alt: string = `Photographie de la plante ${title}`
    const url = `/plants/${title.toLowerCase()}.png`

    const isDisable = quantity === 1

    const iconeDisable = isDisable ? "var(--dark2)" : "var(--dark)"
    const hoverDisable = isDisable ? "p-1 cursor-default" : "hover:bg-slate-100 p-1 rounded-sm duration-300 transition pointer"

    return (
        <div className="flex justify-between gap-2 items-center">
            <div className="flex gap-4">
                <Image
                    src={url}
                    alt={alt}
                    className="rounded-md"
                    width={63}
                    height={63}
                />
                <div>
                    <h3 className="text-ellipsis">{title}</h3>
                    <p className="font-">{price}€</p>
                </div>
            </div>
            <div className="flex gap-3 items-center ring-1 ring-slate-200 p-1 h-[63px] rounded-lg">
                <button
                    className={hoverDisable}
                    onClick={() => {
                        if (!isDisable) removeOnePlant(id);
                    }}
                >
                    <MinusIcon width={18} color={iconeDisable} />
                </button>
                <p>
                    {quantity}
                </p>

                <button
                    className="hover:bg-slate-100 p-1 rounded-sm duration-300 transition"
                    onClick={() => addOnePlant(id)}
                >
                    <PlusIcon width={18} color="var(--dark)" />
                </button>
            </div>
            <button
                className="hover:bg-slate-100 p-1 rounded-sm duration-300 transition"
                onClick={() => removeAllPlants(id)}
            >
                <TrashIcon width={18} color="var(--red)" />
            </button>
        </div>
    )
}