"use client"
import { createContext } from "react";
import { Plants } from "../lib/definitions";

export const PlantsContext = createContext<Plants[]>([]);


