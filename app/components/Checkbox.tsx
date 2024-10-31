import { ChangeEventHandler } from "react";

type Props = {
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({ label, handleChange }: Props) => {
  return (
    <label className="label justify-normal p-0">
      <input type="checkbox" className="checkbox" onChange={handleChange} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
