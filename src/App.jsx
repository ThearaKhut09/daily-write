import { Link } from "react-router-dom";
import ListCard, { SideBar } from "./components/homepage/BlogSection/ListCard";
import EncourageSection from "./components/homepage/EncourageSection/EncourageSection";
import ImageSide from "./components/homepage/HeroSection/ImageSide";
import Information from "./components/homepage/HeroSection/Information";

function App() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#FFF8ED] dark:bg-black relative overflow-hidden min-h-screen lg:min-h-0 py-12 lg:py-0 flex items-center">
        {/* Animated background elements - optimized for mobile */}
        <div className="absolute -top-20 -left-20 sm:-top-40 sm:-left-40 md:-top-80 md:-left-80 w-64 h-64 sm:w-100 sm:h-100 md:w-200 md:h-200 rounded-full opacity-30 sm:opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-5 right-5 sm:top-10 sm:right-10 md:top-20 md:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-4 md:h-4 bg-primary-orange/20 rounded-full animate-float-slow" />
          <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-10 md:bottom-40 md:left-20 w-2 h-2 sm:w-3 sm:h-3 md:w-6 md:h-6 bg-primary-orange/10 rounded-full animate-float-delayed" />
          <div className="absolute top-10 left-1/4 sm:top-20 md:top-40 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-primary-orange/15 rounded-full animate-pulse-slow" />
        </div>

        {/* Main content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
            <Information />
            <ImageSide />
          </div>
        </div>

        {/* Bottom gradient element - optimized for mobile */}
        <div className="absolute -bottom-20 -right-20 sm:-bottom-50 sm:-right-50 md:-bottom-100 md:-right-50 w-64 h-64 sm:w-100 sm:h-100 md:w-200 md:h-200 rounded-full opacity-30 sm:opacity-40 pointer-events-none animate-spin-slow bg-[radial-gradient(circle_at_center,#F48024_0%,transparent_70%)]" />
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto p-6 text-text-main font-sans h-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold whitespace-nowrap text-text-main">
                Top Story
              </h2>
              <div className="h-0.5 w-full bg-primary-orange"></div>
            </div>
            <ListCard />
          </div>
          <aside className="lg:w-1/3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 w-full">
                <h2 className="text-2xl font-bold text-text-main">Latest</h2>
                <div className="h-0.5 grow bg-primary-orange"></div>
              </div>
              <Link to="/blogs" className="text-primary-orange font-bold ml-4">
                View&nbsp;All
              </Link>
            </div>
            <SideBar />
          </aside>
        </div>
      </section>

      {/* EncourageSection */}
      <section className="relative pb-20 lg:pb-10 overflow-hidden">
        <EncourageSection />
      </section>

    {/* FAQ Section*/}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Find answers to common questions about DailyWrite, including what
              types of content you can post, enrollment, and more.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="flex justify-center">
              <img
                src="image_c1646a.png"
                alt="Thinking Illustration"
                className="w-full max-w-md h-auto"
              />
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group">
                <span className="text-lg font-bold text-slate-800 text-left">
                  What is DailyWrite?
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#E87121] font-bold group-hover:bg-[#E87121] group-hover:text-white transition-colors">
                  +
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group text-left">
                <span className="text-lg font-bold text-slate-800">
                  How can we post the blogs?
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#E87121] font-bold group-hover:bg-[#E87121] group-hover:text-white transition-colors">
                  +
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group text-left">
                <span className="text-lg font-bold text-slate-800">
                  Is it free to create an account?
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#E87121] font-bold group-hover:bg-[#E87121] group-hover:text-white transition-colors">
                  +
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group text-left">
                <span className="text-lg font-bold text-slate-800">
                  What topics can I write about?
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#E87121] font-bold group-hover:bg-[#E87121] group-hover:text-white transition-colors">
                  +
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-orange-200 transition-all group text-left">
                <span className="text-lg font-bold text-slate-800">
                  How do I create an account?
                </span>
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#E87121] font-bold group-hover:bg-[#E87121] group-hover:text-white transition-colors">
                  +
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
