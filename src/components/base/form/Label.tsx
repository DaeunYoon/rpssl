import type { ReactNode } from 'react';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export default function FormLabel({ children, ...props }: FormLabelProps) {
  return (
    <label className="block text-base font-semibold text-zinc-800" {...props}>
      {children}
    </label>
  );
}
