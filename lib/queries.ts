import { client } from "./sanity";

export async function getHomePage() {
  try {
    return await client.fetch(
      `*[_type == "homePage" && _id == "homePage"][0] {
        heroTitle, heroSubtext, scrollRevealText,
        featuredProjectsTitle, techStackTitle
      }`
    );
  } catch {
    return null;
  }
}

export async function getAboutPage() {
  try {
    return await client.fetch(
      `*[_type == "aboutPage" && _id == "aboutPage"][0] {
        sectionHeading, name,
        profilePhoto,
        bio, interests
      }`
    );
  } catch {
    return null;
  }
}

export async function getAllProjects() {
  try {
    return await client.fetch(
      `*[_type == "project"] | order(order asc) {
        _id, title, slug, description, longDescription,
        "images": images[].asset->url,
        techStack, category, liveUrl, githubUrl, featured, order
      }`
    );
  } catch {
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    return await client.fetch(
      `*[_type == "project" && featured == true] | order(order asc) {
        _id, title, description,
        "image": images[0].asset->url
      }`
    );
  } catch {
    return [];
  }
}

export async function getAllBlogPosts() {
  try {
    return await client.fetch(
      `*[_type == "blogPost"] | order(publishedAt desc) {
        _id, title, slug, excerpt, publishedAt, readingTime, tags,
        "coverImage": coverImage.asset->url
      }`
    );
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id, title, slug, excerpt, body, publishedAt, readingTime, tags,
        "coverImage": coverImage.asset->url
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getAllExperiences() {
  try {
    return await client.fetch(
      `*[_type == "experience"] | order(order asc) {
        _id, role, company, startDate, endDate, description, techStack, order
      }`
    );
  } catch {
    return [];
  }
}

export async function getAllEducation() {
  try {
    return await client.fetch(
      `*[_type == "education"] | order(order asc) {
        _id, degree, institution, startYear, endYear, grade,
        "highlights": coalesce(highlights, []),
        order
      }`
    );
  } catch {
    return [];
  }
}

export async function getAllCertifications() {
  try {
    return await client.fetch(
      `*[_type == "certification"] | order(order asc) {
        _id, name, issuer, date, credentialUrl,
        "badge": badge.asset->url,
        order
      }`
    );
  } catch {
    return [];
  }
}

export async function getAllSkills() {
  try {
    return await client.fetch(
      `*[_type == "skill"] | order(order asc) {
        _id, name, level, category, order
      }`
    );
  } catch {
    return [];
  }
}
