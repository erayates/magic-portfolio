import { groq } from "next-sanity";

export const getAllPostsQuery = groq`*[_type=='post']`;

export const getSinglePostQuery = (postSlug: string) => {
  return groq`*[slug.current=='${postSlug}'][0]`;
};

export const getAllCertifities = groq`*[_type == "certificate"] | order(date desc)`;

export const getPersonalData = groq`*[_type=="personal"][0]`;

export const getAllProjects = groq`*[_type == "project"] | order(publishDate desc)`;

export const getAllWorks = groq`*[_type=="work"] | order(endedAt desc, startedAt desc)`;
