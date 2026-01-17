import React from "react";

export default function Footer() {
  return (
    <footer className="font-sans tracking-wide bg-[#213343] py-10 px-10 w-full mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-5">
            {["Our Story", "Newsroom", "Careers", "Blog"].map((link) => (
              <li key={link}>
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#FFA726] text-gray-300 text-[15px] transition duration-300 ease-in-out"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6 uppercase">
            Services
          </h4>
          <ul className="space-y-5">
            {[
              "Web Development",
              "Testing Automation",
              "AWS Development Services",
              "Mobile App Development",
            ].map((service) => (
              <li key={service}>
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#FFA726] text-gray-300 text-[15px] transition duration-300 ease-in-out"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6 uppercase">
            Platforms
          </h4>
          <ul className="space-y-5">
            {[
              "Hubspot",
              "Marketo Integration Services",
              "Marketing Glossary",
              "UIPath",
            ].map((platform) => (
              <li key={platform}>
                <a
                  href="javascript:void(0)"
                  className="hover:text-[#FFA726] text-gray-300 text-[15px] transition duration-300 ease-in-out"
                >
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#FFA726] font-semibold text-lg mb-6 uppercase">
            Company
          </h4>
          <ul className="space-y-5">
            {["Accessibility", "About", "Contact", "Learn More"].map(
              (company) => (
                <li key={company}>
                  <a
                    href="javascript:void(0)"
                    className="hover:text-[#FFA726] text-gray-300 text-[15px] transition duration-300 ease-in-out"
                  >
                    {company}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#6b5f5f] pt-8 mt-8 text-center">
        <p className="text-gray-300 text-[15px]">
          © {new Date().getFullYear()} Uizen.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
