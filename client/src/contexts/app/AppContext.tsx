import * as React from 'react';

export interface ChallCurrentModal {
    challId: string;
    title: string;
    category: string;
    solveStatus: boolean;
    bookmarked: boolean;
    credit: {
        name: string;
        url: string;
    };
    badges: string[];
}

export interface AppContextType {
    currentChallModal?: ChallCurrentModal;
    openModal: (currentChall: ChallCurrentModal) => void;
    closeModal: () => void;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentChallModal, setCurrentChallModal] = React.useState<ChallCurrentModal | undefined>(undefined);

    const openModal = (currentChall: ChallCurrentModal) => {
        setCurrentChallModal(currentChall);
    };

    const closeModal = () => {
        setCurrentChallModal(undefined);
    };

    return <AppContext.Provider value={{ currentChallModal, openModal, closeModal }}>{children}</AppContext.Provider>;
};

export default AppProvider;
