import { Cabin, Cabin_Condensed, Cormorant } from 'next/font/google'

export const cormorant = Cormorant({
    subsets: ['latin'],
    weight: '700',
    variable: '--cormorant'
})

export const cabinRegular = Cabin({
    subsets: ['latin'],
    weight: '400',

})

export const cabinBold = Cabin({
    subsets: ['latin'],
    variable: '--cabin-bold',
     weight: '700',
})

export const cabinCondensed = Cabin_Condensed({
    subsets: ['latin'],
    weight: '400',
    variable: '--cabin-condensed'
})