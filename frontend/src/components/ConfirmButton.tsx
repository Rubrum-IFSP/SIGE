import "./ConfirmButton.css";

interface Props {
  text: string;
}
export default function ConfirmButton({ text }: Props) {
  return (
    <div className="buttonWrapper">
      <button>{text}</button>
    </div>
  );
}
