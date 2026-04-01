import { QueryClient } from '@tanstack/react-query';
import api from '../api';
import { startTransition } from 'react';

export const prefetchUserQuotaData = async (queryClient: QueryClient) => {
  try {
    // ✅ DISABLED PREFETCHING - Always fetch fresh quota data from database
    // ✅ DO NOT PREFETCH - Let the useUserSubscriptionAndSearchQuota hook fetch fresh data
    // This prevents showing stale/cached quota values
    void queryClient;
    console.log('⚠️  Quota prefetching disabled - queryClient ready:', queryClient);
  } catch (error) {
    console.error('Error in prefetchUserQuotaData:', error);
  }
};

export const invalidateUserQuotaData = (queryClient: QueryClient) => {
  startTransition(() => {
    queryClient.removeQueries({
      queryKey: ['user', 'subscription', 'search_quota']
    });
    queryClient.invalidateQueries({
      queryKey: ['user', 'subscription', 'search_quota']
    });
  });
};

export const forceRefreshUserQuotaData = async (queryClient: QueryClient) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        resolve(null);
        return;
      }
      startTransition(() => {
        queryClient.removeQueries({
          queryKey: ['user', 'subscription', 'search_quota']
        });
      });
      const response = await api.get('/auth/me/');
      const data = response.data;
      queryClient.setQueryData(['user', 'subscription', 'search_quota'], data);
      console.log('Force refreshed user quota data successfully');
      resolve(data);
    } catch (error) {
      console.error('Error force refreshing user quota data:', error);
      reject(error);
    }
  });
};
