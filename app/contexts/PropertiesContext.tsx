// PropertiesContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as SecureStorage from 'expo-secure-store';
import { Property } from '@app/types/property.type';


// Define the context data types
interface PropertiesContextData {
    properties: Property[];
    addProperty: (property: Property) => void;
    editProperty: (id: string, property: Property) => void;
    deleteProperty: (id: string) => void;
}

// Create the context
const PropertiesContext = createContext<PropertiesContextData | undefined>(undefined);

// Storage key for AsyncStorage
const PROPERTIES_STORAGE_KEY = 'app_properties';

export const PropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [properties, setProperties] = useState<Property[]>([]);

    // Load properties from AsyncStorage when the provider mounts
    useEffect(() => {
        const loadProperties = async () => {
            try {
                const storedProperties = SecureStorage.getItem(PROPERTIES_STORAGE_KEY);
                if (storedProperties) {
                    const parsedProperties = JSON.parse(storedProperties);
                    console.log("Loaded properties from storage:", parsedProperties);
                    setProperties(parsedProperties);
                }
            } catch (error) {
                console.error("Failed to load properties from storage:", error);
            }
        };

        loadProperties();
    }, []);

    // Save properties to AsyncStorage whenever they change
    useEffect(() => {
        const saveProperties = () => {
            try {
                console.log("Saving properties to storage:", properties);
                SecureStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties));
            } catch (error) {
                console.error("Failed to save properties to storage:", error);
            }
        };

        saveProperties();
    }, [properties]);

    // Function to add a property to the list
    const addProperty = (property: Property) => {
        setProperties((prevProperties) => [...prevProperties, property]);
    };

    const editProperty = (id: string, property: Property) => {
        setProperties((prevProperties) => prevProperties.map((p) => p.id === id ? property : p));
    }

    const deleteProperty = (id: string) => {
        setProperties((prevProperties) => prevProperties.filter((p) => p.id !== id));
    }

    return (
        <PropertiesContext.Provider value={{ properties, addProperty, editProperty, deleteProperty }}>
            {children}
        </PropertiesContext.Provider>
    );
};

// Create a custom hook to use the PropertiesContext
export const useProperties = () => {
    const context = useContext(PropertiesContext);
    if (!context) {
        throw new Error("useProperties must be used within a PropertiesProvider");
    }
    return context;
};