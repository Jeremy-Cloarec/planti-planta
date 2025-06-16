import Image from "next/image";
import Link from "next/link";

export function LogoLink() {
    return (
        <Link
            key="Home"
            href="/"
            className="w-fit flex z-40">
            <Image
                src="/logo_violet.svg"
                alt="Logo du site : une petite plante mignone"
                width={44}
                height={51}
            />
        </Link>

    )
}