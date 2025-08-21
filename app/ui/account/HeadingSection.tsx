import { cabinBold } from "@/app/ui/fonts"
import ButtonChangeInfo from "@/app/ui/buttons/ButtonChangeInfo"

type HeadingSectionProps = {
    text: string
    onClick: () => void
    textButton: string
    as?: keyof JSX.IntrinsicElements
    style?: string

};

export default function HeadingSection({ text, onClick, textButton, as: Tag = "h2", style }: HeadingSectionProps) {
    return (
        <div className="flex items-center justify-between">
            <Tag className={`${cabinBold.className} ${style}`}>{text}</Tag>
            <ButtonChangeInfo onClick={onClick} textButton={textButton} />
        </div>
    )
}