import Input from '@/components/base/Input';
import type { AnyFieldApi } from '@tanstack/react-form';
import FormErrorMessage from './ErrorMessage';
import FormLabel from './Label';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: AnyFieldApi;
  label?: string;
}

export default function FormInput({ field, label, ...props }: FormInputProps) {
  return (
    <div>
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
      <FormErrorMessage errors={field.state.meta.errors} />
    </div>
  );
}
