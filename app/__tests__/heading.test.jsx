import { render, screen } from "@testing-library/react";
import Heading from '../ui/Heading'

test('it givent the given name in the H1', () => {
    const title = "Planti Planta"
    render(<Heading title={title} />)
    expect(
        expect(screen.getByRole('heading', { level: 1 }, { name: `${title}` })).toHaveTextContent(`${title}`)
    )
})


