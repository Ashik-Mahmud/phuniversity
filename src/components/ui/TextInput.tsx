import { HTMLProps, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import cn from "../../utils/cn";

type Props = {
  label: string;
  name?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  register?: any;
  wrapperClass?: string;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
} & HTMLProps<HTMLInputElement>;

const TextInput = ({
  label,
  name,
  placeholder,
  type,
  required,
  register,
  errorMessage,
  wrapperClass,
  ...rest
}: Props) => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  return (
    <div className={cn("w-full", wrapperClass)}>
      {label ?? (
        <label htmlFor="name" className="text-[15px] font-[400]">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
      )}
      <div className="w-full relative">
        <input
          type={isEyeOpen ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
          {...register}
          {...rest}
        />
        {type === "password" ? (
          <>
            {isEyeOpen ? (
              <IoEyeOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </>
        ) : null}
      </div>
      {errorMessage ? (
        <small className="text-red-400">{errorMessage.toString()}</small>
      ) : null}
    </div>
  );
};

export default TextInput;
