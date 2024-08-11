import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

import { client } from "@/sanity/lib/client";

import dayjs from "dayjs";
import { Icons } from "./icons";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageAsset } from "../../sanity.types";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: string;
  image?: object;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  endedAt: string;
  startedAt: string;
  className?: string;
  sourceUrl?: string;
  websiteUrl?: string;
  locale: string;
}

export function ProjectCard({
  title,
  description,
  startedAt,
  endedAt,
  tags,
  link,
  image,
  sourceUrl,
  websiteUrl,
  className,
  locale,
}: Props) {
  function urlFor(source: SanityImageAsset): string {
    return `${imageUrlBuilder(client).image(source).fit("max").auto("format")}`;
  }

  dayjs.locale(locale);

  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={websiteUrl || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {image && (
          <Image
            src={urlFor(image as unknown as SanityImageAsset)}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">
            {dayjs(startedAt).format("MMMM YYYY")} -{" "}
            {dayjs(endedAt).format("MMMM YYYY")}
          </time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <div className="flex flex-row flex-wrap items-start gap-1">
          {websiteUrl && (
            <Link href={websiteUrl} target="_blank">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                {<Icons.globe className="w-3 h-3" />}
                Website
              </Badge>
            </Link>
          )}

          {sourceUrl && (
            <Link href={sourceUrl} target="_blank">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                {<Icons.github className="w-3 h-3" />}
                Source
              </Badge>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
