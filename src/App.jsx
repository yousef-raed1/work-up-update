
import { Suspense, lazy, useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  FaHome,
  FaArrowLeft,
  FaArrowRight,
  FaRedo,
  FaLink,
  FaShareAlt,
  FaExpand,
  FaCompress,
  FaMoon,
  FaSun,
  FaPrint,
  FaArrowUp,
  FaDownload,
  FaTimes,
  FaCopy,
  FaExternalLinkAlt,
  FaSearch,
  FaImage,
  FaVideo,
  FaPlay,
  FaPause,
  FaTachometerAlt,
  FaKeyboard,
  FaGlobe,
} from "react-icons/fa";

import Layout from "./layout/layout";
import Layoutdash from "./dashboard/layout-dash/Layoutdash";

import Loader from "./components/Loader";

import Indexdash from "./dashboard/pages-dash/Indexdash";
import Homeproject from "./dashboard/pages-dash/Homeproject";
import Worksdash from "./dashboard/pages-dash/Worksdash";
import Servicesdash from "./dashboard/pages-dash/Servicesdash";
import Whyus from "./dashboard/pages-dash/whyus.jsx";
const Home = lazy(() => import("./pages/index/Home"));
const Services = lazy(() => import("./pages/index/Services"));
const Works = lazy(() => import("./pages/index/Works"));

const ProjectDetails = lazy(() =>
  import("./pages/details/ProductDetails")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
    ],
  },
  {
    path: "/",
    element: <Layoutdash />,
    children: [
      {
        path: "index-dash_WORKUP-comPanY",
        element: <Indexdash />,
      },
      {
        path: "home_projjjject",
        element: <Homeproject />,
      },
      {
        path: "workkkkk_-proJect",
        element: <Worksdash />,
      },
      {
        path: "serVvvviceS",
        element: <Servicesdash />,
      },
      {
        path: "WhyuuuSS",
        element: <Whyus />,
      },
    ],
  },
]);

