export default function FormErrorMessage({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;

  return (
    <div className="mt-1 text-sm text-red-500">
      {errors.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}
