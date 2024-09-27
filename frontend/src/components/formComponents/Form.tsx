import "./Form.css";

interface Props {
  inputFields: any;
  title: string;
  children: any;
}
function Form({ inputFields, children, title }: Props) {
  return (
    <div className="formWrapper">
      <form className="form">
        <h1>{title}</h1>
        {inputFields}
      </form>

      {children}
    </div>
  );
}
export default Form;
