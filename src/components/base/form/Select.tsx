import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import type { AnyFieldApi } from '@tanstack/react-form';
import FormErrorMessage from './ErrorMessage';
import FormLabel from './Label';

export interface SelectOption<TValue> {
  label: string;
  value: TValue;
}

interface SelectProps<TValue extends string | number> {
  field: AnyFieldApi;
  label?: string;
  options: SelectOption<TValue>[];
}

export default function FormSelect<TValue extends string | number>({
  field,
  label,
  options,
}: SelectProps<TValue>) {
  return (
    <div>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <RadioGroup
        value={field.state.value}
        onChange={(val) => field.handleChange(val)}
        className="space-y-2"
      >
        {options.map((opt) => (
          <Radio
            key={opt.value}
            value={opt.value}
            className="group flex cursor-pointer rounded-lg bg-black/40 p-2 text-white transition focus:outline-none data-checked:bg-black/70 data-focus:outline data-focus:outline-black/30"
          >
            {({ checked }) => (
              <div className="flex items-center gap-2">
                <span>{opt.label}</span>
                <CheckCircleIcon
                  className={`size-6 fill-white transition ${
                    checked ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            )}
          </Radio>
        ))}
      </RadioGroup>

      <FormErrorMessage errors={field.state.meta.errors} />
    </div>
  );
}
