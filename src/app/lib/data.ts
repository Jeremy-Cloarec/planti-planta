export async function fetchPlants() {
    try {
        const res = await fetch("/api/plants")
        if (!res.ok) throw new Error("Erreur lors de la récupération des plantes");
        const data = await res.json()
        console.log(data);
        
        return data;
    }
    catch(error) {
        console.error({message : "Oups, un problème est survenue"}, {error})
    }
}

