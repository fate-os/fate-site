'use client';

import { useLazyQuery } from '@apollo/client';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '..';
import { GET_ACCOUNT } from '@/graphql/query/Auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { accountInitialize, accountLoader } from '../features/auth.reducer';

// const link = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_SERVER_URL + '/graphql',
//   credentials: 'include',
//   fetchOptions: {
//     credentials: 'include',
//   },
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
//   credentials: 'include',
//   ssrMode: typeof window === 'undefined',
// });

const AppProvider = (props: React.PropsWithChildren) => {
  return (
    <>
      <ReduxProvider store={store}>
        <AppChildProvider>{props.children}</AppChildProvider>
      </ReduxProvider>
    </>
  );
};

const AppChildProvider = (props: React.PropsWithChildren) => {
  const [getAccount] = useLazyQuery(GET_ACCOUNT);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAccount()
      .then(({ data }) => {
        if (data?.account) {
          if (data?.account?.success) {
            if (data?.account?.account) {
              dispatch(accountInitialize(data?.account?.account));
              return;
            }
          } else {
            dispatch(accountLoader(false));
          }
        }
      })
      .catch((err) => {
        dispatch(accountLoader(false));
      });
  }, []);

  return <>{props.children}</>;
};

export default AppProvider;
