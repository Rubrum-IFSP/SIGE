import "./inputField.css";

interface Props {
  type: string;
  labelText: string;
  nameInput: string;
}

function InputField({ type, labelText, nameInput }: Props) {
  return (
    <div className="inputFieldWrapper">
      <label>{labelText}</label>
      <input name={nameInput} type={type}></input>
    </div>
  );
}
export default InputField;
