
import { Product } from '../models/Product'

export default {
    users: [{}],
    products: [
        new Product({
            id: 1,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque1.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Laks Castro',
            rate: 3,
            price: 50.00,
            bookmarked: false
        }),
        new Product({
            id: 2,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque2.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscrem ipsum dolor sit amet, consectetur adipiscrem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Soph Car',
            rate: 4,
            price: 200.00,
            bookmarked: false
        }),
        new Product({
            id: 3,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque3.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitit amet, consectetur adipiscing elitit amet, consectetur adipiscing elit.',
            sellerName: 'Eduardo Daolio',
            rate: 2,
            price: 200.00,
            bookmarked: false
        }),
        new Product({
            id: 4,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque4.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Marcos Zenber',
            rate: 5,
            price: 100.00,
            bookmarked: false
        }),
        new Product({
            id: 5,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque5.png',
            description: 'Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Larissa Jum',
            rate: 3,
            price: 200.00,
            bookmarked: false
        }),
        new Product({
            id: 6,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque6.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Hellio Scout',
            rate: 1,
            price: 200.00,
            bookmarked: false
        }),
        new Product({
            id: 7,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque7.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            sellerName: 'Vinicius Scrom',
            rate: 5,
            price: 300.00,
            bookmarked: false
        }),
        new Product({
            id: 8,
            imageUrl: 'https://storage.googleapis.com/dospets/destaque8.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            name: 'Eduardo Daolio',
            sellerName: 'Eduardo Daolio',
            rate: 3,
            price: 200.00,
            bookmarked: false
        }),]
}