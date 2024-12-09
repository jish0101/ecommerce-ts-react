import { z, ZodError } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import H2 from '../typography/H2';
import MutedPara from '../typography/MutedPara';
import { Button } from '../ui/button';
import { asyncWrapper } from '@/lib/utils';
import { reSendOtp } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email')
    .max(150, 'This is too long/invalid')
    .email('This is an invalid email')
});

const ResetPassport = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      const { email } = schema.parse({ email: value });
      const { response, error } = await asyncWrapper(() =>
        reSendOtp({
          email,
          type: 'FORGOT PASSWORD'
        })
      );

      if (error !== null) {
        setIsLoading(false);
        toast({
          title: 'Failed',
          description: error.response
            ? error.response?.data.message
            : error.message
        });

        if (error.response && error.response?.data === false) {
          if (error.response.data.message === 'User is already verified') {
            navigate('/auth/login');
          }
          if (error.response.data.message === 'User not found') {
            navigate('/auth/signup');
          }
        }
        return;
      }

      const {
        data: { status, details, message }
      } = response!;

      if (status === 200) {
        setIsLoading(false);
        toast({
          title: 'Success',
          description: message
        });
        navigate('/auth/verify-user', {
          state: {
            otpId: details?.otp?._id,
            userId: details?.otp?.user,
            type: details?.otp?.type
          }
        });
      } else {
        setIsLoading(false);
        toast({
          title: 'Failed',
          description: message
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error instanceof ZodError) {
        return toast({
          title: 'Validation Error',
          description: error.issues.at(0)?.message
        });
      }
      toast({
        title: 'Failed',
        description: error.message
      });
    }
  };

  return (
    <div className="mt-24 grid place-content-center md:mt-0 md:min-h-[calc(90vh-70px)]">
      <Card className="min-w-[calc(100%-2rem)] text-center md:max-w-[375px]">
        <CardHeader>
          <CardTitle>
            <H2>Reset your password</H2>
          </CardTitle>
          <CardDescription>
            <MutedPara>Give us your account email.</MutedPara>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            className="mx-auto max-w-[275px]"
            placeholder="Enter your email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={handleSendOtp}
            >
              {isLoading ? 'Sending..' : 'Send'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassport;
