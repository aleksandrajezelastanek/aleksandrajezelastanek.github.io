import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

const page = getDictionary("en").meta.pages.contact;
export const metadata = buildMetadata({ locale: "en", path: route("en", "contact"), title: page.title, description: page.description });

export default function Page() {
  return <ContactPage locale="en" />;
}
