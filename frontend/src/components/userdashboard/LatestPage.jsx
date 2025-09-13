import React, { useState, useEffect, useRef } from "react";
import { Shield } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function LatestPage() {
  const [activeTab, setActiveTab] = useState("notices");
  const tickerRef = useRef(null);

  const upcomingApps = [
    { id: 1, title: "PRISMA Portal", description: "Next-gen dashboard for analytics with AI-powered insights and predictive modeling capabilities.", date: "2023-12-15", image: "/images/prisma2.jpeg", color: "#ef4444" },
    { id: 2, title: "eSakshya", description: "Platform for process recording of various events for the implementation of new criminal laws across country.", date: "2024-01-10", image: "/images/esakshya.png", color: "#3b82f6" },
    { id: 3, title: "eSign", description: "Digital signature platform for Punjab Police services, including Public Grievance system.", date: "2024-02-20", image: "/images/esign2.png", color: "#f59e0b" },
  ];

  const testingApps = [
    { id: 4, title: "Prisma Portal", description: "AI-powered financial analysis tool for personal and business finance management.", date: "2023-11-30", image: "/images/prisma2.jpeg", color: "#8b5cf6" },
    { id: 5, title: "eSign Beta", description: "Next generation digital signature platform with enhanced security features.", date: "2023-12-05", image: "/images/esign.png", color: "#10b981" },
  ];

  const currentNotices = [
    { id: 101, title: "Q4 Product Roadmap", description: "Developers must attend roadmap review.", date: "2023-11-15", icon: "📅" },
    { id: 102, title: "Security Updates", description: "Complete training module by Nov 30.", date: "2023-11-10", icon: "🔒" },
    { id: 103, title: "Beta Testing Guide", description: "Updated guidelines available.", date: "2023-11-05", icon: "📋" },
    { id: 104, title: "Holiday Notice", description: "Office closed on state holiday.", date: "2023-12-25", icon: "🎉" },
  ];

  const manuals = [
    { id: 201, title: "CCTNS Manual", description: "Comprehensive guide to CCTNS.", date: "2023-09-10", icon: "📘" },
    { id: 202, title: "ICJS Manual", description: "Reference manual for ICJS platform.", date: "2023-09-20", icon: "📖" },
    { id: 203, title: "Cybersecurity Handbook", description: "Secure policing online.", date: "2023-10-05", icon: "🔐" },
  ];

  const archives = [
    { id: 301, title: "2022 Annual Report", description: "Performance report of 2022.", date: "2022-12-31", icon: "📊" },
    { id: 302, title: "Old Training Schedule", description: "Archived training events.", date: "2022-08-15", icon: "🗂️" },
    { id: 303, title: "Previous Security Guidelines", description: "Outdated but useful reference.", date: "2021-05-22", icon: "📑" },
  ];

  // ticker auto-scroll effect
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let scrollAmount = 0;
    const step = 1;
    const interval = 40;
    const id = setInterval(() => {
      scrollAmount += step;
      if (scrollAmount >= el.scrollHeight / 2) {
        scrollAmount = 0;
        el.scrollTop = 0;
      } else {
        el.scrollTop = scrollAmount;
      }
    }, interval);
    return () => clearInterval(id);
  }, [activeTab]);

  const renderTickerItems = (items) => {
    const doubled = items.concat(items);
    return doubled.map((item, i) => (
      <div
        key={`${item.id}-${i}`}
        className="flex gap-3 items-start p-3 border-b border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-yellow-400/30 transition-transform duration-300"
      >
        <div className="text-xl md:text-2xl w-8 md:w-10 text-center">{item.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start gap-4">
            <h4 className="font-semibold text-sm md:text-base text-white">{item.title}</h4>
            <span className="text-xs text-gray-400">{item.date}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-300 mt-1">{item.description}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* background blur effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-red-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-yellow-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 py-10 md:py-12">
        {/* header */}
        <header className="mb-8 md:mb-10 flex items-center space-x-3 md:space-x-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 md:w-9 md:h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400">Latest Updates</h1>
            <p className="text-sm md:text-lg text-gray-300">Stay informed — notices, manuals and archived reports.</p>
          </div>
        </header>

        {/* main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* left column */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
            <div className="flex space-x-1 bg-white/10 p-2 md:p-3 overflow-x-auto scrollbar-hide">
              {["notices", "manuals", "archives"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-xs md:text-sm py-2 px-2 rounded-md font-medium capitalize whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-red-600 to-blue-700 text-white"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-3 md:p-4" style={{ height: 360 }}>
              <div ref={tickerRef} className="overflow-y-hidden h-full">
                {activeTab === "notices" && renderTickerItems(currentNotices)}
                {activeTab === "manuals" && renderTickerItems(manuals)}
                {activeTab === "archives" && renderTickerItems(archives)}
              </div>
            </div>

            <div className="p-2 md:p-3 border-t border-white/10 bg-white/5 text-center text-[10px] md:text-xs text-gray-400">
              Click a notice to view details
            </div>
          </div>

          {/* right column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* upcoming */}
            <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 md:p-6 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-yellow-400">Upcoming Releases</h2>
                <span className="text-xs md:text-sm text-gray-400">{upcomingApps.length} items</span>
              </div>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500 }}
                loop
                spaceBetween={16}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
              >
                {upcomingApps.map((app) => (
                  <SwiperSlide key={app.id}>
                    <div
                      className="rounded-lg overflow-hidden h-full shadow-lg flex flex-col bg-black/30 border border-white/10 transform transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/30 hover:shadow-xl"
                      style={{ borderTop: `4px solid ${app.color}` }}
                    >
                      <div className="h-32 md:h-44 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <img src={app.image} alt={app.title} className="object-cover h-full w-full" />
                      </div>
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-sm md:text-base text-white">{app.title}</h3>
                        <p className="text-xs md:text-sm text-gray-300 mt-2 line-clamp-3">{app.description}</p>
                        <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs text-gray-400 pt-2 md:pt-3">
                          <span>Release: {app.date}</span>
                          <span className="px-2 py-[2px] md:py-1 rounded-full text-white text-[10px] md:text-[11px]" style={{ backgroundColor: app.color }}>
                            Upcoming
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>

            {/* testing */}
            <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 md:p-6 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-yellow-400">Currently in Testing</h2>
                <span className="text-xs md:text-sm text-gray-400">{testingApps.length} items</span>
              </div>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500 }}
                loop
                spaceBetween={16}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  1024: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
              >
                {testingApps.map((app) => (
                  <SwiperSlide key={app.id}>
                    <div
                      className="rounded-lg overflow-hidden h-full shadow-lg flex flex-col bg-black/30 border border-white/10 transform transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/30 hover:shadow-xl"
                      style={{ borderTop: `4px solid ${app.color}` }}
                    >
                      <div className="h-32 md:h-44 w-full bg-gray-900 flex items-center justify-center overflow-hidden">
                        <img src={app.image} alt={app.title} className="object-cover h-full w-full" />
                      </div>
                      <div className="p-3 md:p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-sm md:text-base text-white">{app.title}</h3>
                        <p className="text-xs md:text-sm text-gray-300 mt-2 line-clamp-3">{app.description}</p>
                        <div className="mt-auto flex items-center justify-between text-[10px] md:text-xs text-gray-400 pt-2 md:pt-3">
                          <span>Testing Until: {app.date}</span>
                          <span className="px-2 py-[2px] md:py-1 rounded-full text-white text-[10px] md:text-[11px]" style={{ backgroundColor: app.color }}>
                            Testing
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
