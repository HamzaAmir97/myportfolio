"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const topics = [
  "Mobile App",
  "Website Design",
  "Branding",
  "Webflow development",
  "App design",
  "Graphic design",
  "Wordpress",
];

export function ContactSection() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 flex justify-center"
    >
      <div className="w-full max-w-3xl px-4">
        <h2 className="relative mb-6 text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-neutral-500">Say Hi!</span> and tell me about
          <br className="hidden md:block" /> your idea
        </h2>
        <p className="mb-10 text-neutral-600 dark:text-neutral-400">
          Have a nice works? reach out and let&apos;s chat.
        </p>
        <form className="flex flex-col gap-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Name*
              </label>
              <input
                type="text"
                placeholder="Hello..."
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Email*
              </label>
              <input
                type="email"
                placeholder="Where can I reply"
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Company name
              </label>
              <input
                type="text"
                placeholder="Your company or website?"
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm text-neutral-600 dark:text-neutral-400">
              What&apos;s in your mind?
            </label>
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  onClick={() => toggle(topic)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${selected.includes(topic) ? "bg-black text-white dark:bg-white dark:text-black" : "text-neutral-600 dark:text-neutral-300"}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              I&apos;ll get back to you within 24 hours
            </p>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
            >
              Send Me
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
