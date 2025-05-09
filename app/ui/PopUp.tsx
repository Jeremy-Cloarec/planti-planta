export function PopUpAddedToCard({ messages, color }: { messages: string[], color:string }) {
    return (
        <ul className="z-20 fixed bottom-10 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">{
            messages.map((message, i) =>
                <li
                    key={i}
                    className={`${color} first-line:w-fit py-1 px-3 rounded-lg`}
                >
                    {message}
                </li>)
        }</ul>
    )
}

export function PopUpOrder() {
    return (
        <div className="z-20 fixed bottom-10 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">
            <p className="bg-greenLightOpacity w-fit py-1 px-3 rounded-lg">Votre commande a bien été passée !</p>
        </div>
    )
}