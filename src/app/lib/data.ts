export async function fetchPlants() {
    const res = await fetch("/api/plants");
    if (!res.ok) throw new Error("Erreur lors de la récupération des plantes");
    return res.json();
}
