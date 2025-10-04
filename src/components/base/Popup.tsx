import { cn } from '@/utils';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';

export interface BasePopupProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface PopupProps extends BasePopupProps {
  children: React.ReactNode;
}

export default function Popup({
  children,
  isOpen,
  onClose,
  className,
}: PopupProps) {
  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-10">
      <div
        className={cn(
          'bg-white pt-6 p-4 rounded shadow-md w-72 relative',
          className,
        )}
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          <XMarkIcon className="size-7 text-gray-500 hover:text-gray-800" />
        </button>
        {children}
      </div>
    </div>
  );
}
