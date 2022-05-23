import type { FC } from 'react';
import { LoadingIcon } from '@Components/Icons/loading.icon';

const Loading: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <LoadingIcon />
    </div>
  );
};

export default Loading;
