//fichier a supprimer au plus vite. Simple test

export class Product {
    id: number;
    name: string;
    description?: string;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}