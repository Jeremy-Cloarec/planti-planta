import { Plant } from "@/app/lib/definitions";
import ButtonAddToBasket from "../buttons/ButtonAddToBasket";
import { cabinBold, cormorant } from "../fonts";

export default function InfosCardPlant({ plant }: { plant: Plant }) {
    return (
        <div className="flex items-center justify-between w-3/4 mx-auto  
        sm:min-w-40 sm:flex-col sm:w-auto sm:m-0 sm:justify-start sm:items-start">
            <div>
                <h2 className={`${cormorant.className} text-ellipsis overflow-hidden`}>{plant.title}</h2>
                <p className={`${cabinBold.className}`}>{plant.price}€</p>
            </div>
            <ButtonAddToBasket
                text="+ Ajouter"
                plant={plant}
            />
        </div>
    )
}