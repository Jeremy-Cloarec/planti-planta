"use client"
import { createContext } from "react"
import { Plant } from "app/lib/definitions"

interface PlantContextTypes {
    plants: Plant[]
    setPlants: (plants: Plant[]) => void
}

export const PlantsContext = createContext<PlantContextTypes>({
    plants: [],
    setPlants: () => { }
})


