export const  formatedUrl = (title:string) =>  title.toLowerCase().split(" ").join("_")

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // URL SSR sur Vercel
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL; // URL personnalisée
    return `http://localhost:${process.env.PORT || 3000}`; // URL de développement
}

export const urls = {
    baseUrl: getBaseUrl(),
}
