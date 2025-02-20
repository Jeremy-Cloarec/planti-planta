export function PopUpAddedToCard({ plantsClicked }: { plantsClicked: string[] }) {
    return (
        <ul className="z-20 fixed bottom-10 left-1/2 -translate-x-1/2 text-center flex flex-col gap-2">{
            plantsClicked.map((plantClicked, i) =>
                <li
                    key={i}
                    className="bg-greenLightOpacity w-fit py-1 px-3 rounded-lg"
                >
                    {plantClicked} ajoutée au panier&nbsp;!
                </li>)
        }</ul>
    )
}