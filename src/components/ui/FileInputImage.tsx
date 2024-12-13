import { Button } from './button';
import { CircleX } from 'lucide-react';
import { cn, removeFields } from '@/lib/utils';

type Props = {
  inputState: Record<string, File>;
  inputChangeHandler: (files: Record<string, File>) => void;
};

const FileInputImage = ({ inputState, inputChangeHandler }: Props) => {
  const files = Object.entries(inputState);

  const removeHandler = (idx: string) => {
    inputChangeHandler(removeFields(idx, inputState));
  };

  const getFileName = (s: string) => {
    try {
      return s
        .split('.')[0]
        .substring(1, 5)
        .concat('.', s.split('.')[s.split('.').length - 1]);
    } catch (error) {
      return '';
    }
  };

  return (
    <div
      className={cn(
        'flex items-center overflow-x-auto',
        files.length && 'h-60'
      )}
    >
      {files && files.length > 0 && (
        <div className={cn('flex w-max items-center gap-4 p-2')}>
          {files.map(([key, file]) => (
            <div
              className={cn('relative', file?.type ? 'w-20' : 'w-full')}
              key={key}
            >
              <Button
                onClick={() => removeHandler(key)}
                type="button"
                className="absolute right-[-10px] top-[-10px] h-6 w-6 rounded-full p-0 [&_svg]:size-6"
              >
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
                  <p className="text-xs text-gray-600">
                    {getFileName(file?.name)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInputImage;
