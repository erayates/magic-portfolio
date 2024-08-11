import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

import dayjs from "dayjs";
import { SanityImageAsset } from "../../sanity.types";

interface Props {
  title?: string;
  description?: string;
  dates?: string;
  company?: string;
  image?: object;
  link?: string;
  locale: string;
}

export default function CertificateCard({
  title,
  description,
  dates,
  company,
  image,
  link,
  locale,
}: Props) {
  function urlFor(source: SanityImageAsset): string {
    return `${imageUrlBuilder(client).image(source).fit("max").auto("format")}`;
  }

  dayjs.locale(locale);

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage
            src={urlFor(image as unknown as SanityImageAsset)}
            alt={title}
            className="object-contain"
          />
          <AvatarFallback>{title}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        {dates && (
          <time className="text-xs text-muted-foreground">
            {dayjs(dates).format("MMMM YYYY")}
          </time>
        )}
        <h2 className="font-semibold leading-none">{title}</h2>
        {company && <p className="text-sm text-muted-foreground">{company}</p>}
        {description && (
          <span className="prose dark:prose-invert text-sm text-muted-foreground">
            {description}
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
        <Link href={link ?? "#"}>
          <Badge title={"Certificate"} className="flex gap-2">
            Certificate
          </Badge>
        </Link>
      </div>
    </li>
  );
}
