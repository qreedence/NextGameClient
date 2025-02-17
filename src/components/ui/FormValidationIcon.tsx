import { Check, X } from "lucide-react";

interface FormValidationIconProps {
  valid: boolean;
}

const FormValidationIcon = ({ valid }: FormValidationIconProps) => {
  return (
    <>
      {valid ? (
        <Check className="mb-2.5 text-success" />
      ) : (
        <X className="mb-2.5 text-error" />
      )}
    </>
  );
};

export default FormValidationIcon;
