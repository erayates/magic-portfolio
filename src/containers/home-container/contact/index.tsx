import BlurFade from "@/components/magicui/blur-fade";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

const Contact: React.FC = async () => {
  const t = await getTranslations("Contact");

  return (
    <section id="contact">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              {t("label")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description")}
            </p>
            <div className="space-x-4">
              <Link
                href={"https://www.linkedin.com/in/eraayatees/"}
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </Link>{" "}
              <Link
                href={"mailto:eray.ates@outlook.com"}
                className="text-blue-500 hover:underline"
              >
                Mail
              </Link>{" "}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default Contact;
