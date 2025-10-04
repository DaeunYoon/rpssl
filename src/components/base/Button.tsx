import { cn } from '@/utils';

interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const styles: Record<Exclude<ButtonProps['variant'], undefined>, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-neutral-300 text-neutral-900 hover:bg-neutral-400',
};

export default function Button({
  className,
  children,
  onClick,
  variant = 'secondary',
  type = 'button',
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const mergedClassName = cn(
    'px-4 py-2 rounded-lg hover:bg-opacity-80',
    styles[variant],
    className,
    {
      'cursor-not-allowed opacity-50 hover:bg-opacity-50': props.disabled,
    },
  );

  return (
    <button
      className={mergedClassName}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
