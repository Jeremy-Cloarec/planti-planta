import { Plant } from "../lib/definitions"
import { plants } from "../lib/placeholder-data"

export const isNotInStock = (plants: Plant[], id: number, index: number) => {
    let isNotInStock = false
    plants.some(p => {
        if (p.id === id && p.quantity === index) {
            isNotInStock = true
        }
    })
    return isNotInStock
}

export const isPlantOutOfStock = (id: number, plants: Plant[]) => {
    const plant = plants.find(p => p.id === id)
    return plant ? plant.quantity === 0 : false
};

export const notMuchPlant = (id: number, plants: Plant[]) => {
    const plant = plants.find(p => p.id === id)
    return plant ? plant.quantity <= 3 && plant.quantity > 0  : false
}

