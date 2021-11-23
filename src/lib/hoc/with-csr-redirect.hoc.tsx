import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { generateQueryParams } from '@Lib/utils/url.utils';
import { IRedirect } from '@Interfaces/redirect.interface';
import { RedirectConditions } from '@Enums/config/redirect-conditions.enum';

const withCSRRedirect = (Component: FC<any>, redirect: IRedirect) => {
  const { href, asPath, condition, query } = redirect;

  return (props: any) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState<boolean>(
      !!props.shouldRender
    );

    useEffect(() => {
      redirectTo();
    }, []);

    const redirectTo = () => {
      if (
        (session &&
          condition === RedirectConditions.REDIRECT_WHEN_USER_EXISTS) ||
        (!session &&
          condition === RedirectConditions.REDIRECT_WHEN_USER_NOT_EXISTS)
      ) {
        let queryString;

        if (query) return (queryString = generateQueryParams(query));

        const url = queryString ? `${href}?${queryString}` : href;

        router.replace(url, asPath);
      } else setShouldRender(true);
    };

    return shouldRender ? <Component {...props}></Component> : <></>;
  };
};

export default withCSRRedirect;
