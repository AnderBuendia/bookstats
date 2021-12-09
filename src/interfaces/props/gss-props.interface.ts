import type { Session } from 'next-auth';
import type { DehydratedState } from 'react-query';

export interface GSSProps {
  session?: Session;
  componentProps?: any;
  dehydratedState?: DehydratedState;
}
