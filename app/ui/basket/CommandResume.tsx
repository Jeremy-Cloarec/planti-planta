import {cabinBold} from "@/app/ui/fonts";
import ButtonOrder from "@/app/ui/buttons/ButtonOrder";

export default function CommandResume({totalPrice}: { totalPrice: number }) {
    return (
        <div className="relative bg-slate-100 px-3 md:px-4 pt-3 pb-16 flex flex-col gap-3
                        md:flex-2 md:sticky md:top-[72px] md:p-3">
            <h2>Récapitulatif de la commande</h2>
            <div className="flex items-center justify-between text-dark2">
                <p>Sous total</p>
                <p>{totalPrice - (totalPrice * 0.20)} €</p>
            </div>
            <div className="flex items-center justify-between text-dark2">
                <p>Taxes</p>
                <p>{totalPrice * 0.20} €</p>
            </div>
            <div className="flex items-center justify-between text-dark2">
                <p>Frais de livraison</p>
                <p className="text-lime-600">Gratuit</p>
            </div>
            <div
                className={`flex items-center justify-between py-3 ${cabinBold.className}  border-t border-y-slate-400`}>
                <p>TOTAL</p>
                <p> {totalPrice} €</p>
            </div>
            <div className="p-3 fixed bottom-0 left-0 w-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]
                            md:relative md:p-0 md:shadow-none
                            ">
                <ButtonOrder
                    text="Passer la commande"
                />
            </div>
        </div>
    )
}