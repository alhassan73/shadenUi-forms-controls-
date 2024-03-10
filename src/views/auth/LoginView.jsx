"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/forms/input-password/InputPassword";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email address is required"),
  password: z.string().min(8, "Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginView() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values) {
    console.log("Form Value", values);
  }

  return (
    <div className="container py-10 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full mx-auto rounded-xl shadow-xl border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="px-6 py-10">
              <div className="mb-10">
                <h1 className="capitalize font-bold text-3xl text-center">
                  login
                </h1>
              </div>

              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Email</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter your"
                          type="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <InputPassword label="User Password" form={form} />
              </div>

              <Button type="submit" className="w-full mt-10">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
