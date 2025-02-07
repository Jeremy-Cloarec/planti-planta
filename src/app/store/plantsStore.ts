'use client'
import { create } from 'zustand'
import { Plant } from '../lib/definitions'
import { fetchPlants } from '../lib/data'

interface PlantStore {
    plants: Plant[];
    fetch: () => Promise<void>;
}

export const useStorePlant = create<PlantStore>((set) => ({
    plants: [],
    fetch: async () => {
        try {
            const data = await fetchPlants();
            set({ plants: data });
        } catch (error) {
            console.error("Erreur de récupération des plantes:", error);
        }
    }}));