'use client';

import { ACCESS_TOKEN } from '@/config-global';
import { deleteAllCookies, deleteCookie } from '@/utils/cookies';

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    deleteAllCookies();
    deleteCookie(ACCESS_TOKEN);

    window.location.replace('/');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
