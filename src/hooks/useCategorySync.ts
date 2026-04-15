import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FIXED_CATEGORIES } from "../utils/categoryConstants";
import { createCategory } from "../api/savedProducts";

export const useCategorySync = (categories: any[], isCategoriesLoading: boolean, hasData: boolean) => {
  const queryClient = useQueryClient();
  const hasSyncRun = useRef(false);

  useEffect(() => {
    const syncCategories = async () => {
      // Only sync if we have successfully fetched the list, haven't synced this session,
      // and we have a valid response to compare against.
      if (!isCategoriesLoading && !hasSyncRun.current && hasData) {
        const missingFixed = FIXED_CATEGORIES.filter(fc => 
          !categories.some(bc => bc.name.trim().toLowerCase() === fc.name.trim().toLowerCase())
        );

        if (missingFixed.length > 0) {
          hasSyncRun.current = true; // Block further triggers immediately
          console.log("Centralized Sync: Saving missing fixed categories sequentially...");
          
          for (const fc of missingFixed) {
            try {
              await createCategory({ name: fc.name });
              console.log(`Successfully synced: ${fc.name}`);
            } catch (err) {
              console.error(`Failed to sync category ${fc.name}:`, err);
            }
          }
          
          // Refresh list once after all are created
          queryClient.invalidateQueries({ queryKey: ["vault-categories"] });
        } else {
          // If no categories are missing, we still mark as run to avoid redundant checks
          hasSyncRun.current = true;
        }
      }
    };

    syncCategories();
  }, [categories, isCategoriesLoading, hasData, queryClient]);
};
