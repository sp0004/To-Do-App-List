
import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface PopupContextType {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopupContext = () => {
	const context = useContext(PopupContext);
	if (!context) {
		throw new Error('usePopupContext must be used within a PopupProvider');
	}
	return context;
};

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<PopupContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</PopupContext.Provider>
	);
};