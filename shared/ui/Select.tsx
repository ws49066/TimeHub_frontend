type SelectProps = {
  label: string
  error?: string
  required?: boolean
  stylesOverride?: string
  options: {
    value: string
    label: string
  }[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

export function Select({
  label,
  error,
  required,
  stylesOverride,
  options,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium">
        {label}{' '}
        {required && (
          <span className="font-normal text-xs">(Obrigatório)</span>
        )}
      </label>

      <select
        {...props}
        className={`
          w-full
          px-3
          h-10
          border
          rounded
          font-normal
          ${stylesOverride ?? 'text-sm'}
          md:h-11
          bg-white
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <option value="">Selecione uma opção</option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
