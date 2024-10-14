import "./NoticiasWrapper.css";

interface Props {
  children: any;
}

export default function NoticiasWrapper({ children }: Props) {
  return <div className="wrapper">{children}</div>;
}
