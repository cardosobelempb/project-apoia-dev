import UrlPreview from "@/components/me/url-preview";

export default function Me() {
  return (
    <main className="w-full h-full flex gap-4 flex-col items-center p-4">
      <section className="w-full flex lg:flex-row flex-col lg:items-center mx-auto bg-zinc-900 rounded-md p-4 gap-2">
        <UrlPreview />
      </section>
    </main>
  );
}
