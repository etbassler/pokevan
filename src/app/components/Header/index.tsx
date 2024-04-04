import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full flex justify-center">
      <div className="z-10 max-w-5xl w-full flex justify-center py-5">
        <Link href="/" data-testid="header-link">
          <span className="sr-only">Home</span>
          <Image
            src="/images/logo.png"
            alt="pok-evan-logo"
            width={200}
            height={200}
            data-testid="header-logo"
          />
        </Link>
      </div>
    </header>
  );
};
