import Image from "next/image";

export const Loader = () => {
  return (
    <Image
      src="/images/pokeball.svg"
      alt="pokeball"
      width={100}
      height={100}
      className="animate-spin"
      data-testid="loader"
    />
  );
};
