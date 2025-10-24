import { stripeClient } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../ui/buttons/Button";
import { cabinBold } from "../ui/fonts";

interface SuccessPageProps {
    searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const sessionId = searchParams.session_id;

    if (!sessionId) {
        redirect("/");
    }

    const session = await stripeClient.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product"],
    });

    const lineItems = session.line_items?.data ?? [];
    const total = (session.amount_total ?? 0) / 100;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className={`text-3xl font-bold mb-4 ${cabinBold.className}`}>
                Paiement réussi !
            </h1>

            <p className="text-lg mb-6">
                Merci {session.customer_details?.name}, votre commande a bien été
                enregistrée.
            </p>

            <div className="bg-slate-100 p-4 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2">Votre commande :</h2>

                <ul className="divide-y">
                    {lineItems.map((item: any) => (
                        <li key={item.id} className="py-2 flex justify-between">
                            <span>{item.description}</span>
                            <span>
                                {item.quantity} × {(item.price?.unit_amount ?? 0) / 100} €
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 text-right font-bold text-lg">
                    Total : {total.toFixed(2)} €
                </div>
            </div>

            <Link
                href="/"
                className="mt-4 w-full"          >
                <Button className="w-full">  Retour à l’accueil </Button>
            </Link>
        </main>
    );
}
