import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Play,
    X,
    Maximize2,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useProjects } from "../../dashboard/context-dash/ProjectsContext";

export default function ProjectDetails() {
    const { id } = useParams();
    const { projects, loading } = useProjects();

    const [project, setProject] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const currentProject = projects.find(
            (item) => String(item.id) === String(id)
        );

        setProject(currentProject || null);
    }, [projects, id]);

    if (loading && !project) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black">
                <div className="flex items-center gap-3 text-green-400">
                    <Loader2 size={35} className="animate-spin" />
                    <span className="text-lg font-bold">
                        جاري تحميل تفاصيل المشروع...
                    </span>
                </div>
            </main>
        );
    }

    if (!project) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black px-6">
                <div
                    dir="rtl"
                    className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center"
                >
                    <h1 className="text-3xl font-black text-white">
                        المشروع غير موجود
                    </h1>

                    <p className="mt-4 text-zinc-400">
                        لم نتمكن من العثور على المشروع المطلوب.
                    </p>

                    <Link
                        to="/works"
                        className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-green-500 px-7 py-4 font-black text-black transition hover:-translate-y-1"
                    >
                        العودة إلى معرض الأعمال
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </main>
        );
    }

    const images = Array.isArray(project.images)
        ? project.images
        : [];

    const videos = Array.isArray(project.videos)
        ? project.videos
        : [];

    const features = Array.isArray(project.features)
        ? project.features
        : [];

    return (
        <>
            <main className="overflow-hidden bg-black">
                <section className="relative bg-black pb-24 pt-32 md:pb-32">
                    <div className="absolute left-[-200px] top-[-150px] h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[180px]" />

                    <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-green-400/10 blur-[180px]" />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div
                            dir="rtl"
                            className="mb-12 flex items-center justify-between gap-5"
                        >
                            <Link
                                to="/works"
                                className="inline-flex items-center gap-3 text-sm font-bold text-zinc-400 transition hover:text-green-400"
                            >
                                <ArrowRight size={19} />
                                العودة إلى معرض الأعمال
                            </Link>

                            {project.category && (
                                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                                    {project.category}
                                </span>
                            )}
                        </div>

                        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                            <div
                                data-aos="fade-left"
                                className="lg:order-1"
                            >
                                {images.length > 0 ? (
                                    <>
                                        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-zinc-900 p-2 shadow-[0_30px_100px_rgba(34,197,94,.12)]">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(
                                                        images[0].url
                                                    )
                                                }
                                                className="group relative block w-full overflow-hidden rounded-[30px]"
                                            >
                                                <img
                                                    src={images[0].url}
                                                    alt={project.title}
                                                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[560px]"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                                    <span
                                                        dir="rtl"
                                                        className="rounded-full border border-white/10 bg-black/60 px-5 py-3 text-sm font-bold text-white backdrop-blur"
                                                    >
                                                        مشاهدة الصورة
                                                    </span>

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black">
                                                        <Maximize2 size={20} />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>

                                        <div
                                            className={`mt-5 grid gap-3 ${
                                                images.length === 1
                                                    ? "grid-cols-1"
                                                    : images.length === 2
                                                    ? "grid-cols-2"
                                                    : images.length === 3
                                                    ? "grid-cols-3"
                                                    : "grid-cols-4"
                                            }`}
                                        >
                                            {images.map((image, index) => (
                                                <button
                                                    key={image.id || index}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            image.url
                                                        )
                                                    }
                                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={`صورة المشروع ${
                                                            index + 1
                                                        }`}
                                                        className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                    />

                                                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex min-h-[420px] items-center justify-center rounded-[38px] border border-white/10 bg-zinc-900 md:min-h-[560px]">
                                        <p
                                            dir="rtl"
                                            className="text-zinc-500"
                                        >
                                            لا توجد صور لهذا المشروع
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div
                                dir="rtl"
                                data-aos="fade-right"
                                className="flex h-full flex-col justify-center lg:order-2"
                            >
                                <span className="w-fit rounded-full border border-green-500/20 bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                                    تفاصيل المشروع
                                </span>

                                <h1 className="mt-7 text-5xl font-black leading-[1.15] text-white md:text-6xl lg:text-7xl">
                                    {project.title}
                                </h1>

                                <div className="mt-8 h-px w-full bg-gradient-to-l from-green-500/50 via-white/10 to-transparent" />

                                {project.subtitle && (
                                    <p className="mt-8 text-xl leading-10 text-zinc-400">
                                        {project.subtitle}
                                    </p>
                                )}

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                                        <span className="text-sm text-zinc-500">
                                            المجال
                                        </span>

                                        <h3 className="mt-2 text-lg font-black text-green-400">
                                            {project.category || "غير محدد"}
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
                                        <span className="text-sm text-zinc-500">
                                            معرض الصور
                                        </span>

                                        <h3 className="mt-2 text-lg font-black text-white">
                                            {images.length}{" "}
                                            {images.length === 1
                                                ? "صورة"
                                                : "صور"}
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-9 flex flex-wrap gap-4">
                                    {project.project_url && (
                                        <a
                                            href={project.project_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 rounded-2xl bg-green-500 px-7 py-4 font-black text-black transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(34,197,94,.35)]"
                                        >
                                            مشاهدة المشروع
                                            <ExternalLink size={20} />
                                        </a>
                                    )}

                                    <a
                                        href="https://wa.me/2011111627007"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-green-400 px-7 py-4 font-black text-white transition hover:border-green-500 hover:text-black duration-200"
                                    >
                                        ابدأ مشروعك
                                        <FaWhatsapp size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative border-y border-white/5 bg-zinc-950 py-24 md:py-32">
                    <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-green-500/5 blur-[120px]" />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div
                            dir="rtl"
                            data-aos="fade-up"
                            className="max-w-4xl"
                        >
                            <span className="rounded-full bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                                عن المشروع
                            </span>

                            <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
                                وصف المشروع
                            </h2>

                            <div className="mt-8 h-1 w-20 rounded-full bg-green-500" />

                            <p className="mt-8 text-lg leading-10 text-zinc-400 md:text-xl">
                                {project.description ||
                                    project.short_description ||
                                    "لا يوجد وصف لهذا المشروع."}
                            </p>
                        </div>

                        {features.length > 0 && (
                            <div
                                dir="rtl"
                                className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                            >
                                {features.map((feature, index) => (
                                    <div
                                        key={`${feature}-${index}`}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        className="group rounded-3xl border border-white/10 bg-black/40 p-7 transition duration-300 hover:-translate-y-2 hover:border-green-500/30"
                                    >
                                        <CheckCircle2
                                            size={28}
                                            className="text-green-400 transition group-hover:scale-110"
                                        />

                                        <p className="mt-5 leading-8 text-zinc-300">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {images.length > 0 && (
                    <section className="bg-black py-24 md:py-32">
                        <div className="mx-auto max-w-7xl px-6">
                            <div
                                dir="rtl"
                                className="mb-12"
                            >
                                <span className="rounded-full bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                                    معرض الصور
                                </span>

                                <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
                                    تفاصيل المشروع بصريًا
                                </h2>

                                <p className="mt-5 max-w-2xl leading-8 text-zinc-500">
                                    استعرض تفاصيل المشروع والصور الخاصة به من
                                    خلال المعرض التالي.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {images.map((image, index) => (
                                    <button
                                        key={image.id || index}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(image.url)
                                        }
                                        className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-zinc-900 ${
                                            index === 0
                                                ? "md:row-span-2"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`تفاصيل المشروع ${
                                                index + 1
                                            }`}
                                            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
                                                index === 0
                                                    ? "min-h-[500px]"
                                                    : "h-[280px]"
                                            }`}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                                        <div className="absolute bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black opacity-0 transition duration-300 group-hover:opacity-100">
                                            <Maximize2 size={19} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {videos.length > 0 && (
                    <section className="border-t border-white/5 bg-zinc-950 py-24 md:py-32">
                        <div className="mx-auto max-w-7xl px-6">
                            <div
                                dir="rtl"
                                className="mb-12"
                            >
                                <span className="rounded-full bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                                    الفيديو
                                </span>

                                <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
                                    شاهد المشروع
                                </h2>

                                <p className="mt-5 max-w-2xl leading-8 text-zinc-500">
                                    شاهد تفاصيل المشروع من خلال الفيديوهات
                                    الخاصة به.
                                </p>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {videos.map((video, index) => (
                                    <button
                                        key={video.id || index}
                                        type="button"
                                        onClick={() =>
                                            setSelectedVideo(video.url)
                                        }
                                        className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-black"
                                    >
                                        <div className="aspect-video">
                                            <video
                                                src={video.url}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition duration-300 group-hover:bg-black/50">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500 text-black transition duration-300 group-hover:scale-110">
                                                <Play
                                                    size={30}
                                                    fill="currentColor"
                                                />
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6 text-right">
                                            <span
                                                dir="rtl"
                                                className="text-sm font-bold text-white"
                                            >
                                                {video.title ||
                                                    `فيديو المشروع ${
                                                        index + 1
                                                    }`}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="relative overflow-hidden bg-black py-24 md:py-32">
                    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[180px]" />

                    <div
                        dir="rtl"
                        className="relative mx-auto max-w-5xl px-6 text-center"
                    >
                        <span className="rounded-full bg-green-500/10 px-5 py-2 text-sm font-bold text-green-400">
                            هل لديك مشروع؟
                        </span>

                        <h2 className="mt-7 text-4xl font-black leading-tight text-white md:text-6xl">
                            جاهز نحول فكرتك إلى
                            <span className="block text-green-400">
                                مشروع احترافي؟
                            </span>
                        </h2>

                        <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-zinc-400">
                            تواصل معنا الآن وابدأ في بناء حضور رقمي احترافي
                            يناسب مشروعك ويعبر عن هويتك.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <a
                                href="https://wa.me/2011111627007"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-2xl bg-green-500 px-8 py-4 font-black text-black transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(34,197,94,.35)]"
                            >
                                تواصل معنا عبر واتساب
                                <FaWhatsapp size={21} />
                            </a>

                            <Link
                                to="/works"
                                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-8 py-4 font-black text-white transition hover:border-green-500 hover:text-green-400"
                            >
                                استكشف باقي المشاريع
                                <ArrowLeft size={20} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-white transition hover:border-green-500 hover:text-green-400"
                    >
                        <X size={22} />
                    </button>

                    <img
                        src={selectedImage}
                        alt="صورة المشروع"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain shadow-2xl"
                    />
                </div>
            )}

            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5 backdrop-blur-md"
                    onClick={() => setSelectedVideo(null)}
                >
                    <button
                        type="button"
                        onClick={() => setSelectedVideo(null)}
                        className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-white transition hover:border-green-500 hover:text-green-400"
                    >
                        <X size={22} />
                    </button>

                    <video
                        src={selectedVideo}
                        controls
                        autoPlay
                        playsInline
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="max-h-[90vh] max-w-[95vw] rounded-2xl"
                    />
                </div>
            )}
        </>
    );
}