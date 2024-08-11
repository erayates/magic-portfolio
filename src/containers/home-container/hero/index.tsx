import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { sanityFetch } from "@/sanity/lib/client";
import CVButton from "@/components/cv-button";
import imageUrlBuilder from "@sanity/image-url";
import { getLocale, getTranslations } from "next-intl/server";

import { client } from "@/sanity/lib/client";

import { Personal, SanityImageAsset } from "../../../../sanity.types";
import { getPersonalData } from "@/sanity/lib/queries";

const BLUR_FADE_DELAY = 0.04;

const Hero: React.FC = async () => {
  const t = await getTranslations("Hero");

  const personal: Personal = await sanityFetch({
    query: getPersonalData,
  });

  const locale = await getLocale();

  function urlFor(source: SanityImageAsset): string {
    return `${imageUrlBuilder(client).image(source).fit("max").auto("format")}`;
  }

  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={t("title", { firstName: personal.fullname?.split(" ")[0] })}
            />
            <BlurFadeText
              className="max-w-[600px] md:text-xl"
              delay={BLUR_FADE_DELAY}
              text={
                locale === "tr" ? personal.description_tr : personal.description
              }
            />
          </div>
          <BlurFade
            delay={BLUR_FADE_DELAY}
            className="flex justify-center items-center space-y-2 flex-col"
          >
            <Avatar className="size-28 border">
              <AvatarImage
                alt={personal.avatarUrl?.alt}
                src={urlFor(personal.avatarUrl as unknown as SanityImageAsset)}
              />
            </Avatar>

            <CVButton />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
