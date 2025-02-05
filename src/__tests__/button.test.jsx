import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../app/ui/Button"

describe('Button', () => {
    it('render correctly', () => {
        const mockClick = jest.fn()
        render(
            <Button
                text="Ajouter au panier"
                onClick={mockClick}
            />
        )
        const buttonElement = screen.getByRole("button", { name: /ajouter au panier/i })
        expect(buttonElement).toBeInTheDocument()
        fireEvent.click(buttonElement)
        expect(mockClick).toHaveBeenCalled()
    })
})