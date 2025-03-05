import { Crimson_Text, Jaldi } from 'next/font/google'


export const crimson = Crimson_Text({
    subsets: ['latin'],
    weight: '600',
    variable: '--crimson'
})

export const jaldiRegular = Jaldi({
    subsets: ['latin'],
    weight: '400'
})

export const jaldiBold = Jaldi({
    subsets: ['latin'],
    weight: '700',
    variable: '--jaldiBold'
})