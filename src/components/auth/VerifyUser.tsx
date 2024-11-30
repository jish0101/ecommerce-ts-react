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
import { useState } from 'react';
import H2 from '../typography/H2';
import MutedPara from '../typography/MutedPara';
import { Button } from '../ui/button';
import { asyncWrapper } from '@/lib/utils';
import { verifyUser } from '@/api/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = z.object({
  userId: z.string().trim().min(0, "User id not found").max(100, "User id is invalid"),
  otpId: z.string().trim().min(0, "Otp id not found").max(100, "Otp id is invalid"),
})

type Props = {};

const VerifyUser = ({}: Props) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [value, setValue] = useState('');
  const params = new URLSearchParams(location.search);
  const parsedParams = Object.fromEntries(params.entries())

  const handleVerify = async () => {
    try {
      const {otpId,userId} = schema.parse(parsedParams);
      const {response,error} = await asyncWrapper(() => verifyUser({ 
        _id: otpId,
        userId,
        value,
        type: "EMAIL VERIFICATION"
      }));

      if (error) {
        return console.log("Server error: ", error.message)
      }
  
      const {data: {status,data,message}} = response!;
  
      if (status === 200 && data) {
        console.log(message);
        navigate("/auth/login")
      }
    } catch (error) {
      // Toast here
    }
  }

  return (
    <div className='grid place-content-center h-screen'>
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
            containerClassName='justify-center'
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
            <Button onClick={handleVerify}>
              Verify
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyUser;
