import Image from "next/image";
import {formatedUrl} from "@/app/utils/utils";
import {cabinBold, cormorant} from "@/app/ui/fonts";
import ButtonDeleteToBasket from "@/app/ui/buttons/ButtonDeleteToBasket";
import {Plant} from "@/app/lib/definitions";

export default function CardPlantBasket({ plantsInBasket}: { plantsInBasket: Plant[] }) {
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
                        className="flex-2"
                    />
                    <div className="flex-3 flex flex-col gap-2">
                        <h2 className={`${cormorant.className} text-xl`}>{plant.title}</h2>
                        <p className={`${cabinBold.className}`}>{plant.price} €</p>
                        <p className="text-sm">{plant.legend}</p>
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