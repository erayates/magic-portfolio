import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import { client, sanityFetch } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import imageUrlBuilder from "@sanity/image-url";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getSinglePostQuery } from "@/sanity/lib/queries";
import { Post } from "../../../../../sanity.types";
import { getLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post: Post = await sanityFetch({
    query: getSinglePostQuery(params.slug),
    revalidate: 10,
  });

  const locale = await getLocale();

  const { title, description, publishedAt, mainImage } = post;

  let ogImage = mainImage
    ? `${process.env.NEXT_PUBLIC_BASEURL}${mainImage}`
    : `${process.env.NEXT_PUBLIC_BASEURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      url: `${process.env.NEXT_PUBLIC_BASEURL}/${locale}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post: Post = await sanityFetch({
    query: getSinglePostQuery(params.slug),
    revalidate: 10,
  });

  if (!post) {
    notFound();
  }

  function urlFor(source: string) {
    return `${imageUrlBuilder(client).image(source).fit("max").auto("format")}`;
  }

  const ptComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <Image
            alt={value.alt || " "}
            loading="lazy"
            height={400}
            width={700}
            src={urlFor(value)}
          />
        );
      },
    },
  };

  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            description: post.description,
            image: post.mainImage
              ? `${process.env.NEXT_PUBLIC_BASEURL}${post.mainImage}`
              : `${process.env.NEXT_PUBLIC_BASEURL}/og?title=${post.title}`,
            url: `${process.env.NEXT_PUBLIC_BASEURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Eray Ates",
            },
          }),
        }}
      />
      <h1 className="title font-bold uppercase text-2xl tracking-tighter max-w-[650px]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post._createdAt)}
          </p>
        </Suspense>
      </div>
      <article className="prose dark:prose-invert">
        <PortableText value={post.body ?? []} components={ptComponents} />
      </article>
    </section>
  );
}
