import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/sanity/lib/client";
import { Personal } from "../../../../sanity.types";
import { getPersonalData } from "@/sanity/lib/queries";

const BLUR_FADE_DELAY = 0.04;

const Skills: React.FC = async () => {
  const personal: Personal = await sanityFetch({
    query: getPersonalData,
  });

  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {personal.skills?.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <Badge key={skill}>{skill}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
