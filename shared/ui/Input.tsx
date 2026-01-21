type InputProps = {
  label: string
  error?: string
  required?: boolean
  stylesOverride?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({ label, error, required, stylesOverride, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs font-medium">{label} {required && <span className="font-normal text-xs">(Obrigatorio)</span>}</label>
      </div>

      <input
        {...props}
        className={`
            w-full
            px-3
            h-10
            border
            rounded
            font-normal
            ${ stylesOverride ?? 'text-sm' }
            leading-tight
            md:h-11
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}
