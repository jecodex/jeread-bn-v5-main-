// app/faq/page.js
import { Metadata } from "next";

export const metadata = {
  title: "প্রশ্নোত্তর – Jeread | পড়া, লেখা ও কমিউনিটি সম্পর্কে",
  description:
    "Jeread সম্পর্কে সাধারণ প্রশ্নের উত্তর এখানে পাবেন। পড়া, লেখা, কোটস, লাইফ নোটস ও কমিউনিটি নিয়ে সব তথ্য এক জায়গায়।",
  keywords: [
    "Jeread প্রশ্নোত্তর",
    "Jeread FAQ",
    "বাংলা লেখার প্ল্যাটফর্ম",
    "পড়া ও লেখার ওয়েবসাইট",
    "লাইফ নোটস",
    "উক্তি শেয়ার",
    "বাংলা রিডিং কমিউনিটি"
  ],
  openGraph: {
    title: "প্রশ্নোত্তর – Jeread",
    description:
      "Jeread কী, কীভাবে কাজ করে, লেখা ও প্রাইভেসি সম্পর্কে বিস্তারিত জানুন।",
    url: "https://jeread.com/faq",
    siteName: "Jeread",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "প্রশ্নোত্তর – Jeread",
    description:
      "Jeread নিয়ে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্ন ও উত্তর।",
  },
};

const faqs = [
  {
    question: "Jeread কী?",
    answer:
      "Jeread একটি কমিউনিটি-ভিত্তিক পড়া ও লেখার প্ল্যাটফর্ম, যেখানে মানুষ তাদের জীবন থেকে পাওয়া অভিজ্ঞতা, ভাবনা, লাইফ নোটস, উক্তি ও গল্প শেয়ার করে।",
  },
  {
    question: "Jeread কি ব্লগ নাকি সোশ্যাল নেটওয়ার্ক?",
    answer:
      "Jeread দুটোর সংমিশ্রণ। এখানে আপনি ব্লগের মতো লিখতে পারবেন, আবার সোশ্যাল প্ল্যাটফর্মের মতো মানুষ আপনার লেখার সাথে যুক্ত হতে পারবে।",
  },
  {
    question: "কে কে Jeread-এ লিখতে পারবে?",
    answer:
      "যে কেউ লিখতে পারবে। পেশাদার লেখক হওয়া জরুরি নয়—সৎ ভাবনা আর বাস্তব অভিজ্ঞতাই যথেষ্ট।",
  },
  {
    question: "Jeread ব্যবহার করা কি ফ্রি?",
    answer:
      "হ্যাঁ। Jeread সম্পূর্ণভাবে ফ্রি—পড়া এবং লেখা দুটোই।",
  },
  {
    question: "আমি কি আমার লেখা এডিট বা ডিলিট করতে পারবো?",
    answer:
      "হ্যাঁ। আপনার লেখা সম্পূর্ণ আপনার নিয়ন্ত্রণে। চাইলে যেকোনো সময় এডিট বা ডিলিট করতে পারবেন।",
  },
  {
    question: "Jeread কি আমার ব্যক্তিগত তথ্য সুরক্ষিত রাখে?",
    answer:
      "হ্যাঁ। Jeread ব্যবহারকারীদের প্রাইভেসিকে সম্মান করে এবং কোনো ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি করে না।",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 mt-10">
      
      {/* SEO H1 */}
      <h1 className="text-3xl font-bold mb-6">
        প্রশ্নোত্তর (FAQ)
      </h1>

      <p className="text-gray-600 mb-10">
        Jeread সম্পর্কে মানুষের মনে আসা সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হয়েছে।
        আপনি যদি নতুন হয়ে থাকেন, এই অংশটি আপনাকে সাহায্য করবে।
      </p>

      {/* FAQ Section */}
      <section className="space-y-6">
        {faqs.map((faq, index) => (
          <article key={index} className="border-b pb-4">
            <h2 className="text-lg font-semibold">
              {faq.question}
            </h2>
            <p className="text-gray-700 mt-2 leading-relaxed">
              {faq.answer}
            </p>
          </article>
        ))}
      </section>

      {/* SEO Footer Text */}
      <section className="mt-12 text-sm text-gray-500">
        Jeread তৈরি করা হয়েছে তাদের জন্য, যারা পড়তে, লিখতে এবং বাস্তব জীবনের ভাবনা শেয়ার করতে ভালোবাসেন।
      </section>
    </main>
  );
}
