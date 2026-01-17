"use client";
import { useEffect, useState } from "react";

export default function TruncatedText({ text = "", wordLimit = 30 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [images, setImages] = useState([]);
  const [textHtml, setTextHtml] = useState("");
  const [shortTextHtml, setShortTextHtml] = useState("");
  const [shouldTruncate, setShouldTruncate] = useState(false);

  useEffect(() => {
    if (!text) return;

    const div = document.createElement("div");
    div.innerHTML = text;

    /* ========= 1️⃣ Extract images ========= */
    const imgs = Array.from(div.querySelectorAll("img")).map((img) => ({
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "image",
    }));

    /* ========= 2️⃣ Remove images from text ========= */
    div.querySelectorAll("img").forEach((img) => img.remove());

    /* ========= 3️⃣ Clean editor garbage ========= */
    while (div.firstChild && div.firstChild.textContent.trim() === "") {
      div.removeChild(div.firstChild);
    }
    while (div.lastChild && div.lastChild.textContent.trim() === "") {
      div.removeChild(div.lastChild);
    }

    const cleanTextHtml = div.innerHTML.trim();
    const words = (div.textContent || "").trim().split(/\s+/);

    setImages(imgs);
    setTextHtml(cleanTextHtml);

    const textIsLong = words.length > wordLimit;
    const hasMultipleImages = imgs.length > 1;

    /* ========= 4️⃣ Inline short text ========= */
    if (textIsLong || hasMultipleImages) {
      const shortText = words.slice(0, wordLimit).join(" ");
      setShortTextHtml(
        `<p>${shortText}… <span class="see-more-inline">See more</span></p>`
      );
      setShouldTruncate(true);
    } else {
      setShortTextHtml(cleanTextHtml);
      setShouldTruncate(false);
    }
  }, [text, wordLimit]);

  return (
    <div>
      {/* ================= TEXT ================= */}
      <div
        className="
          prose prose-sm max-w-none
          [&>p]:m-0
          [&>p]:leading-relaxed
          [&_.see-more-inline]:text-blue-500
          [&_.see-more-inline]:font-medium
          [&_.see-more-inline]:cursor-pointer
        "
        dangerouslySetInnerHTML={{
          __html: isExpanded ? textHtml : shortTextHtml,
        }}
        onClick={(e) => {
          if (e.target.classList.contains("see-more-inline")) {
            setIsExpanded(true);
          }
        }}
      />

      {/* ================= IMAGE ================= */}
      {!isExpanded ? (
        images[0] && (
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="rounded-lg w-full object-cover mt-2 max-h-[420px]"
            loading="lazy"
          />
        )
      ) : (
        images.length > 0 && (
          <div className="grid grid-cols-1 gap-3 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="rounded-lg w-full object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )
      )}

      {/* ================= SEE LESS ================= */}
      {shouldTruncate && isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-blue-500 font-medium hover:underline mt-2 inline-block"
        >
          See less
        </button>
      )}
    </div>
  );
}
