import { CardData } from './types';

interface StoredCard extends CardData {
    id: string;
    createdAt: string;
}

const CARDS_STORAGE_KEY = 'businessCards';

export const getAllCards = (): StoredCard[] => {
    const cards = localStorage.getItem(CARDS_STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
};

export const saveCard = (cardData: CardData): StoredCard => {
    const cards = getAllCards();
    const newCard: StoredCard = {
        ...cardData,
        id: Date.now().toString(), // Usar timestamp como ID único
        createdAt: new Date().toISOString()
    };

    cards.push(newCard);
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
    return newCard;
};

export const getCardById = (id: string): StoredCard | undefined => {
    const cards = getAllCards();
    return cards.find(card => card.id === id);
};

export const updateCard = (id: string, cardData: CardData): StoredCard | undefined => {
    const cards = getAllCards();
    const index = cards.findIndex(card => card.id === id);

    if (index !== -1) {
        const updatedCard: StoredCard = {
            ...cardData,
            id,
            createdAt: cards[index].createdAt
        };
        cards[index] = updatedCard;
        localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
        return updatedCard;
    }
    return undefined;
};

export const deleteCard = (id: string): boolean => {
    const cards = getAllCards();
    const filteredCards = cards.filter(card => card.id !== id);

    if (filteredCards.length !== cards.length) {
        localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(filteredCards));
        return true;
    }
    return false;
}; 