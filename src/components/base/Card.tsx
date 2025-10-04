import { cn } from '@/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={cn(`bg-white rounded-xl p-4 w-full ${className}`)}>
      {children}
    </div>
  );
}
