"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { login } from "@/actions/login";

import { toast } from "sonner";
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { LoginSchema } from "@/schemas";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error, {
              position: "top-center",
              duration: 3000,
              icon: <MdError className="text-xl text-red-500" />,
            });
          } else if (data?.success) {
            form.reset();
            toast.success(data.success, {
              position: "top-center",
              duration: 3000,
              icon: <FaCheckCircle className="text-xl text-green-500" />,
            });
          } else if (data?.twoFactor) {
            setIsShowTwoFactor(true);
          }
        })
        .catch(() => {
          toast.error(urlError || "something went wrong", {
            position: "top-center",
            duration: 3000,
          });
        });
    });
  };

  return (
    <CardWrapper
      headerLabel={isShowTwoFactor ? "Two factor authentication" : "Sign in"}
      backButtonLabel={!isShowTwoFactor ? "Already have an account?" : ""}
      backButtonHref="/auth/register"
      showSocial={!isShowTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {isShowTwoFactor ? (
            <div className="space-y-4 text-center">
              <div className="grid place-items-center">
                <InputOTP
                  maxLength={6}
                  value={form.watch("code")}
                  onChange={(value) => form.setValue("code", value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {form.getFieldState("code").error && (
                <p className="text-red-500">
                  {form.getFieldState("code").error?.message}
                </p>
              )}
              <FormDescription>Enter two factor password.</FormDescription>
            </div>
          ) : (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="thawatchai.krai@email.com"
                        type="email"
                        autoComplete="username"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        autoComplete="current-password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button size="sm" variant="link">
                      <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <ScaleLoader color="#FFF" height={20} />
            ) : (
              <>{isShowTwoFactor ? "Confirm" : "Login"}</>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
