import { Plant } from "../lib/definitions"

type State = {
    storePlants: Plant[]
    plants: Plant[]
}

type Action =
    | { type: "addOnePlant"; id: number; operation: (qantity: number) => number }
    | { type: "removeOnePlant"; id: number; operation: (quantity: number) => number }
    | { type: "removeAllPlants"; id: number }
    | { type: "updateStock"; id: number; operation: (quantity: number) => number }


export default function plantsReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'addOnePlant': {
            return {
                ...state,
                storePlants: state.storePlants.map((p: Plant) => {
                    if (p.id !== action.id) return p
                    const unitPrice = p.price / p.quantity
                    return {
                        ...p,
                        quantity: p.quantity + 1,
                        price: p.price + unitPrice
                    }
                })
            }
        }
        case 'removeOnePlant': {
            return {
                ...state,
                storePlants: state.storePlants.map((p: Plant) => {
                    if (p.id !== action.id) return p
                    const unitPrice = p.price / p.quantity
                    return {
                        ...p,
                        quantity: p.quantity - 1,
                        price: p.price - unitPrice
                    }
                })
            }
        }
        case 'removeAllPlants': {
            return {
                ...state,
                storePlants: state.storePlants.filter((p: Plant) => p.id !== action.id)
            }
        }

        case 'updateStock': {
            return {
                ...state,
                plants: state.plants.map((p: Plant) => {
                    if (p.id !== action.id) return p
                    return {
                        ...p,
                        quantity: action.operation(p.quantity)
                    }
                })
            }
        }
        default:
            return state
    }
}