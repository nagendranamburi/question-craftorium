
import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({ label, children, className = '' }: FormFieldProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-darker mb-1">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;
