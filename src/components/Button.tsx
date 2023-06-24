import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

type IProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    loading?: boolean;
    label: string;
    className?: string;
  };

const Button: React.FC<IProps> = ({
  loading,
  label,
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} disabled={loading} className={className}>
      {children ? <div className="mr-20">{children}</div> : null}
      {label}
    </button>
  );
};

export default Button;
