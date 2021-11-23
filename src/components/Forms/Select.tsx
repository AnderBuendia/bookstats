import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { formatStatusText } from '@Lib/utils/format-text.utils';
export type Option = {
  label: string;
  value: string;
};

export type SelectProps = UseFormRegisterReturn & {
  options: Option[];
  style: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ ...props }, ref) => {
    const { onChange, onBlur, name, style, options } = props;

    return (
      <select
        className={style}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {formatStatusText(label)}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select;
