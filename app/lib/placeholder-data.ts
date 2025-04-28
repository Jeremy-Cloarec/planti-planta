const getRandomQuantity = () => Math.floor((Math.random() * 21) + 1);

const plants = [
    {
        title: 'Iridaceae',
        price: 16,
        quantity: getRandomQuantity()
    },
    {
        title: 'Ericaceae',
        price: 24,
        quantity: getRandomQuantity()
    },
    {
        title: 'Geraniaceae',
        price: 8,
        quantity: getRandomQuantity()
    },
    {
        title: 'Aizoaceae',
        price: 12,
        quantity: getRandomQuantity()
    },
    {
        title: 'Liliaceae',
        price: 31,
        quantity: getRandomQuantity()
    },
    {
        title: 'Campanulaceae',
        price: 24,
        quantity: getRandomQuantity()
    }
]

const users = [
    {
        name: 'John Doe',
        isAdmin: false,
        email: 'johndoe@gmail.com',
        password: '123456Ué'
    },
    {
        name: 'Jane Smith',
        isAdmin: false,
        email: 'janesmith@gmail.com',
        password: '87654321'
    },
    {
        name: 'Alex Johnson',
        isAdmin: true,
        email: 'alexjohnson@gmail.com',
        password: 'abcdef12&é'
    }
]

export { plants, users }