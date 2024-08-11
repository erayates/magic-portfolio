import LinkShinyButton from "@/components/link-shiny-button";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { sanityFetch } from "@/sanity/lib/client";
import { Project } from "../../../../sanity.types";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllProjects } from "@/sanity/lib/queries";

const BLUR_FADE_DELAY = 0.04;

const Projects: React.FC = async () => {
  const projects: Project[] = await sanityFetch({
    query: getAllProjects,
  });

  const t = await getTranslations("Projects");
  const locale = await getLocale();

  return (
    <section id="projects">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                {t("label")}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t("title")}
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {projects.map((project: Project, id: number) => (
            <BlurFade
              key={project.title}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
              <ProjectCard
                key={project.title}
                title={project.title}
                description={
                  locale === "tr" ? project.description_tr : project.description
                }
                startedAt={project.startedAt}
                endedAt={project.endedAt}
                tags={project.tech_stack ?? []}
                image={project.mainImage ?? {}}
                websiteUrl={project.website_url}
                sourceUrl={project.source_url}
                locale={locale}
              />
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 11} className="flex justify-center">
          <LinkShinyButton
            text={t("button")}
            url="https://github.com/erayates?tab=repositories"
          />
        </BlurFade>
      </div>
    </section>
  );
};

export default Projects;
