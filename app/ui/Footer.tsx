export function Footer() {
    const dateYear = new Date()

    return (
        <footer className="w-full mt-10 px-3 py-8 bg-green">
            <p className="text-base text-center">
                {dateYear.getFullYear()} - 
                <a href="https://github.com/Jeremy-Cloarec" target="_blank" className="group relative">
                    <span> Jérémy</span>
                    <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-dark group-hover:w-full"></span>
                </a>
            </p>
        </footer>
    )
}