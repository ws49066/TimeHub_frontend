type InputProps = {
  label: string
  error?: string
  required?: boolean
  stylesOverride?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({ label, error, required, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2.5">

      <label className="text-[14px] font-medium">{label} {required && <span className="font-normal text-xs">(Required)</span>}</label>

      <input
        {...props}
        className={`
            w-full
            py-
            px-3.25
            h-11
            border
            rounded-[5px]
            border-[#d7d7d7]
            font-normal
            text-[14px]
            disabled:cursor-not-allowed 
            disabled:bg-[#d5d5d5]
          ${error ? 'border-red-500' : ' border-[#d7d7d7]'}

        `}
      />

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}
