import Image from "next/image"
import { PlusIcon } from "@heroicons/react/24/solid"
import { MinusIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Plant } from "../lib/definitions"

interface CardPlantStoreProps {
    plant: Plant
    addOnePlant: (id: number) => void
    removeOnePlant: (id: number) => void
    removeAllPlants: (id: number) => void
    isPlantOutOfStock: boolean
}

export default function CardPlantStore({
    plant,
    addOnePlant,
    removeOnePlant,
    removeAllPlants,
    isPlantOutOfStock,
}: CardPlantStoreProps) {

    const alt: string = `Photographie de la plante ${plant.title}`
    const url = `/plants/${plant.title.toLowerCase()}.png`

    const isDisable = plant.quantity === 1

    const iconeMinusDisable = isDisable ? "var(--dark2)" : "var(--dark)"
    const hoverMinusDisable = isDisable ? "p-1 cursor-default" : "hover:bg-slate-100 p-1 rounded-lg duration-300 transition pointer"

    const iconePlusDisable = isPlantOutOfStock ? "var(--dark2)" : "var(--dark)"
    const hoverPlusDisable = isPlantOutOfStock ? "p-1 cursor-default" : "hover:bg-slate-100 p-1 rounded-lg duration-300 transition pointer"

    return (
        <div className="flex justify-between gap-2">
            <div className="flex gap-4 items-center">
                <Image
                    src={url}
                    alt={alt}
                    className="rounded-2xl h-fit"
                    width={63}
                    height={63}
                />
                <div className="w-[110px] md:w-[198px]">
                    <h3 className="text-ellipsis overflow-hidden">{plant.title}</h3>
                    <p className="font-">{plant.price}€</p>
                </div>
                <div className="relative">
                    <div className="ring-1 ring-slate-200 p-1 h-[63px] rounded-2xl flex gap-3 items-center w-fit">
                        <button
                            className={hoverMinusDisable}
                            onClick={() => {
                                if (!isDisable) removeOnePlant(plant.id);
                            }}
                        >
                            <MinusIcon width={18} color={iconeMinusDisable} />
                        </button>
                        <p>
                            {plant.quantity}
                        </p>
                        <button
                            className={hoverPlusDisable}
                            onClick={() => addOnePlant(plant.id)}
                        >
                            <PlusIcon width={18} color={iconePlusDisable} />
                        </button>

                    </div>
                    {isPlantOutOfStock && <p className="absolute top-11 text-xs w-full text-center text-green">Plus de stock !</p>}
                </div>
            </div>
            <button
                className=" p-1 rounded-sm duration-300 transition group"
                onClick={() => removeAllPlants(plant.id)}
            >
                <TrashIcon width={26} color="var(--red)" className="transition-all duration-300 p-1 group-hover:bg-slate-100 rounded-lg" />
            </button>
        </div>
    )
}