export const  formatedUrl = (title:string) =>  title.toLowerCase().split(" ").join("_")

const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    return `http://localhost:${process.env.PORT || 3000}`
}

export const urls = {
    baseUrl: getBaseUrl(),
}
