import P from '../typography/P';
import { cn, removeFields } from '@/lib/utils';
import React, { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Button } from './button';
import { CircleX } from 'lucide-react';

interface FilesInputProps extends React.HTMLAttributes<HTMLDivElement> {
  maxFiles: number;
  accepts?: Accept;
  error?: string;
  multiple?: boolean;
  inputState: Record<string, File>;
  inputChangeHandler: (files: Record<string, File>) => void;
}

const FilesInput: React.FC<FilesInputProps> = ({
  accepts,
  className,
  inputState,
  inputChangeHandler,
  error,
  multiple = true,
}) => {
  const files = Object.entries(inputState);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.reduce((files, file, i) => ({...files, [i.toString()]: file}), {})
      inputChangeHandler(
        multiple ? {...inputState, ...files} : {1: acceptedFiles[0]}
      );
    },
    [inputState, inputChangeHandler, multiple]
  );

  const removeHandler = (idx: string) => {
    inputChangeHandler(removeFields(idx, inputState))
  }

  const getFileName = (s: string) => {
    try {
      return s.split(".")[0].substring(1,5).concat(".", s.split(".")[s.split(".").length-1])
    } catch (error) {
      return "";
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accepts,
    multiple
  });
  
  return (
    <div className={cn('flex w-full h-full flex-col gap-2', className)}>
      <div
        {...getRootProps({
          className: cn(
            'border-2 w-full h-full flex items-center justify-center border-dashed rounded-md text-center cursor-pointer',
            isDragActive ? 'bg-foreground' : 'bg-background'
          )
        })}
      >
        <input {...getInputProps()} />
        <P className={cn('[&:not(:first-child)]:mt-0', isDragActive ? "text-background": null)}>
          {isDragActive
            ? 'Drop files here...'
            : 'Drag and drop files here, or click to select'}
        </P>
      </div>

      <div className={cn('overflow-x-auto flex items-center', files.length && "h-60")}>
      {files && files.length > 0 && (
        <div className={cn("flex w-max items-center gap-4 p-2")}>
          {files.map(([key, file]) => (
            <div className={cn('relative', file?.type ? "w-20": "w-full")} key={key}>
              <Button onClick={() => removeHandler(key)} type='button' className='absolute top-[-10px] right-[-10px] h-6 w-6 p-0 rounded-full [&_svg]:size-6'>
                <CircleX />
              </Button>
              {file?.type?.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-20 w-20 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <p className="text-xs text-gray-600">{getFileName(file?.name)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FilesInput;
