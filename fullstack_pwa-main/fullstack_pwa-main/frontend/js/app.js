const API_URL = 'http://localhost:3000/api/animals'; 

document.getElementById('animalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const animal = {
        name: document.getElementById('name').value,
        breed: document.getElementById('breed').value,
        type: document.getElementById('type').value,
        furColor: document.getElementById('furColor').value,
        condominium: document.getElementById('condominium').value,
        block: document.getElementById('block').value,
        apartment: document.getElementById('apartment').value,
        ownerName: document.getElementById('ownerName').value,
        neutered: document.getElementById('neutered').value === 'true',
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animal),
        });

        const newAnimal = await response.json();
        appendAnimal(newAnimal);
    } catch (err) {
        console.error('Erro ao cadastrar animal:', err);
    }
});

async function fetchAnimals() {
    try {
        const response = await fetch(API_URL);
        const animals = await response.json();
        animals.forEach(appendAnimal);
    } catch (err) {
        console.error('Erro ao buscar animais:', err);
    }
}

async function deleteAnimal(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        document.getElementById('animalsList').innerHTML = ''; 
        fetchAnimals(); 
    } catch (err) {
        console.error('Erro ao deletar animal:', err);
    }
}


document.addEventListener('DOMContentLoaded', fetchAnimals);