function App() {
  const [contextMenu, setContextMenu] = useState(null);

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [fullscreen, setFullscreen] = useState(
    Boolean(document.fullscreenElement)
  );

  const handleContextMenu = (event) => {
    event.preventDefault();

    const image = event.target.closest?.("img");
    const link = event.target.closest?.("a");
    const video = event.target.closest?.("video");

    const selectedText =
      window.getSelection()?.toString().trim() || "";

    let type = "page";
    let data = {};

    if (image) {
      type = "image";

      data = {
        src: image.currentSrc || image.src,
        alt: image.alt || "Image",
      };
    } else if (link) {
      type = "link";

      data = {
        href: link.href,
        text: link.innerText?.trim() || link.href,
      };
    } else if (video) {
      type = "video";

      data = {
        element: video,
      };
    } else if (selectedText) {
      type = "text";

      data = {
        text: selectedText,
      };
    }

    const menuWidth = 320;
    const menuHeight = 550;
    const padding = 12;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - padding;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - padding;
    }

    x = Math.max(padding, x);
    y = Math.max(padding, y);

    setContextMenu({
      x,
      y,
      type,
      ...data,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeContextMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    const handleFullscreen = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
    };
  }, []);

  const goHome = () => {
    window.location.href = "/";
  };

  const goBack = () => {
    window.history.back();
    closeContextMenu();
  };

  const goForward = () => {
    window.history.forward();
    closeContextMenu();
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      alert("تم النسخ بنجاح");
    } catch (error) {
      console.error(error);
    }

    closeContextMenu();
  };

  const sharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "شاهد هذه الصفحة",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("تم نسخ رابط الصفحة");
      }
    } catch (error) {
      console.log(error);
    }

    closeContextMenu();
  };

  const openNewTab = (url) => {
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    closeContextMenu();
  };

  const downloadImage = async (src) => {
    try {
      const response = await fetch(src);

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "website-image";

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      window.open(src, "_blank");
    }

    closeContextMenu();
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(error);
    }

    closeContextMenu();
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;

    const isDark = html.classList.toggle("dark");

    setDarkMode(isDark);

    closeContextMenu();
  };

  const searchText = (text) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      text
    )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    closeContextMenu();
  };

  const printPage = () => {
    window.print();
    closeContextMenu();
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    closeContextMenu();
  };

  const openDashboard = () => {
    window.location.href =
      "/dashboard/index-dash_WORKUP-comPanY";

    closeContextMenu();
  };

  const toggleVideo = () => {
    const video = contextMenu?.element;

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    closeContextMenu();
  };

  const MenuItem = ({
    icon,
    text,
    onClick,
  }) => {
    return (
      <button
        onClick={onClick}
        className="
          group
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-right
          text-sm
          font-medium
          text-gray-200
          transition-all
          hover:bg-white/10
          hover:text-white
          active:scale-[0.98]
        "
      >
        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-white/5
            text-purple-400
            transition
            group-hover:bg-purple-500/10
            group-hover:text-purple-300
          "
        >
          {icon}
        </span>

        <span className="flex-1">
          {text}
        </span>
      </button>
    );
  };

  const Divider = () => (
    <div
      className="
        my-2
        h-px
        bg-white/10
      "
    />
  );

  return (
    <Suspense fallback={<Loader />}>
      <div
        onContextMenu={handleContextMenu}
        className="min-h-screen"
      >
        <RouterProvider router={router} />

        {contextMenu && (
          <>
            <div
              className="
                fixed
                inset-0
                z-[9998]
                bg-transparent
              "
              onClick={closeContextMenu}
            />

            <div
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                fixed
                z-[9999]
                w-[320px]
                max-w-[calc(100vw-24px)]
                max-h-[calc(100vh-24px)]
                overflow-y-auto
                overscroll-contain
                rounded-2xl
                border
                border-white/10
                bg-gray-950/95
                p-2
                text-white
                shadow-2xl
                backdrop-blur-2xl
                scrollbar-thin
                scrollbar-thumb-gray-700
              "
              style={{
                left: contextMenu.x,
                top: contextMenu.y,
              }}
            >
              <div
                className="
                  sticky
                  top-0
                  z-10
                  mb-2
                  rounded-xl
                  border
                  border-white/10
                  bg-gray-950
                  p-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-500/10
                      text-purple-400
                    "
                  >
                    {contextMenu.type === "image" && (
                      <FaImage />
                    )}

                    {contextMenu.type === "link" && (
                      <FaLink />
                    )}

                    {contextMenu.type === "text" && (
                      <FaCopy />
                    )}

                    {contextMenu.type === "video" && (
                      <FaVideo />
                    )}

                    {contextMenu.type === "page" && (
                      <FaGlobe />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-xs
                        text-gray-500
                      "
                    >
                      Smart Context Menu
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {contextMenu.type === "image" &&
                        "خيارات الصورة"}

                      {contextMenu.type === "link" &&
                        "خيارات الرابط"}

                      {contextMenu.type === "text" &&
                        "خيارات النص"}

                      {contextMenu.type === "video" &&
                        "خيارات الفيديو"}

                      {contextMenu.type === "page" &&
                        "خيارات الصفحة"}
                    </p>
                  </div>

                  <button
                    onClick={closeContextMenu}
                    className="
                      rounded-lg
                      p-2
                      text-gray-400
                      transition
                      hover:bg-white/10
                      hover:text-white
                    "
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {contextMenu.type === "image" && (
                <>
                  <MenuItem
                    icon={<FaExternalLinkAlt />}
                    text="فتح الصورة"
                    onClick={() =>
                      openNewTab(contextMenu.src)
                    }
                  />

                  <MenuItem
                    icon={<FaCopy />}
                    text="نسخ رابط الصورة"
                    onClick={() =>
                      copyText(contextMenu.src)
                    }
                  />

                  <MenuItem
                    icon={<FaDownload />}
                    text="تحميل الصورة"
                    onClick={() =>
                      downloadImage(contextMenu.src)
                    }
                  />

                  <MenuItem
                    icon={<FaShareAlt />}
                    text="مشاركة الصورة"
                    onClick={sharePage}
                  />
                </>
              )}

              {contextMenu.type === "link" && (
                <>
                  <MenuItem
                    icon={<FaExternalLinkAlt />}
                    text="فتح الرابط"
                    onClick={() => {
                      window.location.href =
                        contextMenu.href;

                      closeContextMenu();
                    }}
                  />

                  <MenuItem
                    icon={<FaExternalLinkAlt />}
                    text="فتح في تبويب جديد"
                    onClick={() =>
                      openNewTab(
                        contextMenu.href
                      )
                    }
                  />

                  <MenuItem
                    icon={<FaCopy />}
                    text="نسخ الرابط"
                    onClick={() =>
                      copyText(
                        contextMenu.href
                      )
                    }
                  />

                  <MenuItem
                    icon={<FaShareAlt />}
                    text="مشاركة الرابط"
                    onClick={sharePage}
                  />
                </>
              )}

              {contextMenu.type === "text" && (
                <>
                  <MenuItem
                    icon={<FaCopy />}
                    text="نسخ النص"
                    onClick={() =>
                      copyText(
                        contextMenu.text
                      )
                    }
                  />

                  <MenuItem
                    icon={<FaSearch />}
                    text="البحث عن النص"
                    onClick={() =>
                      searchText(
                        contextMenu.text
                      )
                    }
                  />
                </>
              )}

              {contextMenu.type === "video" && (
                <>
                  <MenuItem
                    icon={
                      contextMenu.element?.paused ? (
                        <FaPlay />
                      ) : (
                        <FaPause />
                      )
                    }
                    text={
                      contextMenu.element?.paused
                        ? "تشغيل الفيديو"
                        : "إيقاف الفيديو"
                    }
                    onClick={toggleVideo}
                  />

                  <MenuItem
                    icon={<FaExpand />}
                    text="ملء شاشة الفيديو"
                    onClick={() => {
                      contextMenu.element?.requestFullscreen();

                      closeContextMenu();
                    }}
                  />
                </>
              )}

              {contextMenu.type === "page" && (
                <>
                  <MenuItem
                    icon={<FaHome />}
                    text="الرئيسية"
                    onClick={goHome}
                  />

                  <MenuItem
                    icon={<FaArrowLeft />}
                    text="رجوع"
                    onClick={goBack}
                  />

                  <MenuItem
                    icon={<FaArrowRight />}
                    text="تقدم"
                    onClick={goForward}
                  />

                  <MenuItem
                    icon={<FaRedo />}
                    text="تحديث الصفحة"
                    onClick={reloadPage}
                  />

                  <Divider />

                  <MenuItem
                    icon={<FaCopy />}
                    text="نسخ رابط الصفحة"
                    onClick={() =>
                      copyText(
                        window.location.href
                      )
                    }
                  />

                  <MenuItem
                    icon={<FaShareAlt />}
                    text="مشاركة الصفحة"
                    onClick={sharePage}
                  />

                  <Divider />

                  <MenuItem
                    icon={
                      darkMode ? (
                        <FaSun />
                      ) : (
                        <FaMoon />
                      )
                    }
                    text={
                      darkMode
                        ? "الوضع الفاتح"
                        : "الوضع الداكن"
                    }
                    onClick={toggleDarkMode}
                  />

                  <MenuItem
                    icon={
                      fullscreen ? (
                        <FaCompress />
                      ) : (
                        <FaExpand />
                      )
                    }
                    text={
                      fullscreen
                        ? "الخروج من ملء الشاشة"
                        : "ملء الشاشة"
                    }
                    onClick={toggleFullscreen}
                  />

                  <MenuItem
                    icon={<FaPrint />}
                    text="طباعة الصفحة"
                    onClick={printPage}
                  />

                  <MenuItem
                    icon={<FaArrowUp />}
                    text="العودة لأعلى الصفحة"
                    onClick={scrollTop}
                  />

                  <Divider />

                  <MenuItem
                    icon={<FaTachometerAlt />}
                    text="لوحة التحكم"
                    onClick={openDashboard}
                  />

                  <MenuItem
                    icon={<FaKeyboard />}
                    text="اختصارات لوحة المفاتيح"
                    onClick={() =>
                      alert(
                        "Escape = إغلاق القائمة\nCtrl + K = البحث"
                      )
                    }
                  />
                </>
              )}

              <div
                className="
                  mt-2
                  border-t
                  border-white/10
                  px-3
                  py-3
                  text-center
                  text-[11px]
                  text-gray-500
                "
              >
                القائمة الذكية للموقع
              </div>
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}

export default App;
