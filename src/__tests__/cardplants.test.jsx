import { render, screen } from "@testing-library/react";
import CardPlant from '../app/ui/CardPlant'

describe('Card Plant', () => {
    const defaultProps = {
        title: "Marguerite",
        price: "15"
    }

    test('renders card with h2', () => {
        render(<CardPlant {...defaultProps} />)
        expect(
            expect(screen.getByRole('heading', { level: 2 }, { name: `${defaultProps.title}` })).toHaveTextContent(`${defaultProps.title}`)
        )
    })

    test('render card whith correct price', () => {
        render(<CardPlant {...defaultProps} />)
        const price = screen.getByText(`${defaultProps.price}€`)
        expect(price).toBeInTheDocument()
    })

    test('renders image with correct attributes', () => {
        render(<CardPlant {...defaultProps} />)
        const image = screen.getByRole('img')

        expect(image).toHaveAttribute('alt', `Photographie de la plante ${defaultProps.title}`)
        expect(image).toHaveAttribute('src')
    })

    test('renders add to cart button', () => {
        render(<CardPlant {...defaultProps} />);
        const button = screen.getByRole('button', { name: /ajouter au panier/i });
        expect(button).toBeInTheDocument();
    });

    test('card renders as a link', () => {
        render(<CardPlant {...defaultProps} />);
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '#');
    });
})

