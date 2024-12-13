import P from '../typography/P';
import { cn } from '@/lib/utils';
import React, { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

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
  multiple = true
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.reduce(
        (files, file, i) => ({ ...files, [i.toString()]: file }),
        {}
      );
      inputChangeHandler(
        multiple ? { ...inputState, ...files } : { 1: acceptedFiles[0] }
      );
    },
    [inputState, inputChangeHandler, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accepts,
    multiple
  });

  return (
    <div className={cn('flex h-full w-full flex-col gap-2', className)}>
      <div
        {...getRootProps({
          className: cn(
            'border-2 w-full h-full flex items-center justify-center border-dashed rounded-md text-center cursor-pointer',
            isDragActive ? 'bg-foreground' : 'bg-background'
          )
        })}
      >
        <input {...getInputProps()} />
        <P
          className={cn(
            '[&:not(:first-child)]:mt-0',
            isDragActive ? 'text-background' : null
          )}
        >
          {isDragActive
            ? 'Drop files here...'
            : 'Drag and drop files here, or click to select'}
        </P>
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FilesInput;
