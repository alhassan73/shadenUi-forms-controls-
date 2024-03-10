import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import wrongImg from "/public/images/icons/wrong-mark.svg";
import correctImg from "/public/images/icons/correct-mark.svg";

const lowerCaseRegex = /^(?=.*[a-z])/;
const upperCaseRegex = /^(?=.*[A-Z])/;
const specialCharacterRegex = /^(?=.*[@$!])/;
const minNumbersRegex = /^(?=.*\d)/;
const noSpacesRegex = /\s/;

const CheckListItem = ({ isValid, text }) => (
  <li
    className={cn("text-sm flex items-start w-full gap-2 py-1", {
      "text-gray-600": !isValid,
      "text-green-600": isValid,
    })}
  >
    {isValid ? (
      <Image
        src={correctImg?.src}
        alt={"Correct"}
        width={16}
        height={16}
        className="object-contain shrink-0 mt-1"
      />
    ) : (
      <Image
        src={wrongImg?.src}
        alt={"wrong"}
        width={16}
        height={16}
        className="object-contain shrink-0 mt-1"
      />
    )}

    {text}
  </li>
);

export default function PasswordRules({ password }) {
  const [passwordValidaity, setPasswordValidaity] = useState({
    minLength: null,
    lowerCase: null,
    upperCase: null,
    specialCharacter: null,
    minNumbers: null,
    noSpaces: null,
  });

  useEffect(() => {
    setPasswordValidaity({
      minLength: password?.trim()?.length >= 8,
      lowerCase: lowerCaseRegex.test(password),
      upperCase: upperCaseRegex.test(password),
      specialCharacter: specialCharacterRegex.test(password),
      minNumbers: minNumbersRegex.test(password),
      noSpaces: !noSpacesRegex.test(password),
    });
  }, [password]);

  return (
    <div
    // className={cn(
    //     "absolute left-1/2 -translate-x-1/2 min-w-[15rem] bg-white rounded-lg shadow-md border z-20 top-[calc(100%+5px)] overflow-hidden"
    // )}
    // onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-2 bg-gray-100">
        <h3 className="capitalize font-bold">Password Requirements</h3>
      </div>

      <ul className="p-3">
        <CheckListItem
          isValid={passwordValidaity?.minLength}
          text="No less than 8 characters, but preferably to be 14 characters or more."
        />

        <CheckListItem
          isValid={passwordValidaity?.lowerCase}
          text="Must includes at least 1 Lowercase letter."
        />

        <CheckListItem
          isValid={passwordValidaity?.upperCase}
          text="Must includes at least 1 Uppercase letter."
        />

        <CheckListItem
          isValid={passwordValidaity?.specialCharacter}
          text="Must includes one special character @$!"
        />

        <CheckListItem
          isValid={passwordValidaity?.minNumbers}
          text="Must includes at least 3 numbers."
        />

        <CheckListItem
          isValid={passwordValidaity?.noSpaces}
          text="Do not include spaces."
        />
      </ul>
    </div>
  );
}
