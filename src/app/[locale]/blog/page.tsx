import BlurFade from "@/components/magicui/blur-fade";
import { client, sanityFetch } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "next-sanity";
import { formatDate } from "@/lib/utils";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { Post } from "../../../../sanity.types";

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts: Post[] = await sanityFetch({
    query: getAllPostsQuery,
    revalidate: 10,
  });

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
            height={200}
            className="rounded-lg mx-auto"
            width={400}
            src={urlFor(value)}
          />
        );
      },
    },
  };

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>
      {posts.map((post: any, id: any) => (
        <BlurFade
          delay={BLUR_FADE_DELAY * 2 + id * 0.05}
          key={post.slug.current}
        >
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug.current}`}
          >
            <div className="w-full flex flex-col space-y-4">
              <p className="tracking-tight font-semibold">{post.title}</p>
              <PortableText value={post.mainImage} components={ptComponents} />
              <PortableText value={post.body[0]} />

              <p className="h-6 text-xs text-muted-foreground">
                {formatDate(post._createdAt)}
              </p>
            </div>
          </Link>
          <hr />
        </BlurFade>
      ))}
    </section>
  );
}
