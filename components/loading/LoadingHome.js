"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const LoadingHome = () => {
  const [currentStep, setCurrentStep] = useState("loading"); // 'loading', 'logo'

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setCurrentStep("logo");
    }, 1000); // 1 second loading

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="flex flex-col items-center space-y-4">
        {currentStep === "loading" && (
          <Image
            src="/icons/loading.svg"
            alt="loading"
            width={100}
            height={100}
            className="animate-pulse"
          />
        )}

        {currentStep === "logo" && (
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="animate-pulse"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingHome;
