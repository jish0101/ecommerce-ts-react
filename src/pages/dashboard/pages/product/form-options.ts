import { CustomInputOptions, SelectOption } from '@/lib/forms/RenderInputs';

export const getProductInputOptions = <T extends Record<string, any>>(
  categories: SelectOption[]
): Record<keyof T, CustomInputOptions> => {
  return {
    name: {
      type: 'text',
      placeholder: 'Enter name'
    },
    category: {
      customType: 'select',
      options: categories,
      placeholder: 'Select category'
    },
    price: {
      type: 'number',
      placeholder: 'Enter price'
    },
    desc: {
      type: 'text',
      customType: 'textarea',
      placeholder: 'Enter description',
      className: 'w-full min-h-[50px]'
    },
    stock: {
      type: 'number',
      placeholder: 'Enter stock'
    }
  } as Record<keyof T, CustomInputOptions>;
};
