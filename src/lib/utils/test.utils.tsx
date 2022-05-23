import { render } from '@testing-library/react';
import type { ReactElement } from 'react';

const customRender = (ui: ReactElement, options = {}) => {
  return render(ui, {
    wrapper: ({ children }) => <div>{children}</div>,
    ...options,
  });
};

export * from '@testing-library/react';

export { customRender as render };
