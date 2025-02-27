// import { FormLabel, Input } from "@janbox/ds";
// import { UseFormRegister } from "react-hook-form";

// const InputForm = ({
//   id,
//   label,
//   className,
//   placeholder,
//   disable,
//   error,
//   register,
//   value,
//   handleOnChange,
// }: {
//   id: string;
//   label?: string;
//   className?: string;
//   placeholder?: string;
//   disable?: boolean;
//   error?: string | undefined;
//   register: UseFormRegister<any>;
//   value?: string;
//     handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => {
//   return (
//     <div className="space-y-2">
//       <FormLabel className={label ? "" : "invisible"}>{label || "Label"}</FormLabel>
//       <Input
//         id={id}
//         className={className}
//         hiddenClose
//         onClearData={function Ga() {}}
//         placeholder={placeholder}
//         disabled={disable}
//         {...register(id)}
//         value={value}
//         onChange={handleOnChange}
//       />
//       {error && <span className="text-ic-red-6s">{error}</span>}
//     </div>
//   );
// };

// export default InputForm;
