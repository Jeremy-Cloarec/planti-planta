"use client"
import { createContext } from "react"
import { Plant } from "../lib/definitions"

export const PlantsContext = createContext<Plant[]>([])


