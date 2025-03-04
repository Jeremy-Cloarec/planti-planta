import { auth } from '../../../auth'

export default function UserAccount() {
    const isUser = auth
    return (
        <main className="flex-1 pt-[72px]">
            <h1>Compte utilisateur</h1>
        </main>

    )
}