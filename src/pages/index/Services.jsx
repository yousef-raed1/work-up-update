import React, { useEffect } from "react";
import hero from "../../assets/images/لقطة شاشة 2026-04-20 233354.png";
import bac from "../../assets/images/لقطة شاشة 2026-04-20 233354.png";

import {
    FaBullhorn,
    FaGlobe,
    FaSearch,
    FaPalette,
    FaChartLine,
    FaLaptopCode,
    FaRocket,
    FaLightbulb,
    FaHeadset,
    FaBolt,
    FaStar,
    FaAward,
    FaUsers,
    FaBox,
    FaBoxes,
    FaGift,
    FaShippingFast,
    FaCube,
    FaTags,
    FaWhatsapp
} from "react-icons/fa";

import { useServices } from "../../dashboard/context-dash/ServicesContext";
import { useWhyUs } from "../../dashboard/context-dash/WhyUsContext";

export default function Services() {
    const {
        services = [],
        loading,
        error,
        fetchServices
    } = useServices();

    const {
        items: whyUsItems = [],
        loading: whyUsLoading,
        error: whyUsError,
        fetchItems: fetchWhyUs
    } = useWhyUs();

    useEffect(() => {
        fetchServices();
        fetchWhyUs();
    }, [fetchServices, fetchWhyUs]);

    const iconMap = {
        FaStar,
        FaAward,
        FaUsers,
        FaBullhorn,
        FaGlobe,
        FaSearch,
        FaPalette,
        FaChartLine,
        FaLaptopCode,
        FaRocket,
        FaLightbulb,
        FaHeadset,
        FaBolt,
        FaBox,
        FaBoxes,
        FaGift,
        FaShippingFast,
        FaCube,
        FaTags
    };

    const steps = [
        {
            number: "01",
            title: "اكتشاف المشروع",
            desc: "نجلس معك لفهم نشاطك التجاري، أهدافك، جمهورك، ونقاط القوة التي تميزك عن المنافسين."
        },
        {
            number: "02",
            title: "تحليل السوق",
            desc: "ندرس المنافسين والسوق المستهدف ونحدد أفضل الفرص لتحقيق أعلى عائد ممكن."
        },
        {
            number: "03",
            title: "وضع الاستراتيجية",
            desc: "نضع خطة تسويقية متكاملة تشمل المحتوى والإعلانات والهوية وخطة النمو."
        },
        {
            number: "04",
            title: "التنفيذ والتحسين",
            desc: "نطلق الحملات ونراقب الأداء باستمرار مع تحسين النتائج للوصول إلى أفضل عائد."
        }
    ];

    return (
        <div dir="rtl" className="w-full">
            <section className="relative overflow-hidden bg-black py-16 sm:py-20 lg:py-28">
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00c0a9]/20 blur-[120px] sm:h-80 sm:w-80 lg:h-96 lg:w-96 lg:blur-[180px]" />

                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-yellow-400/10 blur-[120px] sm:h-80 sm:w-80 lg:h-96 lg:w-96 lg:blur-[180px]" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
                    <div
                        className="relative"
                        data-aos="fade-left"
                        data-aos-duration="900"
                    >
                        <img
                            src={hero}
                            alt=""
                            className="w-full rounded-[24px] object-cover shadow-[0_0_80px_rgba(34,197,94,.2)] sm:rounded-[30px] lg:rounded-[40px]"
                        />
                    </div>

                    <div
                        data-aos="fade-right"
                        data-aos-duration="900"
                        className="text-right"
                    >
                        <span className="inline-block rounded-full border border-green-500/30 bg-[#00c0a9]/10 px-4 py-2 text-xs font-semibold text-[#532aaa] sm:px-5 sm:text-sm">
                            خدماتنا
                        </span>

                        <h1 className="mt-6 text-3xl font-black leading-tight text-[#00c0a9] sm:text-5xl lg:mt-8 lg:text-6xl">
                            نصنع
                            <span className="text-[#532aaa]">
                                {" "}نموًا حقيقيًا
                            </span>
                            <br />
                            لعلامتك التجارية
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9 lg:mt-8">
                            نحن وكالة تسويق رقمي تساعد الشركات على بناء حضور قوي،
                            زيادة العملاء، وتحقيق نتائج حقيقية من خلال استراتيجيات
                            تسويق مدروسة وتقنيات حديثة.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-16 lg:gap-5">
                            <div
                                className="rounded-3xl border border-white/10 bg-zinc-900 p-5 text-center"
                                data-aos="zoom-in"
                                data-aos-delay="100"
                            >
                                <h2 className="text-3xl font-black text-[#532aaa] sm:text-4xl">
                                    150+
                                </h2>

                                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                                    مشروع
                                </p>
                            </div>

                            <div
                                className="rounded-3xl border border-white/10 bg-zinc-900 p-5 text-center"
                                data-aos="zoom-in"
                                data-aos-delay="250"
                            >
                                <h2 className="text-3xl font-black text-[#532aaa] sm:text-4xl">
                                    80+
                                </h2>

                                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                                    عميل
                                </p>
                            </div>

                            <div
                                className="rounded-3xl border border-white/10 bg-zinc-900 p-5 text-center"
                                data-aos="zoom-in"
                                data-aos-delay="400"
                            >
                                <h2 className="text-3xl font-black text-[#532aaa] sm:text-4xl">
                                    5+
                                </h2>

                                <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                                    سنوات خبرة
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-green-500" />

                <div className="mx-6 flex items-center gap-3 rounded-full border border-green-500/30 bg-[#00c0a9]/10 px-6 py-3 backdrop-blur-md">
                    <FaBolt className="text-lg text-[#532aaa]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        طور من نفسك معنا
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-700 to-green-500" />
            </div>

            <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32">
                <div className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#532aaa]/20 blur-[120px]" />

                <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-[#00c0a9]/15 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
                        <div
                            data-aos="fade-right"
                            data-aos-duration="900"
                            className="relative order-1 w-full"
                        >
                            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-[#00c0a9]/20 sm:-right-8 sm:-top-8 sm:h-40 sm:w-40" />

                            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full border border-[#532aaa]/20 sm:-bottom-10 sm:-left-10 sm:h-44 sm:w-44" />

                            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-zinc-900 p-2 shadow-2xl shadow-[#532aaa]/10 sm:rounded-[40px] sm:p-3">
                                <div className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-[24px] bg-zinc-950 sm:h-[480px] sm:rounded-[32px] lg:h-[550px]">
                                    <img
                                        src={bac}
                                        alt="تصميم الهوية البصرية والتغليف"
                                        className="h-full w-full object-contain p-4 transition-transform duration-700 hover:scale-105 sm:p-6"
                                    />

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                                    <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between sm:bottom-7 sm:right-7 sm:left-7">
                                        <div className="text-right">
                                            <span className="text-xs font-medium text-zinc-300">
                                                BRANDING PROJECT
                                            </span>

                                            <h3 className="mt-1 text-xl font-black text-[#00c0a9] sm:text-2xl">
                                                Restaurant Packaging
                                            </h3>
                                        </div>

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                                            <span className="text-lg text-[#00c0a9]">
                                                ↗
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-3 top-1/3 rounded-2xl border border-white/10 bg-zinc-950/90 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#00c0a9] shadow-lg shadow-[#00c0a9]/50" />

                                    <span className="text-xs font-bold text-[#00c0a9] sm:text-sm">
                                        Creative Packaging
                                    </span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 left-5 rounded-2xl border border-white/10 bg-zinc-950/90 px-5 py-3 shadow-xl backdrop-blur-md sm:-bottom-6 sm:left-8">
                                <span className="bg-gradient-to-r from-[#00c0a9] to-[#532aaa] bg-clip-text text-lg font-black text-transparent">
                                    #01
                                </span>
                            </div>
                        </div>

                        <div
                            data-aos="fade-left"
                            data-aos-duration="900"
                            className="order-2 w-full text-right lg:pl-2"
                        >
                            <div className="mb-7 flex items-center justify-start gap-4">
                                <span className="h-px w-12 bg-gradient-to-r from-[#00c0a9] to-[#532aaa]" />

                                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#00c0a9]">
                                    Visual Identity & Packaging
                                </span>
                            </div>

                            <div className="flex justify-start gap-5 sm:gap-7">
                                <div className="max-w-2xl">
                                    <h2 className="text-4xl font-black leading-[1.2] text-[#00c0a9] sm:text-5xl lg:text-6xl">
                                        نصنع هوية

                                        <span className="block bg-gradient-to-l from-[#00c0a9] to-[#532aaa] bg-clip-text text-transparent">
                                            تُرى وتُحكى
                                        </span>
                                    </h2>

                                    <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9">
                                        نبتكر هويات بصرية تجعل علامتك التجارية مختلفة من أول نظرة.
                                        من الشعار والألوان إلى تصميم التغليف والباكدج، نصنع تجربة
                                        متكاملة تجعل مشروعك أكثر احترافية وأسهل في التذكر.
                                    </p>

                                    <p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">
                                        لأن المنتج المميز لا يحتاج فقط إلى منتج رائع، بل يحتاج إلى
                                        هوية تعكس قيمته وتترك انطباعًا لا يُنسى.
                                    </p>

                                    <div className="mt-8 flex flex-wrap justify-start gap-3">
                                        <span className="rounded-full border border-[#00c0a9]/20 bg-[#00c0a9]/10 px-4 py-2 text-sm font-semibold text-[#00c0a9]">
                                            الهوية البصرية
                                        </span>

                                        <span className="rounded-full border border-[#532aaa]/30 bg-[#532aaa]/10 px-4 py-2 text-sm font-semibold text-[#a98cff]">
                                            تصميم التغليف
                                        </span>

                                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                                            Brand Design
                                        </span>
                                    </div>

                                    <div className="mt-9 flex justify-start">
                                        <button className="rounded-full bg-gradient-to-l from-[#00c0a9] to-[#532aaa] px-7 py-3.5 text-sm font-bold text-black shadow-lg shadow-[#532aaa]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00c0a9]/20">
                                            اكتشف أعمالنا

                                            <span className="mr-2">
                                                ←
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden h-[250px] w-1 shrink-0 rounded-full bg-gradient-to-b from-[#00c0a9] via-[#532aaa] to-transparent sm:block" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-green-500" />

                <div className="mx-6 flex items-center gap-3 rounded-full border border-green-500/30 bg-[#00c0a9]/10 px-6 py-3 backdrop-blur-md">
                    <FaBolt className="text-lg text-[#532aaa]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        طور من نفسك معنا
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-700 to-green-500" />
            </div>

            <section className="bg-black py-16 sm:py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="mb-12 text-center lg:mb-20"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <span className="inline-block rounded-full bg-[#00c0a9]/10 px-4 py-2 text-xs font-semibold text-[#532aaa] sm:px-5 sm:text-sm">
                            خدماتنا
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight text-[#00c0a9] sm:text-4xl lg:mt-6 lg:text-5xl">
                            كل ما تحتاجه لتنمية

                            <span className="text-[#532aaa]">
                                {" "}نشاطك التجاري
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9 lg:mt-6">
                            نقدم حلول تسويق رقمي متكاملة بدايةً من بناء الهوية
                            وحتى إطلاق الحملات وتحليل النتائج.
                        </p>
                    </div>

                    {loading && (
                        <div className="flex justify-center py-10">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#00c0a9]" />
                        </div>
                    )}

                    {!loading && error && (
                        <div className="py-10 text-center">
                            <p className="text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        services.length === 0 && (
                            <div className="py-10 text-center">
                                <p className="text-zinc-400">
                                    لا توجد خدمات حاليًا
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        services.length > 0 && (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {services.map((item, index) => {
                                    const ServiceIcon =
                                        iconMap[item.icon] ||
                                        FaBolt;

                                    return (
                                        <div
                                            key={item.id}
                                            data-aos="fade-up"
                                            data-aos-delay={
                                                index * 150
                                            }
                                            data-aos-duration="800"
                                            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 p-6 text-right transition-all duration-500 hover:-translate-y-3 hover:border-green-500 sm:rounded-[35px] sm:p-8"
                                        >
                                            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[#00c0a9]/10 blur-3xl transition-all duration-500 group-hover:bg-[#00c0a9]/20" />

                                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00c0a9] to-[#532aaa] text-3xl text-black shadow-lg shadow-[#532aaa]/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 sm:mb-8 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl">
                                                <ServiceIcon />
                                            </div>

                                            <h3 className="text-2xl font-bold text-[#00c0a9] sm:text-3xl">
                                                {item.title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:mt-5 sm:text-base sm:leading-8">
                                                {item.description}
                                            </p>

                                            <button className="mt-8 font-semibold text-[#532aaa] transition-all duration-300 group-hover:-translate-x-2 sm:mt-10">
                                                اعرف المزيد ←
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                </div>
            </section>

            <div className="flex items-center py-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-green-500" />

                <div className="mx-6 flex items-center gap-3 rounded-full border border-green-500/30 bg-[#00c0a9]/10 px-6 py-3 backdrop-blur-md">
                    <FaBolt className="text-lg text-[#532aaa]" />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                        طور من نفسك معنا
                    </span>
                </div>

                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-700 to-green-500" />
            </div>

            <section className="relative overflow-hidden bg-zinc-950 py-16 sm:py-20 lg:py-28">
                <div className="absolute right-1/2 top-20 h-72 w-72 translate-x-1/2 rounded-full bg-[#00c0a9]/10 blur-[140px] sm:h-[400px] sm:w-[400px] sm:blur-[170px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <span className="inline-block rounded-full bg-[#00c0a9]/10 px-4 py-2 text-xs font-semibold text-[#532aaa] sm:px-5 sm:text-sm">
                            كيف نعمل؟
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight text-[#00c0a9] sm:text-4xl lg:mt-6 lg:text-5xl">
                            خطواتنا نحو

                            <span className="text-[#532aaa]">
                                {" "}نجاح مشروعك
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9">
                            نعتمد على خطة واضحة ومدروسة تضمن تنفيذ مشروعك بأعلى جودة
                            وتحقيق أفضل النتائج الممكنة.
                        </p>
                    </div>

                    <div className="relative mt-14 lg:mt-24">
                        <div className="absolute left-12 top-0 hidden h-full w-[2px] bg-gradient-to-b from-green-500 via-green-400/50 to-transparent lg:block" />

                        <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                            {steps.map((step, index) => (
                                <div
                                    key={step.number}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                    data-aos-duration="800"
                                    className="group relative flex flex-col gap-6 rounded-[24px] border border-white/10 bg-zinc-900 p-6 text-right transition-all duration-500 hover:-translate-y-2 hover:bg-zinc-800 sm:p-8 lg:flex-row lg:items-center lg:gap-8 lg:rounded-[35px] lg:p-10"
                                >
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-green-500 bg-black text-2xl font-black text-[#532aaa] shadow-[0_0_30px_rgba(34,197,94,.25)] sm:h-24 sm:w-24 sm:text-3xl">
                                        {step.number}
                                    </div>

                                    <div className="flex-1">
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
                </div>
            </section>

            <section className="backend bg-white py-16 sm:py-20 lg:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="text-center"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-600 sm:px-6 sm:text-sm">
                            لماذا نحن؟
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight text-black sm:text-4xl lg:mt-6 lg:text-5xl">
                            لماذا تختار

                            <span className="text-green-500">
                                {" "}شركتنا؟
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-500 sm:text-lg sm:leading-9">
                            نحن لا نقدم خدمة فقط، بل نبني شراكة تساعد نشاطك التجاري
                            على النمو وتحقيق أهدافه.
                        </p>
                    </div>

                    {whyUsLoading && (
                        <div className="mt-12 flex justify-center xl:mt-20">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />
                        </div>
                    )}

                    {!whyUsLoading && whyUsError && (
                        <div className="mt-12 text-center xl:mt-20">
                            <p className="text-red-500">
                                {whyUsError}
                            </p>
                        </div>
                    )}

                    {!whyUsLoading &&
                        !whyUsError &&
                        whyUsItems.filter(
                            (item) => Boolean(item.active)
                        ).length === 0 && (
                            <div className="mt-12 text-center xl:mt-20">
                                <p className="text-gray-500">
                                    لا توجد مميزات متاحة حاليًا
                                </p>
                            </div>
                        )}

                    {!whyUsLoading &&
                        !whyUsError &&
                        whyUsItems.filter(
                            (item) => Boolean(item.active)
                        ).length > 0 && (
                            <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
                                {whyUsItems
                                    .filter(
                                        (item) =>
                                            Boolean(item.active)
                                    )
                                    .map((item, index) => {
                                        const WhyUsIcon =
                                            iconMap[item.icon] ||
                                            FaStar;

                                        return (
                                            <div
                                                key={item.id}
                                                data-aos="zoom-in-up"
                                                data-aos-delay={
                                                    index * 150
                                                }
                                                data-aos-duration="800"
                                                className="group h-fit self-start rounded-[28px] border border-gray-200 bg-white p-6 text-right shadow-sm transition-all duration-500 hover:-translate-y-4 hover:border-green-500 hover:shadow-2xl sm:rounded-[35px] sm:p-8"
                                            >
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00c0a9] text-3xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 sm:h-20 sm:w-20 sm:rounded-3xl sm:text-4xl">
                                                    <WhyUsIcon />
                                                </div>

                                                <h3 className="mt-6 text-2xl font-bold text-black sm:mt-8 sm:text-3xl">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-4 text-sm leading-7 text-gray-500 sm:mt-5 sm:text-base sm:leading-8">
                                                    {item.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                </div>
            </section>

            <section className="bg-white pb-16 sm:pb-20 lg:pb-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className="overflow-hidden rounded-[28px] bg-black px-6 py-10 shadow-2xl sm:rounded-[35px] sm:px-8 sm:py-14 lg:rounded-[40px] lg:px-10 lg:py-16"
                        data-aos="fade-up"
                        data-aos-duration="900"
                    >
                        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4 lg:gap-10">
                            <div
                                data-aos="zoom-in"
                                data-aos-delay="100"
                                className="transition duration-300 hover:-translate-y-2"
                            >
                                <h2 className="text-4xl font-black text-[#532aaa] sm:text-5xl lg:text-6xl">
                                    +150
                                </h2>

                                <p className="mt-3 text-sm text-[#00c0a9] sm:text-base lg:mt-4 lg:text-lg">
                                    مشروع ناجح
                                </p>
                            </div>

                            <div
                                data-aos="zoom-in"
                                data-aos-delay="250"
                                className="transition duration-300 hover:-translate-y-2"
                            >
                                <h2 className="text-4xl font-black text-[#532aaa] sm:text-5xl lg:text-6xl">
                                    +80
                                </h2>

                                <p className="mt-3 text-sm text-[#00c0a9] sm:text-base lg:mt-4 lg:text-lg">
                                    عميل سعيد
                                </p>
                            </div>

                            <div
                                data-aos="zoom-in"
                                data-aos-delay="400"
                                className="transition duration-300 hover:-translate-y-2"
                            >
                                <h2 className="text-4xl font-black text-[#532aaa] sm:text-5xl lg:text-6xl">
                                    +12M
                                </h2>

                                <p className="mt-3 text-sm text-[#00c0a9] sm:text-base lg:mt-4 lg:text-lg">
                                    وصول للحملات
                                </p>
                            </div>

                            <div
                                data-aos="zoom-in"
                                data-aos-delay="550"
                                className="transition duration-300 hover:-translate-y-2"
                            >
                                <h2 className="text-4xl font-black text-[#532aaa] sm:text-5xl lg:text-6xl">
                                    98%
                                </h2>

                                <p className="mt-3 text-sm text-[#00c0a9] sm:text-base lg:mt-4 lg:text-lg">
                                    رضا العملاء
                                </p>
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
