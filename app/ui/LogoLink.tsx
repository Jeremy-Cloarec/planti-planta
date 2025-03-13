import Image from "next/image";
import Link from "next/link";

export function LogoLink({ isScrolled }: { isScrolled: boolean }) {
    return (
        <Link
            key="Home"
            href="/"
            className="w-fit flex z-40">
            <Image
                src="/logo.svg"
                alt="Logo du site : une petite plante mignone "
                className={`transition-all duration-500 min-w-9 mr-3 ${isScrolled ? "w-9 md:w-13" : "w-12 md:w-16"}`}
                width={48}
                height={56}
            />
        </Link>

    )
}