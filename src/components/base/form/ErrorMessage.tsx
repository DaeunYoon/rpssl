export default function FormErrorMessage({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  const uniqueErrors = Array.from(new Set(errors));

  return (
    <div className="mt-1 text-sm text-red-500">
      {uniqueErrors.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
    </div>
  );
}
