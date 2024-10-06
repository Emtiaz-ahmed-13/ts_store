import React, { createContext, ReactNode, useContext, useState } from "react";

// Define the context type
interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice?: number;
  setMinPrice: (price?: number) => void;
  maxPrice?: number;
  setMaxPrice: (price?: number) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

// Create the context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Create the provider component
export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize states for filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [keywords, setKeywords] = useState<string[]>([]);

  // Define the value passed to context consumers
  const value: FilterContextType = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keywords,
    setKeywords,
  };

  // Return the context provider wrapping the children
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

// Custom hook to use the filter context
export const useFilter = (): NonNullable<FilterContextType> => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error(
      "useFilter must be used within a FilterProvider. Ensure that the component is wrapped with the FilterProvider."
    );
  }
  return context;
};
