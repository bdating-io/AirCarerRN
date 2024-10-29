import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the skills and profile data
type SkillsState = {
  transportation: string[];
  languages: string[];
  education: string[];
  work: string[];
  specialties: string[];
  verificationStatus: string; // "notVerified" or "verified"
  profilePicture: string | null;
  portfolioImages: string[];
  bio: string;
  firstName: string;
  lastName: string;
  location: string;
};

// Initial state with all fields
const initialState: SkillsState = {
  transportation: [],
  languages: [],
  education: [],
  work: [],
  specialties: [],
  verificationStatus: "notVerified",
  profilePicture: null,
  portfolioImages: [],
  bio: "",
  firstName: "",
  lastName: "",
  location: "",
};

// Create context with initial state
const SkillsContext = createContext<{
  skills: SkillsState;
  updateSkills: (section: keyof SkillsState, data: any) => void;
  setVerificationStatus: (status: string) => void;
}>({
  skills: initialState,
  updateSkills: () => {}, // placeholder function to avoid undefined
  setVerificationStatus: () => {}, // placeholder function for verification status
});

// Provider component
export const SkillsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [skills, setSkillsState] = useState<SkillsState>(initialState);

  // Function to update specific skill sections or profile fields
  const updateSkills = (section: keyof SkillsState, data: any) => {
    setSkillsState((prevSkills) => ({
      ...prevSkills,
      [section]: data,
    }));
  };

  // Function to update verification status specifically
  const setVerificationStatus = (status: string) => {
    setSkillsState((prevSkills) => ({
      ...prevSkills,
      verificationStatus: status,
    }));
  };

  return (
    <SkillsContext.Provider value={{ skills, updateSkills, setVerificationStatus }}>
      {children}
    </SkillsContext.Provider>
  );
};

// Custom hook to use the SkillsContext
export const useSkills = () => useContext(SkillsContext);