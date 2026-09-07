import React from "react";

import img_header from "../../assets/images/ChatGPT Image Jul 8, 2026, 12_23_36 AM.png";

import {
    FaTimes,
    FaBolt,
    FaWhatsapp,
} from "react-icons/fa";

import {
    PhoneCall,
    Search,
    Rocket,
    TrendingUp,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useProjects } from "../../dashboard/context-dash/Displaydash";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";

export default function Home() {
    const {
        projects = [],
        loading,
    } = useProjects();

    const API_URL = "http://127.0.0.1:8000";

    const problems = [
        {
            title: "إعلانات مكلفة",
            text: [
                "بدون عملاء حقيقيين.",
                "الكليكات لا تدفع الفواتير.",
                "أنت تحتاج عملاء، لا زيارات فقط.",
            ],
        },
        {
            title: "علامتك تختفي",
            text: [
                "وسط سوق مزدحم.",
                "المنتج الجيد وحده لا يكفي.",
                "تحتاج أن تكون واضحًا ومختلفًا.",
            ],
        },
        {
            title: "لا وقت للاختبار",
            text: [
                "والتحليل والتحسين.",
                "تحتاج نظامًا يعمل بوضوح،",
                "لتتفرغ أنت للنمو.",
            ],
        },
    ];

    const steps = [
        {
            number: "01",
            icon: <PhoneCall size={32} />,
            title: "احجز مكالمة",
            desc: "نسمع منك عن مشروعك وأهدافك والمرحلة الحالية.",
        },
        {
            number: "02",
            icon: <Search size={32} />,
            title: "نبحث ونخطط",
            desc: "نحلل السوق والجمهور والمنافسين لنحدد طريق النمو.",
        },
        {
            number: "03",
            icon: <Rocket size={32} />,
            title: "نطلق ونحسّن",
            desc: "ننفيذ الحملات، نختبر الرسائل، ونحسن الأداء باستمرار.",
        },
        {
            number: "04",
            icon: <TrendingUp size={32} />,
            title: "تحصل على نتائج",
            desc: "عملاء أكثر، مبيعات أكثر، ونمو حقيقي قابل للقياس.",
        },
    ];

    const getProjectImage = (project) => {
        if (project?.image_url) {
            return project.image_url;
        }

        if (project?.image) {
            if (
                project.image.startsWith("http://") ||
                project.image.startsWith("https://")
            ) {
                return project.image;
            }

            return `${API_URL}/storage/${project.image.replace(/^\/+/, "")}`;
        }

        return null;
    };

    return (
        <div dir="rtl" className="w-full overflow-x-hidden">
            <div className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={img_header}
                        alt=""
                        className="h-full w-full object-cover"
                    />

<div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/40 to-black/5" />
<div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="relative z-10 flex min-h-screen items-center">
                    <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
                        <div className="ml-auto max-w-3xl text-center lg:text-right">
                            <span
                                className="
                                    animate__animated
                                    animate__fadeInDown
                                    inline-flex
                                    items-center
                                    rounded-full
                                    border
                                    border-[#00c0a9]/40
                                    bg-[#00c0a9]/15
                                    px-4
                                    py-2
                                    text-xs
                                    font-semibold
                                    text-[#00c0a9]
                                    backdrop-blur-md
                                    sm:text-sm
                                "
                            >
                                🚀 منصة Work-Up
                            </span>

                            <h1
                                className="
                                    animate__animated
                                    animate__fadeInUp
                                    animate__delay-1s
                                    mt-6
                                    bg-gradient-to-r
                                    from-[#00c0a9]
                                    to-[#532aaa]
                                    bg-clip-text
                                    text-4xl
                                    font-black
                                    leading-tight
                                    text-transparent
                                    sm:text-5xl
                                    lg:text-7xl
                                "
                            >
                                اصنع مستقبلك المهني
                                <br />
                                وابدأ رحلة النجاح معنا
                            </h1>

                            <p
                                className="
                                    animate__animated
                                    animate__fadeInUp
                                    animate__delay-2s
                                    mt-6
                                    text-base
                                    leading-8
                                    text-gray-200
                                    sm:text-lg
                                    sm:leading-9
                                    lg:text-xl
                                    lg:leading-10
                                "
                            >
                                نؤمن أن كل شخص يمتلك القدرة على تحقيق أهدافه المهنية.
                                <br className="hidden md:block" />
                                فرصتك القادمة تبدأ بخطوة واحدة فقط.
                                <br className="hidden md:block" />
                                انضم إلى مجتمع يساعدك على التطور واكتساب المهارات
                                والوصول إلى أفضل الفرص.
                            </p>

                            <div
                                className="
                                    animate__animated
                                    animate__fadeInUp
                                    animate__delay-3s
                                    mt-10
                                    flex
                                    flex-col
                                    justify-center
                                    gap-4
                                    sm:flex-row
                                    lg:justify-start
                                "
                            >
                                <a
                                    href="https://wa.me/201005615686"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-[#00c0a9]
                                        to-[#532aaa]
                                        px-8
                                        py-4
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-[#532aaa]/20
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:scale-105
                                        hover:shadow-xl
                                        hover:shadow-[#00c0a9]/20
                                    "
                                >
                                    ابدأ الآن
                                </a>

                                <a
                                    href="/services"
                                    className="
                                        rounded-xl
                                        border
                                        border-[#00c0a9]
                                        px-8
                                        py-4
                                        font-bold
                                        text-[#00c0a9]
                                        transition-all
                                        duration-300
                                        hover:border-[#532aaa]
                                        hover:bg-[#532aaa]
                                        hover:text-white
                                    "
                                >
                                    اعرف المزيد
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#532aaa] to-[#00c0a9]" />

                <div
                    className="
                        mx-6
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-[#00c0a9]/30
                        bg-gradient-to-r
                        from-[#00c0a9]/10
                        to-[#532aaa]/10
                        px-6
                        py-3
                        backdrop-blur-md
                    "
                >
                    <FaBolt className="text-lg text-[#00c0a9]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        أكثر من 100 شركة تثق بخدماتنا
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#532aaa] to-[#00c0a9]" />
            </div>

            <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
                <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#532aaa]/15 blur-[120px]" />

                <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#00c0a9]/10 blur-[120px]" />

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div
                        data-aos="fade-up"
                        className="mb-12 text-center"
                    >
                        <span
                            className="
                                inline-flex
                                rounded-full
                                border
                                border-[#00c0a9]/30
                                bg-[#00c0a9]
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-black
                                sm:px-5
                                sm:text-sm
                            "
                        >
                            التحديات
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                            هل ما زلت تواجه هذه

                            <span className="bg-gradient-to-r from-[#00c0a9] to-[#532aaa] bg-clip-text text-transparent">
                                {" "}المشاكل
                            </span>
                            ؟
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:text-lg">
                            أغلب الشركات لا تخسر بسبب جودة خدماتها،
                            بل بسبب غياب خطة تسويق واضحة.
                        </p>
                    </div>

<div className="space-y-5">
    {problems.map((item, index) => (
        <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                border-[#00c0a9]/30
                bg-[#101010]
                p-5
                text-right
                md:flex-row
                md:items-center
                md:justify-between
            "
        >
            <div className="flex items-center gap-4 sm:gap-5">
                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#00c0a9]
                        sm:h-12
                        sm:w-12
                    "
                >
                    <FaTimes className="text-lg text-black" />
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white sm:text-xl">
                        {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-400">
                        {item.text.join(" ")}
                    </p>
                </div>
            </div>
        </div>
    ))}
</div>
                </div>
            </section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#532aaa] to-[#00c0a9]" />

                <div
                    className="
                        mx-6
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-[#00c0a9]/30
                        bg-gradient-to-r
                        from-[#00c0a9]/10
                        to-[#532aaa]/10
                        px-6
                        py-3
                        backdrop-blur-md
                    "
                >
                    <FaBolt className="text-lg text-[#00c0a9]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        هدفنا النجاح دائما
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#532aaa] to-[#00c0a9]" />
            </div>

<section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
                <div

                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                >
                    <div
                        className="
                            rounded-3xl
                            border
                            border-black/10
                            bg-white
                            p-6
                            text-right
                            text-black
                            shadow-lg
                            sm:p-8
                        "
                    >
                        <div className="mb-8 flex items-center justify-between">
                            <span
                                className="
                                    bg-gradient-to-r
                                    from-[#00c0a9]
                                    to-[#532aaa]
                                    bg-clip-text
                                    text-4xl
                                    font-bold
                                    text-transparent
                                    sm:text-5xl
                                "
                            >
                                {step.number}
                            </span>

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-black
                                    text-xl
                                    text-white
                                    sm:h-16
                                    sm:w-16
                                "
                            >
                                {step.icon}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[#00c0a9] sm:text-3xl">
                            {step.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-9">
                            {step.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#532aaa] to-[#00c0a9]" />

                <div
                    className="
                        mx-6
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-[#00c0a9]/30
                        bg-gradient-to-r
                        from-[#00c0a9]/10
                        to-[#532aaa]/10
                        px-6
                        py-3
                        backdrop-blur-md
                    "
                >
                    <FaBolt className="text-lg text-[#00c0a9]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        طور من نفسك معنا
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#532aaa] to-[#00c0a9]" />
            </div>

            <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
                <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#532aaa]/20 blur-[150px] sm:h-96 sm:w-96 sm:blur-[180px]" />

                <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#00c0a9]/10 blur-[130px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="mb-12 text-center lg:mb-16"
                        data-aos="fade-up"
                    >
                        <span
                            className="
                                inline-block
                                rounded-full
                                border
                                border-[#00c0a9]/30
                                bg-[#00c0a9]/10
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                text-[#00c0a9]
                                sm:px-5
                                sm:text-sm
                            "
                        >
                            أعمالنا
                        </span>

                        <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                            نتائج حقيقية...

                            <span className="bg-gradient-to-r from-[#00c0a9] to-[#532aaa] bg-clip-text text-transparent">
                                {" "}في مشاريع حقيقية
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base lg:text-lg lg:leading-8">
                            نفخر بتنفيذ مواقع وتجارب رقمية احترافية تساعد الشركات
                            على زيادة المبيعات وتحسين الهوية وتحقيق نمو حقيقي.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <p className="text-lg text-white">
                                جاري تحميل المشاريع...
                            </p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex items-center justify-center py-20">
                            <p className="text-lg text-gray-400">
                                لا توجد مشاريع حاليًا
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            <Swiper
                                modules={[Navigation]}
                                navigation={{
                                    prevEl: ".projects-prev",
                                    nextEl: ".projects-next",
                                }}
                                spaceBetween={24}
                                slidesPerView={1}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                    },
                                }}
                                className="projects-slider"
                            >
                                {projects.map((project) => {
                                    const imageUrl =
                                        getProjectImage(project);

                                    return (
                                        <SwiperSlide key={project.id}>
                                            <div
                                                className="
                                                    group
                                                    relative
                                                    h-[380px]
                                                    overflow-hidden
                                                    rounded-3xl
                                                    border
                                                    border-white/10
                                                    sm:h-[430px]
                                                    lg:h-[500px]
                                                "
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={
                                                            project.name ||
                                                            "Project"
                                                        }
                                                        className="
                                                            absolute
                                                            inset-0
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition
                                                            duration-700
                                                            group-hover:scale-110
                                                        "
                                                        onError={(e) => {
                                                            e.currentTarget.style.display =
                                                                "none";
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                                                            absolute
                                                            inset-0
                                                            flex
                                                            items-center
                                                            justify-center
                                                            bg-gradient-to-br
                                                            from-[#532aaa]
                                                            to-[#00c0a9]
                                                        "
                                                    >
                                                        <span className="text-6xl font-black text-white/80">
                                                            {project.name?.charAt(
                                                                0
                                                            ) || "P"}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                                <div
                                                    className="
                                                        absolute
                                                        bottom-0
                                                        left-0
                                                        right-0
                                                        p-6
                                                        text-right
                                                        sm:p-8
                                                    "
                                                >
                                                    <span className="text-sm font-semibold text-[#00c0a9]">
                                                        {project.category}
                                                    </span>

                                                    <h3
                                                        className="
                                                            mt-3
                                                            text-2xl
                                                            font-bold
                                                            text-white
                                                            sm:text-3xl
                                                        "
                                                    >
                                                        {project.name}
                                                    </h3>

                                                    <p className="mt-3 text-gray-300">
                                                        {project.description}
                                                    </p>

                                                    <div
                                                        className="
                                                            mt-6
                                                            flex
                                                            items-center
                                                            justify-between
                                                        "
                                                    >
                                                        <span className="text-white">
                                                            {project.client}
                                                        </span>

                                                        <span
                                                            className="
                                                                rounded-full
                                                                bg-[#00c0a9]
                                                                px-4
                                                                py-2
                                                                text-sm
                                                                font-semibold
                                                                text-black
                                                            "
                                                        >
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>

                            <div className="mt-8 flex items-center justify-center gap-4">
                                <button
                                    className="
                                        projects-prev
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[#00c0a9]/30
                                        bg-[#00c0a9]/10
                                        text-[#00c0a9]
                                        transition-all
                                        duration-300
                                        hover:bg-[#00c0a9]
                                        hover:text-black
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                    aria-label="المشاريع السابقة"
                                >
                                    <ChevronRight size={22} />
                                </button>

                                <button
                                    className="
                                        projects-next
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[#532aaa]/30
                                        bg-[#532aaa]/10
                                        text-[#532aaa]
                                        transition-all
                                        duration-300
                                        hover:bg-[#532aaa]
                                        hover:text-white
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                    aria-label="المشاريع التالية"
                                >
                                    <ChevronLeft size={22} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-center">
                        <a
                            href="/services"
                            className="
                                mt-16
                                group
                                inline-flex
                                items-center
                                gap-3
                                rounded-full
                                bg-gradient-to-r
                                from-[#00c0a9]
                                to-[#532aaa]
                                px-7
                                py-3.5
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:scale-105
                                hover:shadow-[0_15px_35px_rgba(0,192,169,.35)]
                            "
                        >
                            معرفة المزيد

                            <span
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-black
                                    text-[#00c0a9]
                                    transition-all
                                    duration-300
                                    group-hover:-translate-x-1
                                    group-hover:-rotate-45
                                "
                            >
                                <ArrowRight size={18} />
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#532aaa] to-[#00c0a9]" />

                <div
                    className="
                        mx-6
                        flex
                        items-center
                        gap-3
                        rounded-full
                        border
                        border-[#00c0a9]/30
                        bg-gradient-to-r
                        from-[#00c0a9]/10
                        to-[#532aaa]/10
                        px-6
                        py-3
                        backdrop-blur-md
                    "
                >
                    <FaBolt className="text-lg text-[#00c0a9]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        شركاء نجاح كل شركة
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#532aaa] to-[#00c0a9]" />
            </div>

            <section
                className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
                data-aos="fade-up"
            >
                <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#00c0a9]/20 blur-[100px] sm:h-72 sm:w-72 lg:h-80 lg:w-80 lg:blur-[140px]" />

                <div className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-[#532aaa]/20 blur-[90px] sm:h-64 sm:w-64 lg:h-72 lg:w-72 lg:blur-[130px]" />

                <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-2xl lg:rounded-[40px]">
                        <div className="grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
                            <div
                                data-aos="fade-left"
                                data-aos-duration="900"
                                className="text-right"
                            >
                                <span
                                    className="
                                        inline-block
                                        rounded-full
                                        bg-[#00c0a9]/10
                                        px-4
                                        py-2
                                        text-xs
                                        font-semibold
                                        text-[#00a58f]
                                        sm:px-5
                                        sm:text-sm
                                    "
                                >
                                    تواصل معنا
                                </span>

                                <h2 className="mt-6 text-3xl font-black leading-tight text-black sm:text-4xl lg:text-5xl">
                                    جاهز تبدأ مشروعك؟

                                    <br />

                                    <span className="bg-gradient-to-r from-[#00c0a9] to-[#532aaa] bg-clip-text text-transparent">
                                        خلينا نتكلم على واتساب.
                                    </span>
                                </h2>

                                <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
                                    ابعتلنا فكرة مشروعك أو نشاطك التجاري،
                                    وهنرد عليك في أسرع وقت ونساعدك نوصل
                                    لأفضل حل يناسب أهدافك.
                                </p>

                                <a
                                    href="https://wa.me/2011111627007"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        mt-8
                                        inline-flex
                                        items-center
                                        gap-3
                                        rounded-full
                                        bg-gradient-to-r
                                        from-[#00c0a9]
                                        to-[#532aaa]
                                        px-6
                                        py-4
                                        text-base
                                        font-bold
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:scale-105
                                        hover:shadow-[0_20px_50px_rgba(83,42,170,.35)]
                                        sm:px-8
                                        sm:py-5
                                        sm:text-lg
                                    "
                                >
                                    <FaWhatsapp className="text-2xl sm:text-3xl" />

                                    ابدأ المحادثة الآن
                                </a>
                            </div>

                            <div
                                className="flex justify-center"
                                data-aos="zoom-in"
                                data-aos-delay="200"
                                data-aos-duration="900"
                            >
                                <div
                                    className="
                                        relative
                                        flex
                                        h-56
                                        w-56
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-gradient-to-br
                                        from-[#00c0a9]
                                        to-[#532aaa]
                                        shadow-[0_0_60px_rgba(83,42,170,.35)]
                                        sm:h-64
                                        sm:w-64
                                        lg:h-72
                                        lg:w-72
                                    "
                                >
                                    <div
                                        className="
                                            absolute
                                            h-[250px]
                                            w-[250px]
                                            animate-ping
                                            rounded-full
                                            border
                                            border-[#00c0a9]
                                            opacity-20
                                            sm:h-[290px]
                                            sm:w-[290px]
                                            lg:h-[320px]
                                            lg:w-[320px]
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            h-[210px]
                                            w-[210px]
                                            rounded-full
                                            border
                                            border-white/30
                                            sm:h-[240px]
                                            sm:w-[240px]
                                            lg:h-[260px]
                                            lg:w-[260px]
                                        "
                                    />

                                    <FaWhatsapp className="text-[90px] text-white sm:text-[110px] lg:text-[130px]" />
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}
