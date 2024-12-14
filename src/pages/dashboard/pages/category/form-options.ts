import { CustomInputOptions } from '@/lib/forms/RenderInputs';

export const getInputOptions = <T extends Record<string, any>>(): Record<keyof T, CustomInputOptions> => {
  return {
    name: {
      type: 'text',
      placeholder: 'Enter name'
    }
  } as Record<keyof T, CustomInputOptions>;
};
