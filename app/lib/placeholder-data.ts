import { Plant, User } from "./definitions"

const getRandomQuantity = () => Math.floor((Math.random() * 21) + 1);

const plants: Plant[] = [
    {
        id: 1,
        title: 'Iridaceae',
        price: 16,
        quantity: getRandomQuantity()
    },
    {
        id: 2,
        title: 'Ericaceae',
        price: 24,
        quantity: getRandomQuantity()
    },
    {
        id: 3,
        title: 'Geraniaceae',
        price: 8,
        quantity: getRandomQuantity()
    },
    {
        id: 4,
        title: 'Aizoaceae',
        price: 12,
        quantity: getRandomQuantity()
    },
    {
        id: 5,
        title: 'Liliaceae',
        price: 31,
        quantity: getRandomQuantity()
    },
    {
        id: 6,
        title: 'Campanulaceae',
        price: 24,
        quantity: getRandomQuantity()
    }
]

const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        isAdmin: false,
        email: 'johndoe@gmail.com',
        password: '12345678'
    },
    {
        id: 2,
        name: 'Jane Smith',
        isAdmin: false,
        email: 'janesmith@gmail.com',
        password: '87654321'
    },
    {
        id: 3,
        name: 'Alex Johnson',
        isAdmin: true,
        email: 'alexjohnson@gmail.com',
        password: 'abcdef12&é'
    }
]

export { plants, users }