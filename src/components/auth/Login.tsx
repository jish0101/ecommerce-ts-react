"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MutedPara from "../typography/MutedPara";
import H2 from "../typography/H2";
import { Link } from "react-router-dom";
import P from "../typography/P";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().trim().min(1, "This is required*").max(1000, "This is too long!!").email("This is not a valid email*"),
  password: z.string().trim().min(1, "This is required*").max(1000, "This is too long!!"),
});

function Login() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log("Form submitted with:", data);
  };

  return (
    <main>
      <div className="flex justify-center items-center min-h-[calc(100vh-70px)]">
        <Card className="md:min-w-[375px] min-w-[calc(100%-2rem)]">
          <CardHeader>
            <CardTitle>
              <H2>Login</H2>
            </CardTitle>
            <CardDescription>
              <MutedPara>
                Login to your account.
              </MutedPara>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 justify-center w-full items-center">
              <P>Does not have an account yet ?</P><Link className={cn(buttonVariants({variant: "link"}), "p-0")} to={"/auth/signup"}>Click here</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

export default Login;
