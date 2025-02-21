import { Plant } from "../lib/definitions"

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
}

export const notMuchPlant = (id: number, plants: Plant[]) => {
    const plant = plants.find(p => p.id === id)
    return plant ? plant.quantity <= 3 && plant.quantity > 0 : false
}

export const getScrollPosition = () => {
    const storedScroll = localStorage.getItem("scroll")

    if (!storedScroll) return

    const scroll_y = JSON.parse(storedScroll)

    setTimeout(() => {
        window.scrollTo(0,  scroll_y.position);
    }, 10)
}

export const storeScrollPosition = () => {
    const scroll_y = { position: window.scrollY }
    localStorage.setItem("scroll", JSON.stringify(scroll_y))
}
