import React from "react";

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validationIcon?: React.ReactNode;
    icon?: React.ReactNode;
    pattern?: string;
  }
  
  const InputField = ({ id, icon, label, type, value, onChange, validationIcon, pattern }: InputFieldProps) => {
    return (
        <div className="flex flex-row items-end gap-2">
            {icon}
            <div className="flex flex-col gap-2 w-full ">
                <label className="fieldset-label font-bold text-md" htmlFor={id}>
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={type === "password" ? undefined : label}
                    className="input w-full"
                    required
                    pattern={pattern}
                    name={id}
                />
            </div>
            {validationIcon}
        </div>
    )
  };
  
  export default InputField;