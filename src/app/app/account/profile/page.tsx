import { GET_CURRENT_USER } from '@/graphql/query/settings';
import { getClient } from '@/lib/apolloClientServer';
import { View403, View500 } from '@/sections/error';
import { CurrentUserResponse } from '@/types';
import { CONFIG } from 'src/config-global';
import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Profile - ${CONFIG.site.name}` };

const page = async () => {
  try {
    const client = await getClient();
    const { data } = await client.query<CurrentUserResponse>({
      query: GET_CURRENT_USER,
    });

    if (!data?.currentUser?.success) {
      return <View403 subTitle={data?.currentUser?.message}></View403>;
    }

    return <AccountView account={data.currentUser.account}></AccountView>;
  } catch (error) {
    return <View500></View500>;
  }
};

export default page;
