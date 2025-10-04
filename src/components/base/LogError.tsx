import { safeStringify } from '@/utils';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

type LogErrorProps = {
  error: unknown;
};

export default function LogError({ error }: LogErrorProps) {
  if (!error) return null;

  const message: string =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unknown error occurred.';

  return (
    <div className="space-y-4 w-full overflow-auto rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
      {/* Error summary */}
      <p className="font-semibold">Error: {message}</p>

      {/* Full error log */}
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="py-1 text-sm font-medium hover:underline">
              {open ? 'Hide full error log' : 'Show full error log'}
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-xs text-gray-600">
              <pre className="max-h-64 overflow-auto rounded bg-gray-100 p-2">
                {safeStringify({
                  name: (error as any)?.name,
                  message: (error as any)?.message,
                  stack: (error as any)?.stack,
                  cause: (error as any)?.cause,
                  ...error,
                })}
              </pre>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
