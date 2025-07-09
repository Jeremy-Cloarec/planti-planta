import {createContext, Dispatch, useContext, useReducer} from 'react';
import {Plant, PlantsAction} from "@/app/lib/definitions";

const PlantsBasketContext = createContext<Plant[]>([]);
const PlantsBasketDispatchContext = createContext<Dispatch<PlantsAction> | undefined>(undefined);

export function PlantsBasketProvider({children}: { children: React.ReactNode }) {
    const [plantsInBasket, dispatch] = useReducer(
        plantsBasketReducer,
        initialPlantsBasket
    )

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
    return useContext(PlantsBasketDispatchContext)
}

export function plantsBasketReducer(state: Plant[], action: PlantsAction) {
    switch (action.type) {
        case 'add':
            if (state.some(p => p.id === action.plant.id)) return state
            return [...state, action.plant];
        case 'remove':
            return state.filter(p => p.id !== action.id)
        case 'clear':
            return []
        default:
            return state;
    }
}

const initialPlantsBasket: Plant[] = []