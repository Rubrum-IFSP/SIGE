import "./AdmWrapper.css";

interface Props {
  children: any;
}

export default function AdmWrapper({ children }: Props) {
  return <div className="admWrapper">{children}</div>;
}
