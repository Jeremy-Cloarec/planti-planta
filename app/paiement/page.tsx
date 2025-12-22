"use server"
import { cookies } from "next/headers";
import Payment from "../ui/payment/Payment";


export default async function PaymentPage() {
    const cookieStore = await cookies();
    const clientSecretCookie = cookieStore.get("secretClientStripe");

    if (!clientSecretCookie) return <p>Un problème est survenu dans la création de la session de paiement.</p>;

    const clientSecret = clientSecretCookie.value;
    console.log("client secret", clientSecret);

    return (
        <>
            <h1>Paiement</h1>
            <Payment clientSecret={clientSecret} />
        </>
    )
}