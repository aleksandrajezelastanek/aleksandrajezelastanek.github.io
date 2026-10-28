import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { AboutPage } from "@/components/pages/AboutPage";

const page = getDictionary("en").meta.pages.about;
export const metadata = buildMetadata({ locale: "en", path: route("en", "about"), title: page.title, description: page.description });

export default function Page() {
  return <AboutPage locale="en" />;
}
