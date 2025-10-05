import Button from '@/components/base/Button';
import { getAddressError } from '@/utils/form';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/dist/client/components/navigation';
import { isAddress } from 'viem';
import FormInput from '../base/form/Input';

export default function SearchGameForm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      gameAddress: '',
    },
    onSubmit: ({ value }) => {
      const trimmedAddress = value.gameAddress.trim();
      if (!isAddress(trimmedAddress)) {
        return new Error('Invalid address');
      }
      router.push(`/game/${trimmedAddress}`);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-4">
        <form.Field
          name="gameAddress"
          asyncDebounceMs={500}
          validators={{
            onBlur: ({ value }) => getAddressError(value),
            onChangeAsync: ({ value }) => getAddressError(value),
          }}
          children={(field) => (
            <FormInput
              type="text"
              field={field}
              placeholder="Enter Game Address to join"
            />
          )}
        />
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button
              className="mt-2 w-full"
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
            >
              Join Game
            </Button>
          )}
        />
      </div>
    </form>
  );
}
