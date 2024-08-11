import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { sanityFetch } from "@/sanity/lib/client";
import { Personal } from "../../../../sanity.types";
import { getLocale, getTranslations } from "next-intl/server";
import { getPersonalData } from "@/sanity/lib/queries";

const BLUR_FADE_DELAY = 0.04;

const About: React.FC = async () => {
  const personal = await sanityFetch<Personal>({
    query: getPersonalData,
  });

  const locale = await getLocale();
  const t = await getTranslations("About");

  return (
    <section id="about">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-xl font-bold">{t("title")}</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          {locale === "tr" ? personal.summary_tr : personal.summary}
        </Markdown>
      </BlurFade>
    </section>
  );
};

export default About;
