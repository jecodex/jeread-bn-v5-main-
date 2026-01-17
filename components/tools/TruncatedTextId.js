"use client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

function TruncatedText({ text = "", images = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [processedText, setProcessedText] = useState("");
  const [extractedImages, setExtractedImages] = useState([]);
  const [first20Words, setFirst20Words] = useState("");
  const [shouldTruncate, setShouldTruncate] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Memoize images to prevent unnecessary re-renders
  const memoizedImages = useMemo(() => images, [images]);

  // Only run once on initial render
  useEffect(() => {
    if (typeof window === "undefined") return;

    const process = () => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = text;

      const imgTags = tempDiv.querySelectorAll("img");
      const foundImages = [];

      imgTags.forEach((img) => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "Image";

        if (src && src.startsWith("http")) {
          foundImages.push({ src, alt });
        }

        if (img.parentNode) {
          if (
            img.parentNode.nodeName === "DIV" &&
            img.parentNode.childNodes.length === 1
          ) {
            img.parentNode.parentNode?.removeChild(img.parentNode);
          } else {
            img.parentNode.removeChild(img);
          }
        }
      });

      const cleanedText = tempDiv.innerHTML;
      setProcessedText(cleanedText);

      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const words = plainText.trim().split(/\s+/).filter(Boolean);

      if (words.length > 20) {
        setShouldTruncate(true);
        setFirst20Words(words.slice(0, 20).join(" "));
      } else {
        setFirst20Words(plainText);
        setShouldTruncate(false);
      }

      // Combine both sources of images without causing re-renders
      const allImages = [...foundImages];
      if (memoizedImages && memoizedImages.length > 0) {
        allImages.push(...memoizedImages);
      }
      setExtractedImages(allImages);
    };

    process();
  }, [text, memoizedImages]);

  const toggleExpansion = () => setIsExpanded((prev) => !prev);
  
  const openImageModal = (image) => {
    setSelectedImage(image);
  };
  
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-3">
        {/* Text Content */}
        {first20Words && (
          <div className="text-gray-700 dark:text-gray-300">
            {!isExpanded ? (
              <p>
                {first20Words}
                {shouldTruncate && (
                  <>
                    ...{" "}
                    <button
                      onClick={toggleExpansion}
                      className="text-blue-500 hover:underline font-medium inline"
                    >
                      See more
                    </button>
                  </>
                )}
              </p>
            ) : (
              <>
                <div 
                  dangerouslySetInnerHTML={{ __html: processedText }} 
                  className="dark:text-white"
                />
                <button
                  onClick={toggleExpansion}
                  className="text-blue-500 hover:underline mt-1 font-medium"
                >
                  View Summary
                </button>
              </>
            )}
          </div>
        )}

        {/* Images - now part of the same flex column as text */}
        {extractedImages.length > 0 && (
          <div className="mt-2">
            {extractedImages.length === 1 ? (
              // Single image view
              <div className="flex justify-center">
                <div 
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105 relative"
                  onClick={() => openImageModal(extractedImages[0])}
                >
                  <Image
                    src={extractedImages[0].src}
                    alt={extractedImages[0].alt}
                    width={420}
                    height={240}
                    style={{ width: "100%", height: "auto", maxWidth: "420px" }}
                    className="object-cover"
                    unoptimized={!extractedImages[0].src.includes('localhost')}
                  />
                </div>
              </div>
            ) : (
              // Improved grid view for multiple images
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {extractedImages.slice(0, 6).map((image, index) => (
                  <div 
                    key={`${image.src}-${index}`} 
                    className="overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg relative"
                    onClick={() => openImageModal(image)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      unoptimized={!image.src.includes('localhost')}
                    />
                  </div>
                ))}
                {extractedImages.length > 6 && (
                  <div 
                    className="overflow-hidden rounded-lg shadow-md bg-gray-800/70 aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg relative flex items-center justify-center"
                    onClick={() => openImageModal(extractedImages[6])}
                  >
                    <Image
                      src={extractedImages[6].src}
                      alt={extractedImages[6].alt}
                      fill
                      className="object-cover opacity-50"
                      unoptimized={!extractedImages[6].src.includes('localhost')}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                      <span className="text-white text-lg font-medium">+{extractedImages.length - 6} more</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Full-View Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div 
            className="max-w-5xl w-full max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 focus:outline-none"
              onClick={closeImageModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative max-w-full max-h-[90vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                style={{ maxWidth: "100%", maxHeight: "90vh", width: "auto", height: "auto" }}
                className="object-contain"
                unoptimized={!selectedImage.src.includes('localhost')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TruncatedText;