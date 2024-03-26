import Image from "next/image";
import Link from "next/link";

type ContentSectionProps = {
  header: string;
  content: string | JSX.Element | number;
};

export const ContentSection = ({ header, content }: ContentSectionProps) => {
  return (
    <div
      className=" font-semibold text-gray-800"
      data-testid={`contentsection-${header}`}
    >
      <h2 className="text-2xl">{header}</h2>
      <div>{content}</div>
    </div>
  );
};
