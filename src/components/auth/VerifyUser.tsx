import { z } from 'zod';
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
import { useEffect, useState } from 'react';
import H2 from '../typography/H2';
import MutedPara from '../typography/MutedPara';
import { Button } from '../ui/button';
import { asyncWrapper } from '@/lib/utils';
import { reSendOtp, verifyUser } from '@/api/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
    .max(100, 'Otp id is invalid')
});

type Props = {};

type OtpData = {
  otpId: string;
  userId: string;
  type: "FORGOT PASSWORD" | "EMAIL VERIFICATION"
}

const VerifyUser = ({}: Props) => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [otpDetails, setOtpDetails] = useState<OtpData | null>(() => {
    if (location.state) {
      return {
        otpId: location.state.otpId,
        userId: location.state.otpId,
        type: "EMAIL VERIFICATION",
      }
    }
    return null;
  })
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      const { otpId, userId } = schema.parse(otpDetails);
      const { response, error } = await asyncWrapper(() =>
        verifyUser({
          _id: otpId,
          userId,
          value,
          type: 'EMAIL VERIFICATION'
        })
      );

      if (error) {
        setIsLoading(false);
        return toast({
          title: 'Failed',
          description: error.response ? error.response.data?.message : error.message
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

  const handleResendOtp = async () => {
    try {
      const {response, error} = await asyncWrapper(() => reSendOtp({}))

      if (error !== null) {
        toast({
          title: 'Failed',
          description: error.response ? error.response?.data.message: error.message
        });

        if (error.response && error.response?.data === false) {
          if (error.response.data.message === "User is already verified") {
            navigate("/auth/login")
          }
          if (error.response.data.message === "User not found") {
            navigate("/auth/signup")
          }
        }
        return;
      }
      
      const {data: {status, details, message}} = response!;

      if (status === 200) {
        toast({
          title: 'Success',
          description: message
        });
        setOtpDetails({
          otpId: details?.otp?._id,
          userId: details?.otp?.user,
          type: details?.otp?.type
        })
      } else {
        toast({
          title: 'Failed',
          description: message
        });
      }

    } catch (error: any) {
      toast({
        title: 'Failed',
        description: error.message
      });
    }
  }

  useEffect(() => {
    if (!otpDetails) {
      navigate('/');
    }
  }, [otpDetails]);

  return (
    <div className="grid place-content-center h-screen">
      <Card className="md:min-w-[475px] min-w-[calc(100%-2rem)] text-center">
        <CardHeader>
          <CardTitle>
            <H2>OTP sent to your email.</H2>
          </CardTitle>
          <CardDescription>
            <MutedPara>Enter it below to verify your account.</MutedPara>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP
            maxLength={6}
            value={value}
            containerClassName="justify-center"
            onChange={(value) => setValue(value)}
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
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 justify-center w-full items-center">
            <Button disabled={isLoading} onClick={handleVerify}>
              {isLoading ? 'Verifying..' : 'Verify'}
            </Button>
            <Button disabled={isLoading} onClick={handleResendOtp}>
              {isLoading ? 'Sending..' : 'Resend otp'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyUser;
