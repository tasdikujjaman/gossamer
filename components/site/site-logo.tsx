import Image from 'next/image';

export default function SiteLogo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/gossamer-mark.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
}
