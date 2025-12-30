import Nav from "../ui/nav/Nav";
import Footer from "../ui/Footer";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cormorant } from "@/app/ui/fonts";
import { fetchOrders } from "../actions/orders.action";
import { Order } from "../lib/definitions";
import OrdersItems from "../ui/nav/OrdersItems";

export default async function Commandes() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/sign-in");
    };

    const orders: Order[] = await fetchOrders(session.user.id)
    console.log(orders);
    

    return (
        <>
            <Nav />
            <header className="px-3 mt-[72px] w-full py-6 flex items-center max-w-[768px]">
                <h1 className={`${cormorant.className} text-3xl`}>Mes commandes</h1>
            </header>
            <main className="w-full flex-1 max-w-[768px]">
                <OrdersItems orders={orders}/>
            </main>
            <Footer />
        </>
    )
}
