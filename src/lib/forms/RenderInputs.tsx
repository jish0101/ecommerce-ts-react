import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { cn } from '../utils';
import { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { FieldValues, UseFormReturn, FieldPath } from 'react-hook-form';

export type SelectOption = { label: string; value: string };

export interface CustomInputOptions
  extends InputHTMLAttributes<HTMLInputElement> {
  customType?: 'select' | 'textarea';
  options?: SelectOption[];
}

type RenderInputProps<T extends FieldValues> = {
  labelClassName?: string;
  inputClassName?: string;
  form: UseFormReturn<T>;
  inputOptions: Record<FieldPath<T>, CustomInputOptions>;
};

export default function RenderInputs<T extends FieldValues>({
  form,
  inputOptions,
  labelClassName,
  inputClassName
}: RenderInputProps<T>) {
  return (
    <>
      {Object.keys(inputOptions).map((key) => (
        <FormField
          key={key}
          name={key as FieldPath<T>}
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className={cn('capitalize', labelClassName)}>
                  {field.name}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(inputClassName)}
                    {...field}
                    {...inputOptions[key as FieldPath<T>]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      ))}
    </>
  );
}
