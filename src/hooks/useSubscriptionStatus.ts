import { useUserDetails } from "./useUserDetails";

export const useSubscriptionStatus = () => {
  const { data: userDetails, ...rest } = useUserDetails();

  const planSlug = userDetails?.subscription_status?.package?.slug?.toLowerCase() || "";
  
  /**
   * Logic for isTrial:
   * 1. Explicitly on_trial flag is true from the backend
   * 2. The package slug is "trial"
   * 3. No package slug exists (defaults to trial state)
   */
  const isTrial = 
    userDetails?.subscription_status?.on_trial === true || 
    planSlug === "trial" || 
    !planSlug;

  const isBasic = planSlug.includes("basic");
  const isAdvance = planSlug.includes("advance") || planSlug.includes("advanced");
  const isPremium = planSlug.includes("premium");

  return {
    userDetails,
    isTrial,
    isBasic,
    isAdvance,
    isPremium,
    planSlug,
    ...rest
  };
};
