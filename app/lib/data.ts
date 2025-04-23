export async function fetchUserInfos() {
    try {
        const res = await fetch("/api/users")
        if (!res.ok) throw new Error("Erreur lors de la récupération de l'utilisateur");
        const data = await res.json()
        console.log(data);
        return data;
    }
    catch(error) {
        console.error({message : "Oups, un problème est survenue"}, {error})
    }
}

