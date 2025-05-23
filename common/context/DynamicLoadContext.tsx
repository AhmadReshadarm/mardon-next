import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

// Define the shape of the context value
interface DynamicLoadContextType {
  markAsLoaded: (componentName: string) => void;
  isLoaded: (componentName: string) => boolean;
  loadedComponents: Set<string>; // Expose this if needed for debugging or more complex logic
}

// Create the context with an initial undefined value, but assert its type for consumers
const DynamicLoadContext = createContext<DynamicLoadContextType | undefined>(
  undefined,
);

// Define the props for the provider component
interface DynamicLoadProviderProps {
  children: ReactNode;
}

export const DynamicLoadProvider: React.FC<DynamicLoadProviderProps> = ({
  children,
}) => {
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(
    new Set(),
  );

  const markAsLoaded = useCallback((componentName: string) => {
    setLoadedComponents((prev) => {
      const newSet = new Set(prev);
      newSet.add(componentName);
      return newSet;
    });
  }, []);

  const isLoaded = useCallback(
    (componentName: string): boolean => {
      return loadedComponents.has(componentName);
    },
    [loadedComponents],
  );

  const contextValue: DynamicLoadContextType = {
    markAsLoaded,
    isLoaded,
    loadedComponents,
  };

  return (
    <DynamicLoadContext.Provider value={contextValue}>
      {children}
    </DynamicLoadContext.Provider>
  );
};

export const useDynamicLoad = (): DynamicLoadContextType => {
  const context = useContext(DynamicLoadContext);
  if (context === undefined) {
    throw new Error('useDynamicLoad must be used within a DynamicLoadProvider');
  }
  return context;
};
