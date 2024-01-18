import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../app';
import { setTokens } from '../slices/authSlice';
import { AUTH_CONFIG } from '../../configuration/auth-config';

const onAuthQueryStarted = async (arg, { dispatch, queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled;
    dispatch(setTokens(data));
  } catch (error) {
    /* empty */
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      signUp: builder.mutation({
        query: (credentials) => {
          return {
            url: AUTH_CONFIG.routes.register,
            body: {
              email: credentials.email,
              password: credentials.password,
            },
            method: 'POST',
          };
        },
        onQueryStarted: onAuthQueryStarted,
      }),
      signIn: builder.mutation({
        query: (credentials) => {
          return {
            url: AUTH_CONFIG.routes.login,
            body: {
              email: credentials.email,
              password: credentials.password,
            },
            method: 'POST',
          };
        },
        onQueryStarted: onAuthQueryStarted,
      }),
    };
  },
});

export const { useSignUpMutation, useSignInMutation } = authApi;