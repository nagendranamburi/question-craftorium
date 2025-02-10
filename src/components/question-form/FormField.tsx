
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-darker mb-1">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;
