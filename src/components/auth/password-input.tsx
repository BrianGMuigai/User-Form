import * as React from "react"
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Input } from "../ui/input";



export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({className, type, ...props }, ref) => {
    
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
      type={showPassword ? "text" : "password"}
      suffix={
        showPassword ? (
          <span className="select-none" onClick={() => setShowPassword(false)}>
            <FaRegEye size={15} />
          </span>
        ) : (
          <span className="select-none" onClick={() => setShowPassword(true)}>
            <IoEyeOff />
          </span>
        )
      }
      className={className}
      {...props}
      ref={ref}
    />
    
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
