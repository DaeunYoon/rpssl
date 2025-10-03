import { cn } from '@/utils';

interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

const styles: Record<Exclude<ButtonProps['variant'], undefined>, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
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
