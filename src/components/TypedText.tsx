import { ReactTyped } from "react-typed";

interface IProps {
  label: string;
  typeSpeed: number;
}

export default function TypedText({ label, typeSpeed }: IProps) {
  return <ReactTyped cursorChar="" strings={[label]} typeSpeed={typeSpeed} />;
}
