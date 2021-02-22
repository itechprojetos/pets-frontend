export const CustomerTypesIds = {
    client: 1,
    banho: 2,
    dayCare: 3,
    dogWalker: 4,
    fotoPet: 5,
    hotel: 6,
    petSitter: 7,
    tosa: 8,
    trainingSchool: 9,
    veterinario: 10,
    ong: 11,
}

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}


export const fileExtension = (file: File): string | undefined => {
    if (file && file.name) {
        return file.name.substring(file.name.lastIndexOf(".") + 1)
    }
    return undefined
}
