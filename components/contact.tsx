"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, MessageCircle, Copy } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useGsapCornerWipe } from "@/hooks/useGsapCornerWipe";

const topics = [
  "Mobile App",
  "Website development",
  "Ai Development",
  "UI/UX Design",
];

export function ContactSection() {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [brief, setBrief] = useState("");
  const [error, setError] = useState<string | null>(null);
  const phone = "967770943143"; // بدون +

  const toggle = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // ✅ قالب الرسالة الترحيبية (يُحدَّث لحظيًا)
  const message = useMemo(() => {
    const topicsText = selected.length ? selected.join(" • ") : "مشروعي القادم";
    const companyText = company?.trim() ? company.trim() : "—";
    const briefText = brief?.trim() ? brief.trim() : "—";

    return [
      "أهلاً وسهلاً 👋",
      `أنا ${name || "—"}.`,
      `حاب/ـة أتواصل معك بخصوص: ${topicsText}.`,
      `الشركة/الموقع: ${companyText}`,
      `البريد الإلكتروني: ${email || "—"}`,
      "",
      "ملخص الفكرة:",
      briefText,
      "",
      "لو مناسب، نرتّب مكالمة قصيرة نحدّد فيها النطاق والميزانية والمدة. شكراً لك 🌟",
    ].join("\n");
  }, [name, email, company, brief, selected]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // تحقق بسيط
    if (!name.trim() || !email.trim()) {
      setError("من فضلك املأ الاسم والبريد الإلكتروني.");
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // فتح واتساب في تبويب جديد
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // تجاهل بصمت لو فشل النسخ
    }
  };
  const btnRef1 = useRef<HTMLButtonElement>(null);
 useGsapCornerWipe(btnRef1, {
    color: "rgba(255,255,255)",
    corner: "bl",
    duration: 0.2,
    ease: "power3.out",
    layer: "under",
  });
  return (
    <section id="contact" className="relative w-full py-20 flex justify-center">
      <div className="w-full max-w-3xl px-4">
        <h2 className="relative mb-6 text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-amber-600">Say Hi!</span> and tell me about
          <br className="hidden md:block" /> your idea
        </h2>

        <p className="mb-10 text-neutral-600 dark:text-neutral-400">
          Have a nice works? reach out and let&apos;s chat.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* الاسم والبريد */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Name*
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Email*
              </label>
              <input
                type="email"
                placeholder="Where can I reply"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
                required
              />
            </div>
          </div>

          {/* الشركة */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col md:col-span-2">
              <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Company name
              </label>
              <input
                type="text"
                placeholder="Your company or website?"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-b bg-transparent py-2 outline-none focus:border-neutral-400"
              />
            </div>
          </div>

          {/* التخصصات/الأفكار */}
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
                  className={`rounded-full border px-4 py-2 text-sm transition-colors hover:bg-white hover:text-black cursor-pointer ${
                    selected.includes(topic)
                      ? "bg-amber-700 text-white dark:bg-white dark:text-black"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* ملخص الفكرة */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
              Project brief (optional)
            </label>
            <textarea
              placeholder="Tell me more about your idea..."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="min-h-[120px] border-b bg-transparent py-2 outline-none focus:border-neutral-400 resize-y"
            />
          </div>

          {/* رسالة خطأ بسيطة */}
          {error && (
            <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          {/* الأزرار */}
          <div className="flex items-center justify-between pt-4 gap-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              I&apos;ll get back to you within 24 hours
            </p>

            <div className="flex items-center gap-3">
             
             
              {/* <button
                type="button"
                onClick={copyToClipboard}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-white hover:text-black cursor-pointer"
                title="Copy message"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button> */}

              <button
              ref={btnRef1}
                type="submit"
                className="
                
                flex   justify-center items-center gap-2 rounded-full
                buttonPrimary"
                title="Send via WhatsApp"
              >
               <p> Send it</p>
                <IconBrandWhatsapp className="h-10 w-10" />
              </button>
            </div>
          </div>

          {/* معاينة الرسالة */}
         
{/*          
          <div className="mt-6 rounded-xl border p-4 bg-neutral-50/50 dark:bg-neutral-900/40">
            <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Message preview
            </div>
            <pre className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-200">
              {message}
            </pre>
          </div> */}


        </form>
      </div>
    </section>
  );
}

export default ContactSection;
