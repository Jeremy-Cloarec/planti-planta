import { Order } from "../../lib/definitions";

export default function OrdersItems({ orders }: { orders: Order[] }) {
    if (orders.length === 0) {
        return (
            <p className="px-3">Vous n&apos; avez pas encore de commandes</p>
        )
    }

    return (
        <ul className="px-3">
            {
                orders.map(order => (
                    <li key={order.stripe_session_id}>
                        <div>
                            Stripe session : {order.stripe_session_id}
                        </div>
                        <div>
                            Total : {order.amount_total/100} € 
                        </div>
                    </li>
                ))
            }
        </ul>
    )

}