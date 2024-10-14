import "./ConfirmButton.css";

interface Props {
  text: string;
  onClick: any;
}
export default function ConfirmButton({ text, onClick }: Props) {
  return (
    <div className="buttonWrapper">
      <button onClick={onClick}>{text}</button>
    </div>
  );
}
