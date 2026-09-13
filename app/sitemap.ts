import type { MetadataRoute } from "next";
import { WORKS } from "./data/works";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/clinic", "/programs", "/automation", "/chatbot", ...WORKS.map(w=>`/works/${w.slug}`)].map(path=>({url:`https://cmong-lac.vercel.app${path}`,changeFrequency:"monthly",priority:path===""?1:0.7}));
}
