import Image from "next/image";
import { site } from "@/content";

export default function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <span className="brand-lockup" role="img" aria-label={site.name}>
      <Image
        src={light ? "/brand/yarn-mark-light.svg" : "/brand/yarn-mark.svg"}
        width={36}
        height={36}
        alt=""
        aria-hidden="true"
      />
      <span className="brand-wordmark" aria-hidden="true">AISSS</span>
    </span>
  );
}
