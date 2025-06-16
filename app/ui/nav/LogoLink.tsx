import Image from "next/image";
import Link from "next/link";

export function LogoLink() {
    return (
        <Link
            key="Home"
            href="/">
            <Image
                src="/logo.svg"
                alt="Logo du site, lien vers la page d'accueil"
                width={44}
                height={48.13}
                className="md:w-[60px]"
            />
        </Link>

    )
}