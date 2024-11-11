// PropertiesContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of a property
interface Property {
    bedrooms: string;
    bathrooms: string;
    address: string;
    suburb: string;
    postcode: string;
    state: string;
    photos: string[];
}

// Define the context data types
interface PropertiesContextData {
    properties: Property[];
    addProperty: (property: Property) => void;
}

// Create the context
const PropertiesContext = createContext<PropertiesContextData | undefined>(undefined);

// Storage key for AsyncStorage
const PROPERTIES_STORAGE_KEY = '@app_properties';

export const PropertiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [properties, setProperties] = useState<Property[]>([]);

    // Load properties from AsyncStorage when the provider mounts
    useEffect(() => {
        const loadProperties = async () => {
            try {
                const storedProperties = await AsyncStorage.getItem(PROPERTIES_STORAGE_KEY);
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
        const saveProperties = async () => {
            try {
                console.log("Saving properties to storage:", properties);
                await AsyncStorage.setItem(PROPERTIES_STORAGE_KEY, JSON.stringify(properties));
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

    return (
        <PropertiesContext.Provider value={{ properties, addProperty }}>
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