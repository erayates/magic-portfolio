import BlurFade from "@/components/magicui/blur-fade";
import { sanityFetch } from "@/sanity/lib/client";

import { ResumeCard } from "@/components/resume-card";
import { getLocale, getTranslations } from "next-intl/server";
import type { Education } from "../../../../sanity.types";

const BLUR_FADE_DELAY = 0.04;

const Education: React.FC = async () => {
  const educations: Education[] = await sanityFetch({
    query: `*[_type=="education"] | order(endedAt desc, startedAt desc)`,
  });

  const t = await getTranslations("Education");
  const locale = await getLocale();

  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">{t("title")}</h2>
        </BlurFade>
        {educations.map((education, id) => (
          <BlurFade
            key={education.name}
            delay={BLUR_FADE_DELAY * 8 + id * 0.05}
          >
            <ResumeCard
              key={education.name}
              href={education.website_url}
              logoUrl={education.logo ?? {}}
              altText={education.logo?.alt ?? ""}
              title={education.name ?? ""}
              subtitle={
                locale === "tr" ? education.definition_tr : education.definition
              }
              startedAt={education.startedAt}
              endedAt={education.endedAt}
              locale={locale}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default Education;
