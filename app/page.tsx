import { IndexAgentsSection } from "@/components/index/index-agents-section";
import { IndexHeroSection } from "@/components/index/index-hero-section";
import { Separator } from "@/components/ui/separator";

export default function IndexPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <IndexHeroSection />
      <Separator className="mt-12" />
      <IndexAgentsSection className="mt-12" />
    </main>
  );
}
