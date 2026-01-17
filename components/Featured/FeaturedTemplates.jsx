
export default function FeaturedTemplates() {
  return (
    <div className="bg-white flex flex-col max-w-screen-xl mx-auto px-5 mt-10 shadow-sm  py-2">
      <div className="self-start text-5xl font-bold leading-none text-gray-800 max-md:max-w-full">
        Weekly Top Picks
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-3.5 max-md:max-w-full">
        <div className="self-start mt-3.5 text-lg leading-7 text-gray-500 max-md:max-w-full">
          Discover our best-performing templates of the week, carefully selected
          <br />
          to help you build stunning websites effortlessly.
        </div>
        <div className="flex px-16 py-4 items-center border border-gray-300 text-base font-medium tracking-wide leading-4 text-right text-gray-800 rounded-[500px] max-md:px-5">
          Browse All Templates
        </div>
      </div>
    </div>
  );
}
