"use client";

import { forwardRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PasswordRules from "./PasswordRules";

const DynamicPasswordStrength = dynamic(() => import("./PasswordStrength"), {
  ssr: false,
});

const InputPassword = forwardRef((props, ref) => {
  const { form, label, showStrength, showValidationRules } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowPassword((prev) => !prev);
  };

  const watchPassword = form.watch("password");

  const [showPopover, setShowPopover] = useState(false);

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <FormField
      ref={ref}
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <div className="relative">
            {showValidationRules ? (
              <Popover open={showPopover} onOpenChange={() => null}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Input
                      placeholder="Enter your Password"
                      type={showPassword ? "text" : "password"}
                      className="pe-10"
                      {...field}
                      onClick={() => setShowPopover(true)}
                      onFocus={() => setShowPopover(true)}
                    />
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="p-0 border-gray-100"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  onEscapeKeyDown={handleClosePopover}
                  onPointerDownOutside={handleClosePopover}
                  onFocusOutside={handleClosePopover}
                >
                  <PasswordRules password={watchPassword} />
                </PopoverContent>
              </Popover>
            ) : (
              <FormControl>
                <Input
                  placeholder="Enter your Password"
                  type={showPassword ? "text" : "password"}
                  className="pe-10"
                  {...field}
                />
              </FormControl>
            )}

            <button
              type="button"
              aria-label="toggle show password"
              className="peer-disabled:cursor-not-allowed w-10 flex items-center justify-center absolute top-0 h-full ltr:right-0 rtl:left-0 flex-center text-gray-400"
              onClick={togglePassword}
            >
              {showPassword ? (
                <FaEye className="w-full aspect-square" />
              ) : (
                <FaEyeSlash className="w-full aspect-square" />
              )}
            </button>
          </div>

          {showStrength && watchPassword && (
            <DynamicPasswordStrength password={watchPassword} />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
});

InputPassword.displayName = "InputPassword";

export default InputPassword;
