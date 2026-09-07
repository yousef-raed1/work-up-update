import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaWhatsapp } from "react-icons/fa";
import { ArrowRight, Loader2 } from "lucide-react";
import { useProjects } from "../../dashboard/context-dash/ProjectsContext";

export default function Works() {
    const { projects, loading, error } = useProjects();

    const [activeCategory, setActiveCategory] = useState("الكل");

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                projects
                    .map((project) => project.category)
                    .filter(Boolean)
            ),
        ];

        return ["الكل", ...uniqueCategories];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "الكل") {
            return projects;
        }

        return projects.filter(
            (project) => project.category === activeCategory
        );
    }, [projects, activeCategory]);

    return (
        <>
            <section className="relative overflow-hidden bg-black py-32">
                <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-500/10 blur-[180px]" />

                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-green-400/10 blur-[180px]" />

                <div className="relative mx-auto max-w-7xl px-6">
                    <div
                        className="grid items-center gap-20 lg:grid-cols-2"
                        dir="rtl"
                    >
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                        >
                            <span className="rounded-full bg-green-500/10 px-5 py-2 text-green-400">
                                معرض أعمالنا
                            </span>

                            <h1 className="mt-8 text-6xl font-black leading-tight text-white">
                                مشاريع نفخر
                                <br />
                                <span className="text-green-400">
                                    بتنفيذها
                                </span>
                            </h1>

                            <p className="mt-8 max-w-xl text-lg leading-9 text-zinc-400">
                                نفذنا العديد من المشاريع في مجالات مختلفة،
                                ونستمر دائمًا في تقديم حلول احترافية تناسب
                                احتياجات عملائنا.
                            </p>

                            <div className="mt-12 flex flex-wrap gap-5">
                                <a
                                    href="https://wa.me/2011111627007"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl bg-green-500 px-8 py-4 font-bold text-black transition hover:scale-105"
                                >
                                    ابدأ مشروعك الآن
                                </a>
                            </div>
                        </div>

                        <div
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            className="relative"
                        >
                            <div className="flex min-h-[400px] items-center justify-center rounded-[35px] border border-green-500/10 bg-gradient-to-br from-green-500/10 via-zinc-900 to-black shadow-[0_25px_70px_rgba(34,197,94,.15)]">
                                <div className="text-center">
                                    <div className="text-7xl font-black text-green-400">
                                        +{projects.length}
                                    </div>

                                    <p className="mt-4 text-xl font-bold text-gray-300">
                                        مشروع في معرض أعمالنا
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex items-center py-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-green-500" />

                <div className="mx-6 flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 backdrop-blur-md">
                    <FaBolt className="text-lg text-green-400" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        هدفنا دائما التألق
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-700 to-green-500" />
            </div>

            <section className="bg-black pb-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div
                        data-aos="fade-up"
                        className="py-6 text-center"
                        dir="rtl"
                    >
                        <span className="rounded-full px-5 py-2 text-green-400">
                            تصفح المشاريع
                        </span>

                        <h2 className="mt-6 text-5xl font-black text-white">
                            اختر المجال
                        </h2>

                        {loading ? (
                            <div className="mt-10 flex items-center justify-center gap-3 text-green-400">
                                <Loader2
                                    size={24}
                                    className="animate-spin"
                                />

                                <span>
                                    جاري تحميل المشاريع...
                                </span>
                            </div>
                        ) : (
                            <div className="mt-10 flex flex-wrap justify-center gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setActiveCategory(category)
                                        }
                                        className={`rounded-full border px-6 py-3 font-bold transition-all duration-300 ${
                                            activeCategory === category
                                                ? "border-green-500 bg-green-500 text-black"
                                                : "border-white/10 bg-zinc-900 text-gray-300 hover:border-green-500 hover:text-green-400"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="bg-black pb-32">
                <div className="mx-auto max-w-7xl px-6">
                    {error && !projects.length ? (
                        <div
                            dir="rtl"
                            className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400"
                        >
                            {error}
                        </div>
                    ) : loading ? (
                        <div className="flex min-h-[300px] items-center justify-center">
                            <Loader2
                                size={45}
                                className="animate-spin text-green-400"
                            />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div
                            dir="rtl"
                            className="rounded-2xl border border-white/10 bg-zinc-900 p-12 text-center"
                        >
                            <h3 className="text-2xl font-bold text-white">
                                لا توجد مشاريع
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                لا توجد مشاريع مضافة في هذا المجال حاليًا.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredProjects.map((project, index) => {
                                const mainImage =
                                    project.images?.[0]?.url || null;

                                return (
                                    <Link
                                        key={project.id}
                                        to={`/projects/${project.id}`}
                                        data-aos="zoom-in-up"
                                        data-aos-delay={index * 80}
                                        data-aos-duration="700"
                                        className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 transition-all duration-500 hover:-translate-y-3 hover:border-green-500 hover:shadow-[0_25px_60px_rgba(34,197,94,.18)]"
                                    >
                                        <div className="relative h-[340px] overflow-hidden">
                                            {mainImage ? (
                                                <img
                                                    src={mainImage}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
                                                    <span className="text-5xl font-black text-green-400">
                                                        {project.title?.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                            {project.category && (
                                                <span className="absolute right-5 top-5 rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black">
                                                    {project.category}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className="p-7 text-right"
                                            dir="rtl"
                                        >
                                            <h3 className="text-3xl font-black text-white transition group-hover:text-green-400">
                                                {project.title}
                                            </h3>

                                            {project.subtitle && (
                                                <p className="mt-4 leading-8 text-zinc-400">
                                                    {project.subtitle}
                                                </p>
                                            )}

                                            {project.short_description && (
                                                <p className="mt-3 line-clamp-2 leading-8 text-zinc-500">
                                                    {
                                                        project.short_description
                                                    }
                                                </p>
                                            )}

                                            <div className="mt-8 flex items-center justify-center">
                                                <span className="flex items-center gap-3 rounded-full border border-green-500 bg-transparent px-6 py-3 font-bold text-green-400 transition-all duration-300 group-hover:bg-green-500 group-hover:text-black group-hover:shadow-[0_15px_40px_rgba(34,197,94,.35)]">
                                                    معرفة المزيد

                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black transition-all duration-300 group-hover:rotate-45 group-hover:bg-black group-hover:text-green-400">
                                                        <ArrowRight size={22} />
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

<a
  href="https://wa.me/201005615686"
  target="_blank"
  rel="noopener noreferrer"
  className="
    fixed
    bottom-6
    left-6
    z-50
    group
    flex
    items-center
    gap-3
    rounded-full
    bg-[#25D366]
    px-6
    py-4
    text-white
    shadow-[0_15px_40px_rgba(37,211,102,.45)]
    transition-all
    duration-300
    hover:-translate-y-2
    hover:scale-105
    hover:shadow-[0_25px_60px_rgba(37,211,102,.6)]
    animate-[bounce_3s_ease-in-out_infinite]
  "
>
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-[#25D366]">
    <FaWhatsapp />
  </div>

  <div className="text-right">
    <p className="text-xs opacity-80">
      متواجد الآن
    </p>

    <h3 className="text-lg font-bold">
      تواصل عبر واتساب
    </h3>
  </div>

  <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-30 blur-xl transition duration-300 group-hover:opacity-70" />
</a>
        </>
    );
}