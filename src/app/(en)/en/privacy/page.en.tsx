import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { PrivacyPage } from "@/components/pages/PrivacyPage";

const page = getDictionary("en").meta.pages.privacy;
export const metadata = buildMetadata({ locale: "en", path: route("en", "privacy"), title: page.title, description: page.description });

export default function Page() {
  return <PrivacyPage locale="en" />;
}
