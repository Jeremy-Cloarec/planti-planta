import { fireEvent, render, screen } from "@testing-library/react";
import { ListCardsPlants } from "../ui/ListCardsPlants"

const plants = [
    { id: 1, title: 'Iridaceae', price: '16', shop: false },
    { id: 2, title: 'Geraniaceae', price: '8', shop: false },
    { id: 3, title: 'Aizoaceae', price: '12', shop: false }
]

describe('ListCardsPlants', () => {
    it('render correctlt', async () => {
        render(
            <ListCardsPlants />
        )
        const listPlants = await screen.findByRole('list')
        expect(listPlants).toBeInTheDocument()

        const listItems = await screen.findAllByRole('listitem')
        expect(listItems).toHaveLength(plants.length)
    })

    it('call function when clicked', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        render(<ListCardsPlants plants={plants} />)
        const listItems = screen.getAllByRole('listitem')

        listItems.forEach((item, index) => {
            fireEvent.click(item)
            expect(logSpy).toHaveBeenCalledWith(`Click on ${plants[index].title}`);
        })

        logSpy.mockRestore();

    })
})