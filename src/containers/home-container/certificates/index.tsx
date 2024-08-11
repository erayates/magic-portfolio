import BlurFade from "@/components/magicui/blur-fade";
import { sanityFetch } from "@/sanity/lib/client";

import CertificateCard from "@/components/certificate-card";
import { getAllCertifities } from "@/sanity/lib/queries";
import LinkShinyButton from "@/components/link-shiny-button";
import { getLocale, getTranslations } from "next-intl/server";
import { Certificate } from "../../../../sanity.types";

const BLUR_FADE_DELAY = 0.04;

const Certificates: React.FC = async () => {
  const certificates = await sanityFetch<Certificate[]>({
    query: getAllCertifities,
  });

  const t = await getTranslations("Certificates");

  const locale = await getLocale();

  return (
    <section id="certificates">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
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
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {certificates.map((certificate, id) => (
              <BlurFade
                key={certificate.title ?? "" + certificate.date}
                delay={BLUR_FADE_DELAY * 15 + id * 0.05}
              >
                <CertificateCard
                  title={certificate.title}
                  description={
                    locale === "tr"
                      ? certificate.description_tr
                      : certificate.description
                  }
                  company={certificate.company}
                  dates={certificate.date}
                  image={certificate.companyLogo}
                  link={certificate.source_url}
                  locale={locale}
                />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 16} className="flex justify-center">
          <LinkShinyButton
            url="https://www.linkedin.com/in/eraayatees/details/certifications/"
            text={t("button")}
          />
        </BlurFade>
      </div>
    </section>
  );
};

export default Certificates;
