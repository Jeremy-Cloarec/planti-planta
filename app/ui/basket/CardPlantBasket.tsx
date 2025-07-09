import Image from "next/image";
import {formatedUrl} from "@/app/utils/utils";
import {cabinBold, cormorant} from "@/app/ui/fonts";
import ButtonDeleteToBasket from "@/app/ui/buttons/ButtonDeleteToBasket";
import {PlantInBasket} from "@/app/lib/definitions";
import {usePlantsBasketDispatch} from "@/app/context/PlantsBasketContext";


export default function CardPlantBasket({plantsInBasket}: { plantsInBasket: PlantInBasket[] }) {
    const dispatch = usePlantsBasketDispatch()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const value = parseInt(e.target.value, 10)
        if (!isNaN(value) && value > 0) {
            dispatch({type: 'updateQuantity', id, quantity: value})
        }
    }
    return (
        <ul className="flex flex-col gap-4 px-3 md:px4
                        md:flex-3 md:px-0 md:gap-6">
            {plantsInBasket.map(plant => (
                <li
                    key={plant.id}
                    className="flex gap-2"
                >
                    <Image
                        alt="Miniature"
                        width={130}
                        height={165}
                        src={`/plants/${formatedUrl(plant.title)}.png`}
                        className="flex-2 object-contain"
                    />
                    <div className="flex-3 flex flex-col gap-2">
                        <h2 className={`${cormorant.className} text-xl`}>{plant.title}</h2>
                        <p className={`${cabinBold.className}`}>{Number(plant.price)} €</p>
                        <p className="text-sm">{plant.legend}</p>
                        <div className={"flex gap-1 w-full items-center"}>
                            <button onClick={() => dispatch({type: "decrement", id: plant.id})}
                                    className="transition duration-300 w-6 h-6 hover:bg-slate-200 rounded-md"
                                    aria-label={`Diminuer la quantité de ${plant.title}`}
                            >−
                            </button>
                            <input
                                type="number"
                                value={plant.basketQuantity}
                                onChange={(e) => handleChange(e, plant.id)}
                                min={1}
                                className="w-12 text-center border"
                            />
                            <button onClick={() => dispatch({type: "increment", id: plant.id})}
                                    className="transition duration-300 w-6 h-6 hover:bg-slate-200 rounded-md"
                                    aria-label={`Augmenter la quantité de ${plant.title}`}
                            >+
                            </button>
                        </div>
                        <ButtonDeleteToBasket
                            text="Supprimer"
                            plantId={plant.id}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}