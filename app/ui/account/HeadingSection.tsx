import React from "react"
import { cabinBold } from "@/app/ui/fonts"
import ButtonChangeInfo from "@/app/ui/buttons/ButtonChangeInfo"

type HeadingSectionProps = {
    text: string
    onClick?: () => void
    textButton: string
    as?: React.ElementType
    style?: string

};

export default function HeadingSection({ text, onClick, textButton, as: Tag = "h2", style }: HeadingSectionProps) {
    const Component = Tag as React.ElementType;
    return (
        <div className="flex items-center justify-between">
            <Component className={`${cabinBold.className} ${style}`}>{text}</Component>
            <ButtonChangeInfo onClick={onClick} textButton={textButton} />
        </div>
    )
}