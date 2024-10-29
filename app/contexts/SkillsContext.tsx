import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the skills data
type SkillsState = {
  transportation: string[];
  languages: string[];
  education: string[];
  work: string[];
  specialties: string[];
  verificationStatus: string; // "notVerified" or "verified"
};

// Initial state
const initialState: SkillsState = {
  transportation: [],
  languages: [],
  education: [],
  work: [],
  specialties: [],
  verificationStatus: "notVerified",
};

// Create context with initial state
const SkillsContext = createContext<{
  skills: SkillsState;
  updateSkills: (section: keyof SkillsState, data: string[] | string) => void;
  setVerificationStatus: (status: string) => void;
}>({
  skills: initialState,
  updateSkills: () => {}, // placeholder function to avoid undefined
  setVerificationStatus: () => {}, // placeholder function for verification status
});

// Provider component
export const SkillsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [skills, setSkillsState] = useState<SkillsState>(initialState);

  // Function to update specific skill sections
  const updateSkills = (section: keyof SkillsState, data: string[] | string) => {
    setSkillsState((prevSkills) => ({
      ...prevSkills,
      [section]: data,
    }));
  };

  // Function to update verification status
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