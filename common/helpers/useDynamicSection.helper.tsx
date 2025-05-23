import { useDynamicLoad } from 'common/context/DynamicLoadContext';
import { useInViewport } from 'components/store/storeLayout/useInViewport';
import { useEffect, useState } from 'react';

// Helper hook for managing dynamic section loading
export const useDynamicSection = (componentName: string) => {
  const { markAsLoaded, isLoaded } = useDynamicLoad();

  const { isInViewport, ref } = useInViewport();
  const [shouldRender, setShouldRender] = useState(isLoaded(componentName));

  useEffect(() => {
    // If it's in viewport and not yet marked as globally loaded, mark it.
    if (isInViewport && !isLoaded(componentName)) {
      markAsLoaded(componentName);
    }
    // If it's globally loaded (either just now or from before), ensure it renders.
    if (isLoaded(componentName) && !shouldRender) {
      setShouldRender(true);
    }
  }, [isInViewport, componentName, markAsLoaded, isLoaded, shouldRender]); // Added shouldRender

  return { ref, shouldRender };
};
