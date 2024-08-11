import BlurFade from "@/components/magicui/blur-fade";
import { ResumeCard } from "@/components/resume-card";
import { sanityFetch } from "@/sanity/lib/client";
import type { Work } from "../../../../sanity.types";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllWorks } from "@/sanity/lib/queries";

const BLUR_FADE_DELAY = 0.04;

const Work: React.FC = async () => {
  const works: Work[] = await sanityFetch({
    query: getAllWorks,
  });

  const locale = await getLocale();
  const t = await getTranslations("WorkExp");

  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <h2 className="text-xl font-bold">{t("title")}</h2>
        </BlurFade>
        {works.map((work, id) => (
          <BlurFade
            key={work.companyName}
            delay={BLUR_FADE_DELAY * 6 + id * 0.05}
          >
            <ResumeCard
              key={work.companyName}
              logoUrl={work.companyLogo}
              altText={work.companyLogo.alt ?? ""}
              title={work.companyName}
              subtitle={work.job}
              href={work.website_url}
              startedAt={work.startedAt}
              endedAt={work.endedAt}
              description={
                locale === "tr" ? work.definition_tr : work.definition
              }
              locale={locale}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default Work;
