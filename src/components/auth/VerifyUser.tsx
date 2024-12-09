import { z, ZodError } from 'zod';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useLayoutEffect, useState } from 'react';
import H2 from '../typography/H2';
import MutedPara from '../typography/MutedPara';
import { Button } from '../ui/button';
import { asyncWrapper } from '@/lib/utils';
import { reSendOtp, resetPassword, verifyUser } from '@/api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { NUMBER_REGEX, PASSWORD_REGEX } from '@/lib/regexHelpers';
import { Eye, EyeClosed } from 'lucide-react';

const schema = z.object({
  userId: z
    .string()
    .trim()
    .min(0, 'User id not found')
    .max(100, 'User id is invalid'),
  otpId: z
    .string()
    .trim()
    .min(0, 'Otp id not found')
    .max(100, 'Otp id is invalid'),
  type: z.enum(['FORGOT PASSWORD', 'EMAIL VERIFICATION'])
});

const pwdSchema = z.object({
  otp: z.string().regex(NUMBER_REGEX, `Otp should only be in number`),
  password: z
    .string()
    .trim()
    .min(1, 'This is required*')
    .regex(
      PASSWORD_REGEX,
      `Minimum 8 chars, one uppercase, lowercase, number and a special char`
    )
});

type OtpData = {
  otpId: string;
  userId: string;
  type: 'FORGOT PASSWORD' | 'EMAIL VERIFICATION';
};

const VerifyUser = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [otpDetails, setOtpDetails] = useState<OtpData | null>(() => {
    if (!location.state) return null;
    return {
      type: location.state.type,
      otpId: location.state.otpId,
      userId: location.state.userId
    };
  });
  const [inputType, setInputType] = useState<'password' | 'text'>('password');
  const [form, setForm] = useState({ otp: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handlePasswordView = () => {
    setInputType((prev) => {
      return prev === 'text' ? 'password' : 'text';
    });
  };

  // For verifying user account
  const handleVerifyUser = async () => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      const { otpId, userId, type } = schema.parse(otpDetails);
      const { response, error } = await asyncWrapper(() =>
        verifyUser({
          _id: otpId,
          userId,
          value: form.otp,
          type
        })
      );

      if (error) {
        setIsLoading(false);
        return toast({
          title: 'Failed',
          description: error.response
            ? error.response.data?.message
            : error.message
        });
      }

      const {
        data: { status, data, message }
      } = response!;

      if (status === 200 && data) {
        toast({
          title: 'Success',
          description: message
        });
        setIsLoading(false);
        navigate('/auth/login');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: 'Failed',
        description: error.message
      });
    }
  };

  // For password reset
  const handleUpdatePassword = async () => {
    try {
      const { otp, password } = pwdSchema.parse(form);
      const { otpId, userId, type } = schema.parse(otpDetails);

      setIsLoading(true);

      const { response, error } = await asyncWrapper(() =>
        resetPassword({
          _id: otpId,
          value: otp,
          type,
          userId,
          password
        })
      );

      if (error) {
        setIsLoading(false);
        return toast({
          title: 'Failed',
          description: error.response
            ? error.response.data?.message
            : error.message
        });
      }

      const {
        data: { status, data, message }
      } = response!;

      if (status === 200 && data) {
        setIsLoading(false);
        toast({
          title: 'Success',
          description: message
        });
        navigate('/auth/login');
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

  // For resending otp
  const handleResendOtp = async () => {
    try {
      const { userId, type } = schema.parse(otpDetails);

      setIsSendingOtp(true);
      const { response, error } = await asyncWrapper(() =>
        reSendOtp({
          userId,
          type
        })
      );

      if (error !== null) {
        setIsSendingOtp(false);
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
        setIsSendingOtp(false);
        toast({
          title: 'Success',
          description: message
        });
        setOtpDetails({
          otpId: details?.otp?._id,
          userId: details?.otp?.user,
          type: details?.otp?.type
        });
      }
    } catch (error: any) {
      setIsSendingOtp(false);
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

  const submitActionMap: Record<OtpData['type'], () => void> = {
    'EMAIL VERIFICATION': handleVerifyUser,
    'FORGOT PASSWORD': handleUpdatePassword
  };

  const handleVerify = () => {
    if (!otpDetails) return;

    submitActionMap[otpDetails.type]();
  };

  useLayoutEffect(() => {
    if (!otpDetails) {
      navigate('/');
    }
  }, [otpDetails]);

  return (
    <div className="grid place-content-center md:min-h-[calc(90vh-70px)]">
      <Card className="min-w-[calc(100%-2rem)] text-center md:max-w-[375px]">
        <CardHeader>
          <CardTitle>
            <H2>OTP sent to your email.</H2>
          </CardTitle>
          <CardDescription>
            <MutedPara>Enter it below to verify yourself.</MutedPara>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="mx-auto flex w-[275px] flex-col items-start">
              <label>Enter Otp</label>
              <InputOTP
                maxLength={6}
                value={form.otp}
                containerClassName="justify-center w-full"
                onChange={(value) => setForm({ ...form, otp: value })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {otpDetails && otpDetails.type === 'FORGOT PASSWORD' ? (
              <div className="mx-auto flex w-[275px] flex-col items-start">
                <label>Enter new password</label>
                <div className="relative w-full">
                  <Input
                    type={inputType}
                    value={form.password}
                    placeholder="Enter new password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    variant={'link'}
                    className="absolute right-0 top-0"
                    onClick={handlePasswordView}
                  >
                    {inputType === 'password' ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-center gap-2">
            <Button disabled={isLoading} onClick={handleVerify}>
              {isLoading ? 'Verifying..' : 'Verify'}
            </Button>
            <Button disabled={isSendingOtp} onClick={handleResendOtp}>
              {isSendingOtp ? 'Sending..' : 'Resend otp'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyUser;
