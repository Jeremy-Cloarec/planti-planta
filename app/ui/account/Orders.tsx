import {cabinBold} from "@/app/ui/fonts";

export default function Orders() {
    return (
        <section>
            <h2 className={`${cabinBold.className}`}>Mes commande</h2>
            <p>Vous n&apos; avez pas encore de commandes</p>
        </section>
    )
}