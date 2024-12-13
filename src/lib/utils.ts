import { AxiosResponse } from 'axios';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

type AsyncHandlerResponse<T> =
  | { response: AxiosResponse<T>; error: null }
  | { response: null; error: any };

type AsyncHandlerCallBack<T> = () => Promise<AxiosResponse<T>>;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const asyncWrapper = async <T>(
  fn: AsyncHandlerCallBack<T>
): Promise<AsyncHandlerResponse<T>> => {
  try {
    const response = await fn();
    return { response, error: null };
  } catch (error) {
    return { response: null, error };
  }
};

export const removeFields = (key: string, obj: Record<any, any>): Record<any, any> => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    if (k !== key) {
      acc[k] = v;
    }
    return acc;
  }, {} as Record<any, any>);
};

export const isImageValid = (images: File[], size: number) => {
  let isValid = true;
  
  images.forEach(image => {
    if (image.size <= size) return;
    isValid = false;
  })

  return isValid;
}