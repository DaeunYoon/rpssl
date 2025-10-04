type Value = string | bigint | null;
interface DataColumnProps<T extends Value, R extends Value> {
  label: string;
  formatter?: (value: T) => R;
  link?: string;
  hideIfEmpty?: boolean;
  value: T;
  suffix?: string;
}

function DataColumn<T extends Value, R extends Value>({
  label,
  formatter,
  value,
  link,
  hideIfEmpty,
  suffix,
}: DataColumnProps<T, R>) {
  const formattedValue = formatter ? formatter(value) : value;

  if (hideIfEmpty && !formattedValue) {
    return null;
  }

  const valueInString = formattedValue
    ? `${String(formattedValue)} ${suffix || ''}`
    : undefined;
  return (
    <div
      className="flex gap-2"
      title={valueInString ? String(valueInString) : undefined}
    >
      <span className="font-semibold">{label}: </span>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {valueInString}
        </a>
      ) : (
        <span>{valueInString}</span>
      )}
    </div>
  );
}
export default DataColumn;
