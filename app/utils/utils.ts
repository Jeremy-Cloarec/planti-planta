import {Plant} from "@/app/lib/definitions";

export const formatedUrl = (title: string) => title.toLowerCase().split(" ").join("_")

export const handlePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement>,
    setter: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();
    setter(prev => !prev);
};

export const calculateTotalPrice = (plants: Plant[]): number => {
    return plants.reduce((acc, p) => acc + Number(p.price), 0)
}

export const toogleChangeInfos = (bool: boolean, functionBool: (value: (((prevState: boolean) => boolean) | boolean)) => void) => {
    console.log(bool)
    functionBool(!bool)
}