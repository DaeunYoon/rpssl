import { cn } from '@/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'border bg-white border-zinc-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full',
        className,
      )}
      {...props}
    />
  );
}
