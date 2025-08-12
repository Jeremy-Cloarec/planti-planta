import { User } from "@/app/lib/definitions";
import HeadingSection from "../HeadingSection";
import { toogleChangeInfos } from "@/app/utils/utils";
import { cabinBold } from "../../fonts";

type PersonalInfosProps = {
    user: User,
    isChangePersonnalInfos: boolean,
    setIsChangePersonnalInfos: (value: boolean | ((prevState: boolean) => boolean)) => void
}

export default function PersonalInfos({ user, isChangePersonnalInfos, setIsChangePersonnalInfos }: PersonalInfosProps) {
    return (
        <>
            <HeadingSection text="Informations personnelles"
                onClick={() => toogleChangeInfos(isChangePersonnalInfos, setIsChangePersonnalInfos)}
                textButton="Modifier"
            />
            <div>
                <p className={`${cabinBold.className} text-sm`}>Nom : </p>
                <p>{user.name}</p>
            </div>
            <div>
                <p className={`${cabinBold.className} text-sm`}>Mail : </p>
                <p>{user.email}</p>
            </div>
        </>

    )
}