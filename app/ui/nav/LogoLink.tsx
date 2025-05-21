import Image from "next/image";
import Link from "next/link";

export function LogoLink() {
    return (
        <Link
            key="Home"
            href="/"
            className="w-fit flex z-40">
            <Image
                src="/logo.svg"
                alt="Logo du site : une petite plante mignone"
                className={`w-9 h-auto`}
                width={36}
                height={41.48}
            />
        </Link>

    )
}