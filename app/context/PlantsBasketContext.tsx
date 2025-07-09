import {createContext, Dispatch, useContext, useReducer, useEffect, ReactNode} from 'react';
import { PlantsAction, PlantInBasket} from "@/app/lib/definitions";

const PlantsBasketContext = createContext<PlantInBasket[]>([]);
const PlantsBasketDispatchContext = createContext<Dispatch<PlantsAction> | null>(null);

export function PlantsBasketProvider({children}: { children: ReactNode }) {
    const [plantsInBasket, dispatch] = useReducer(
        plantsBasketReducer,
        [],
        getInitialPlantsBasket
    )

    useEffect(() => {
        localStorage.setItem("plantsInBasket", JSON.stringify(plantsInBasket))
    }, [plantsInBasket])

    function getInitialPlantsBasket (): PlantInBasket[]  {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("plantsInBasket")
            if (stored) {
                try {
                    return JSON.parse(stored)
                } catch (e) {
                    console.error("Erreur parsing localStorage:", e)
                    return []
                }
            }
        }
        return []
    }

    return (
        <PlantsBasketContext.Provider value={plantsInBasket}>
            <PlantsBasketDispatchContext.Provider value={dispatch}>
                {children}
            </PlantsBasketDispatchContext.Provider>
        </PlantsBasketContext.Provider>
    )
}

export function usePlantsBasket() {
    return useContext(PlantsBasketContext)
}

export function usePlantsBasketDispatch() {
    const context = useContext(PlantsBasketDispatchContext);
    if (context === null) {
        throw new Error("usePlantsBasketDispatch doit être utilisé à l'intérieur de PlantsBasketProvider");
    }
    return context;
}

export function plantsBasketReducer(state: PlantInBasket[], action: PlantsAction) {
    switch (action.type) {
        case 'add':
            const existing = state.find(p => p.id === action.plant.id)

            const unitPrice = Number(action.plant.price)

            if (existing) {
                return state.map(p =>
                    p.id === action.plant.id
                        ? {
                            ...p,
                            basketQuantity: p.basketQuantity + 1,
                            price: (p.basketQuantity + 1) * p.unitPrice
                        }
                        : p
                )
            }

            return [
                ...state,
                {
                    ...action.plant,
                    basketQuantity: 1,
                    unitPrice,
                    price: unitPrice
                }
            ]

        case 'remove':
            return state.filter(p => p.id !== action.id)
        case 'increment':
            return state.map(p => {
                    return p.id === action.id ? {
                        ...p,
                        basketQuantity: Number(p.basketQuantity) + 1,
                        price: (p.basketQuantity + 1) * p.unitPrice
                    } : p
                }
            )
        case 'decrement':
            return state
                .map(p =>
                    p.id === action.id
                        ? {
                            ...p,
                            basketQuantity: Math.max(1, p.basketQuantity - 1),
                            price: Math.max(1, p.basketQuantity - 1) * p.unitPrice
                        }
                        : p
                )
                .filter(p => p.basketQuantity > 0)
        case 'updateQuantity':
            return state.map(p =>
                p.id === action.id
                    ? {
                        ...p,
                        basketQuantity: action.quantity,
                        price: action.quantity * p.unitPrice
                    }
                    : p
            )
        case 'clear':
            return []
        default:
            return state;
    }
}