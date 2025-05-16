
export function PopUpAddedToCard({ message, isSucces }: { message: string, isSucces: boolean}) {
    const colorStatus = isSucces ? "bg-greenLightOpacity" : "bg-redOpacity"
    return (
        <li className={`first-line:w-fit py-1 px-3 rounded-lg ${colorStatus}`}>
            {message}
        </li >
    )
}

export function PopUpOrder() {
    return (
        <div className="z-20 fixed bottom-10 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">
            <p className="bg-greenLightOpacity w-fit py-1 px-3 rounded-lg">Votre commande a bien été passée !</p>
        </div>
    )
}