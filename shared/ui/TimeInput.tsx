'use client'

import dayjs, { Dayjs } from 'dayjs'
import { Controller, Control } from 'react-hook-form'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type TimeInputProps = {
  label: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  error?: string
  required?: boolean
}

export function TimeInput({
  label,
  name,
  control,
  error,
  required,
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[14px] font-medium">
        {label}{' '}
        {required && (
          <span className="font-normal text-xs">(Required)</span>
        )}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampm={false}
              views={['hours', 'minutes']}
              timeSteps={{ minutes: 30 }}
              value={field.value ? dayjs(field.value, 'HH:mm') : null}
              onChange={(value: Dayjs | null) =>
                field.onChange(value ? value.format('HH:mm') : '')
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error,
                  helperText: error,
                  placeholder: '00:00',
                  InputLabelProps: { shrink: false },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: '36px',
                      borderRadius: '5px',
                      fontSize: '14px',
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        )}
      />

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  )
}
