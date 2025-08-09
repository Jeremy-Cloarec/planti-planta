import {cabinBold} from "@/app/ui/fonts";
import ButtonChangeInfo from "@/app/ui/buttons/ButtonChangeInfo";

export default function H2Section({text, onClick, textButton}: {
    text: string,
    onClick: () => void,
    textButton: string
}) {
    return (
        <div className="flex items-center justify-between">
            <h2 className={`${cabinBold.className}`}>{text}</h2>
            <ButtonChangeInfo onClick={onClick} textButton={textButton}/>

        </div>
    )
}