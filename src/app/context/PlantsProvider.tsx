"use client";
import { PlantsContext } from "./PlantsContext";
import { ReactNode } from "react";
import { Plants } from "../lib/definitions";

export function PlantsProvider({ children, plants }: { children: ReactNode; plants: Plants[] }) {
    return <PlantsContext.Provider value={plants}>{children}</PlantsContext.Provider>;
}