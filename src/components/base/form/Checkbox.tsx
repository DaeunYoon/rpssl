import { Checkbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import type { AnyFieldApi } from '@tanstack/react-form';
import FormErrorMessage from './ErrorMessage';
import FormLabel from './Label';

interface FormInputProps {
  field: AnyFieldApi;
  children?: React.ReactNode;
}

export default function FormCheckbox({ field, children }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-start cursor-pointer">
        <Checkbox
          name={field.name}
          value={field.state.value}
          onChange={field.handleChange}
          className="group block size-4 rounded border bg-white mt-2"
        >
          <div></div>
          <CheckIcon className="hidden fill-black group-data-checked:block" />
        </Checkbox>
        {children && <FormLabel htmlFor={field.name}>{children}</FormLabel>}
      </div>
      <FormErrorMessage errors={field.state.meta.errors} />
    </div>
  );
}
