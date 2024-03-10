"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Rating } from "react-simple-star-rating";
import {
  FaCalendar,
  FaCheck,
  FaRegFaceFrown,
  FaRegFaceFrownOpen,
  FaRegFaceGrin,
  FaRegFaceGrinBeam,
  FaRegFaceGrinHearts,
  FaSort,
} from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import InputPassword from "./input-password/InputPassword";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

const countries = [
  { id: 1, label: "Egypt", value: "egypt" },
  { id: 2, label: "KSA", value: "ksa" },
  { id: 3, label: "UAE", value: "uae" },
];

const cities = [
  { id: 1, countryId: 1, label: "Alexandria", value: "alex" },
  { id: 2, countryId: 1, label: "Cairo", value: "cairo" },
  { id: 3, countryId: 1, label: "Mansoura", value: "mansoura" },
  { id: 4, countryId: 2, label: "Lorem", value: "lorem" },
  { id: 5, countryId: 2, label: "Ipsum", value: "ipsum" },
  { id: 6, countryId: 3, label: "Gada", value: "gada" },
];

const areas = [{ id: 1, cityId: 2, label: "Old Town", value: "old-town" }];

const genders = [
  { id: 0, label: "Male", value: "male" },
  { id: 1, label: "Female", value: "female" },
  { id: 2, label: "Others", value: "others" },
];

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(
      /^[a-zA-Z0-9_]*$/,
      "Name must contain only letters, numbers, or underscores"
    ),
  useremail: z
    .string()
    .email("Invalid email address")
    .min(1, "Email address is required"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[A-Za-z\d@$!]{8,}$/,
      "Password not Valid"
    ),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  terms: z.boolean(),
  gender: z.enum(["male", "female", "others"], {
    required_error: "You need to select gender type",
  }),
  marketingEmails: z.boolean().optional(),
  securityEmails: z.boolean(),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  birthday: z.date({
    required_error: "A date of birth is required.",
  }),
  // picture: z
  //     .instanceof(File)
  //     .optional()
  //     .refine((file) => {
  //         return !file || file.size <= MAX_UPLOAD_SIZE;
  //     }, "File size must be less than 3MB")
  //     .refine((file) => {
  //         return ACCEPTED_FILE_TYPES.includes(file.type);
  //     }, "File must be a PNG"),
});

const citiesForDefaultCountry = cities?.filter(
  (item) => item.countryId === countries[0].id
);

const defaultCity =
  citiesForDefaultCountry?.length > 0 ? citiesForDefaultCountry[0].value : "";

const defaultValues = {
  username: "Ahmed",
  useremail: "test@test.com",
  password: "",
  country: countries[0].value,
  city: defaultCity,
  area: "",
  terms: false,
  gender: "",
  marketingEmails: false,
  securityEmails: true,
  language: "en",
};

export default function FormControls() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  let [watchCountry, watchCity] = form.watch(["country", "city"]);

  const citiesOptions = useMemo(() => {
    return watchCountry
      ? cities?.filter(
          (item) =>
            item.countryId ===
            countries.find((el) => el.value === watchCountry)?.id
        )
      : [];
  }, [watchCountry]);

  useEffect(() => {
    form.setValue(
      "city",
      citiesOptions?.length > 0 ? citiesOptions[0].value : ""
    );
  }, [form, citiesOptions]);

  const [ratingValue, setRatingValue] = useState(2.5);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  function onSubmit(values) {
    console.log("Form Value", values);
    console.log("Star Rating", ratingValue);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ScrollArea className="h-[75vh]">
          <div className="p-6 space-y-4">
            {/* Normal input _ is the only special character available */}
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="user name"
                        // startIcon={<UserIcon />}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Required Input Email */}
            <div>
              <FormField
                control={form.control}
                name="useremail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email</FormLabel>

                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Input Password with Validation & Strength */}
            <div>
              <InputPassword
                label="Password"
                form={form}
                showStrength
                showValidationRules
              />
            </div>

            {/* Required Select with default value */}
            <div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Country" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {countries?.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Required Select related to country select each country has its own cities with default value */}
            <div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a City" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {citiesOptions?.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Required and Disabled unless you select cairo as city */}
            <div>
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={watchCity !== "cairo"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Area" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {areas?.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Check Box */}
            <div>
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <FormLabel>Accept Terms</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Radio Group */}
            <div>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-3"
                      >
                        {genders?.map((item) => (
                          <FormItem
                            key={item.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={item.value} />
                            </FormControl>

                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Switch */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Marketing emails</FormLabel>
                        <FormDescription>
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="securityEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Security emails</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* TextArea with Min and Max Characters */}
            <div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Combo Box with Search */}
            <div>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-fit">Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : "Select language"}
                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />

                          <CommandEmpty>No framework found.</CommandEmpty>

                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("language", language.value);
                                }}
                              >
                                {language.label}
                                <FaCheck
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DatePicker as Button with disable options */}
            <div>
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="w-fit">Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // fixedWeeks //  This will prevent the calendar to change its height when navigating.
                          weekStartsOn={0} // Sunday as first day of the week
                          firstWeekContainsDate={1} // Number the first week of the year from day 1
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Star Rating */}
            <div>
              <h2 className="mb-4">Simple Star Rating</h2>

              <Rating
                className="flex"
                initialValue={ratingValue}
                onClick={handleRating}
                transition
                allowFraction
                SVGclassName="inline"
                fillColorArray={[
                  "#f14f45",
                  "#f16c45",
                  "#f18845",
                  "#f1b345",
                  "#f1d045",
                ]}
                showTooltip
                tooltipClassName="text-sm"
                // tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
                customIcons={[
                  {
                    icon: <FaRegFaceFrown className="w-8 h-8 inline me-1" />,
                  },
                  {
                    icon: (
                      <FaRegFaceFrownOpen className="w-8 h-8 inline me-1" />
                    ),
                  },
                  {
                    icon: <FaRegFaceGrin className="w-8 h-8 inline me-1" />,
                  },
                  {
                    icon: <FaRegFaceGrinBeam className="w-8 h-8 inline me-1" />,
                  },
                  {
                    icon: (
                      <FaRegFaceGrinHearts className="w-8 h-8 inline me-1" />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center gap-4 p-6">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            disabled={!isDirty}
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button type="submit" className="flex-1">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
