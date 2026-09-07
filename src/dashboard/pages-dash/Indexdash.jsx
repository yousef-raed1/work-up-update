import React, { useMemo } from "react";
import {
  FaProjectDiagram,
  FaBriefcase,
  FaEye,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context-dash/ProjectsContext";

export default function Indexdash() {
  const navigate = useNavigate();

  const { projects = [], loading } = useProjects();

  const getStatus = (project) => {
    if (!project?.status) return "غير محدد";

    if (
      project.status === "completed" ||
      project.status === "complete" ||
      project.status === "مكتمل"
    ) {
      return "مكتمل";
    }

    if (
      project.status === "in_progress" ||
      project.status === "processing" ||
      project.status === "قيد التنفيذ"
    ) {
      return "قيد التنفيذ";
    }

    if (
      project.status === "pending" ||
      project.status === "waiting" ||
      project.status === "قيد الانتظار"
    ) {
      return "قيد الانتظار";
    }

    return project.status;
  };

  const getStatusClass = (status) => {
    if (status === "مكتمل") {
      return "bg-green-100 text-green-600";
    }

    if (status === "قيد التنفيذ") {
      return "bg-blue-100 text-blue-600";
    }

    if (status === "قيد الانتظار") {
      return "bg-yellow-100 text-yellow-600";
    }

    return "bg-gray-100 text-gray-500";
  };

  const getStatusIcon = (status) => {
    if (status === "مكتمل") {
      return <FaCheckCircle />;
    }

    return <FaClock />;
  };

  const normalizedProjects = useMemo(() => {
    if (!Array.isArray(projects)) return [];

    return projects.map((project) => ({
      ...project,
      id: project.id,
      name: project.title || "بدون عنوان",
      client: project.client_name || project.client || "غير محدد",
      category: project.category || "غير مصنف",
      status: getStatus(project),
    }));
  }, [projects]);

  const stats = useMemo(() => {
    const totalProjects = normalizedProjects.length;

    const categories = new Set(
      normalizedProjects
        .map((project) => project.category)
        .filter(
          (category) =>
            category &&
            category !== "غير مصنف" &&
            category !== "غير محدد"
        )
    );

    const completed = normalizedProjects.filter(
      (project) => project.status === "مكتمل"
    ).length;

    const inProgress = normalizedProjects.filter(
      (project) => project.status === "قيد التنفيذ"
    ).length;

    return [
      {
        title: "إجمالي المشاريع",
        value: totalProjects,
        change: totalProjects > 0 ? "نشطة" : "لا توجد",
        icon: <FaProjectDiagram />,
      },
      {
        title: "التصنيفات",
        value: categories.size,
        change: categories.size > 0 ? "متاحة" : "لا توجد",
        icon: <FaBriefcase />,
      },
      {
        title: "المشاريع المكتملة",
        value: completed,
        change: totalProjects > 0 ? `${completed} من ${totalProjects}` : "لا توجد",
        icon: <FaCheckCircle />,
      },
      {
        title: "قيد التنفيذ",
        value: inProgress,
        change: totalProjects > 0 ? `${inProgress} من ${totalProjects}` : "لا توجد",
        icon: <FaClock />,
      },
    ];
  }, [normalizedProjects]);

  const services = useMemo(() => {
    const categoryMap = {};

    normalizedProjects.forEach((project) => {
      const category = project.category || "غير مصنف";

      if (!categoryMap[category]) {
        categoryMap[category] = {
          id: category,
          title: category,
          projects: 0,
        };
      }

      categoryMap[category].projects += 1;
    });

    return Object.values(categoryMap)
      .sort((a, b) => b.projects - a.projects)
      .map((service, index) => ({
        ...service,
        icon:
          index % 3 === 0 ? (
            <FaProjectDiagram />
          ) : index % 3 === 1 ? (
            <FaBriefcase />
          ) : (
            <FaEye />
          ),
        description: `${service.projects} ${
          service.projects === 1 ? "مشروع" : "مشاريع"
        } ضمن هذا التصنيف.`,
      }));
  }, [normalizedProjects]);

  const recentProjects = useMemo(() => {
    return [...normalizedProjects].slice(0, 5);
  }, [normalizedProjects]);

  const statusStats = useMemo(() => {
    const total = normalizedProjects.length;

    const completed = normalizedProjects.filter(
      (project) => project.status === "مكتمل"
    ).length;

    const inProgress = normalizedProjects.filter(
      (project) => project.status === "قيد التنفيذ"
    ).length;

    const pending = normalizedProjects.filter(
      (project) => project.status === "قيد الانتظار"
    ).length;

    const unknown = normalizedProjects.filter(
      (project) => project.status === "غير محدد"
    ).length;

    const percentage = (value) => {
      if (!total) return 0;
      return Math.round((value / total) * 100);
    };

    return [
      {
        title: "مكتملة",
        value: completed,
        percentage: percentage(completed),
        icon: <FaCheckCircle className="text-green-500" />,
        text: "text-green-500",
        bar: "from-[#532AAA] to-[#00C0A9]",
      },
      {
        title: "قيد التنفيذ",
        value: inProgress,
        percentage: percentage(inProgress),
        icon: <FaClock className="text-blue-500" />,
        text: "text-blue-500",
        bar: "bg-blue-500",
      },
      {
        title: "قيد الانتظار",
        value: pending,
        percentage: percentage(pending),
        icon: <FaClock className="text-yellow-500" />,
        text: "text-yellow-500",
        bar: "bg-yellow-500",
      },
      {
        title: "غير محددة",
        value: unknown,
        percentage: percentage(unknown),
        icon: <FaLayerGroup className="text-gray-400" />,
        text: "text-gray-500",
        bar: "bg-gray-400",
      },
    ];
  }, [normalizedProjects]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#532AAA]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-800 md:text-4xl">
          مرحباً بك في Work-Up 👋
        </h1>

        <p className="mt-3 text-base text-gray-500">
          إليك نظرة سريعة على مشاريعك وخدماتك الحالية.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="
              rounded-3xl
              border
              border-gray-100
              bg-white
              p-7
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-4 text-4xl font-black text-gray-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#532AAA]
                  to-[#00C0A9]
                  text-2xl
                  text-white
                  shadow-lg
                "
              >
                {stat.icon}
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2">
              <FaArrowUp className="text-sm text-green-500" />

              <span className="text-sm font-bold text-green-500">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-100
            bg-white
            shadow-sm
            xl:col-span-2
          "
        >
          <div className="flex items-center justify-between p-7">
            <div>
              <h3 className="text-xl font-black text-gray-800">
                أحدث المشاريع
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                آخر المشاريع الموجودة في النظام
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/projects")}
              className="
                text-sm
                font-bold
                text-[#532AAA]
                transition
                hover:text-[#00C0A9]
              "
            >
              عرض الكل
            </button>
          </div>

          {recentProjects.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center px-7 pb-7">
              <div className="text-center">
                <FaProjectDiagram className="mx-auto text-4xl text-gray-200" />

                <p className="mt-4 font-bold text-gray-500">
                  لا توجد مشاريع حالياً
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  أضف أول مشروع ليظهر هنا.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50">
                  <tr className="text-sm text-gray-500">
                    <th className="px-7 py-5">المشروع</th>
                    <th className="px-7 py-5">العميل</th>
                    <th className="px-7 py-5">الخدمة</th>
                    <th className="px-7 py-5">الحالة</th>
                  </tr>
                </thead>

                <tbody>
                  {recentProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="
                        border-t
                        border-gray-100
                        transition
                        hover:bg-gray-50
                      "
                    >
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-4">
                          <div
                            className="
                              flex
                              h-11
                              w-11
                              items-center
                              justify-center
                              rounded-xl
                              bg-gradient-to-br
                              from-[#532AAA]
                              to-[#00C0A9]
                              text-white
                            "
                          >
                            <FaProjectDiagram />
                          </div>

                          <span className="font-bold text-gray-700">
                            {project.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-7 py-5 text-gray-600">
                        {project.client}
                      </td>

                      <td className="px-7 py-5 text-gray-500">
                        {project.category}
                      </td>

                      <td className="px-7 py-5">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            px-3
                            py-2
                            text-xs
                            font-bold
                            ${getStatusClass(project.status)}
                          `}
                        >
                          {getStatusIcon(project.status)}
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          className="
            rounded-3xl
            border
            border-gray-100
            bg-white
            p-7
            shadow-sm
          "
        >
          <h3 className="text-xl font-black text-gray-800">
            خدمات Work-Up
          </h3>

          <p className="mb-7 mt-2 text-sm text-gray-400">
            التصنيفات المستخرجة تلقائياً من مشاريعك
          </p>

          {services.length === 0 ? (
            <div className="py-12 text-center">
              <FaBriefcase className="mx-auto text-4xl text-gray-200" />

              <p className="mt-4 font-bold text-gray-500">
                لا توجد خدمات حالياً
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {services.slice(0, 5).map((service) => (
                <div
                  key={service.id}
                  className="
                    rounded-2xl
                    border
                    border-transparent
                    bg-gray-50
                    p-5
                    transition-all
                    duration-300
                    hover:border-[#532AAA]/20
                    hover:bg-white
                    hover:shadow-md
                  "
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-[#532AAA]
                        to-[#00C0A9]
                        text-lg
                        text-white
                      "
                    >
                      {service.icon}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-gray-700">
                        {service.title}
                      </h4>

                      <p className="mt-1 text-xs text-gray-400">
                        {service.projects} مشاريع
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="
          rounded-3xl
          border
          border-gray-100
          bg-white
          p-7
          shadow-sm
        "
      >
        <div className="mb-8">
          <h3 className="text-xl font-black text-gray-800">
            حالة المشاريع
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            نظرة عامة ديناميكية على حالات المشاريع
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {statusStats.map((status) => (
            <div key={status.title}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {status.icon}

                  <span className="text-sm font-bold text-gray-600">
                    {status.title}
                  </span>
                </div>

                <span
                  className={`text-sm font-black ${status.text}`}
                >
                  {status.percentage}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`
                    h-full
                    rounded-full
                    ${status.bar}
                  `}
                  style={{
                    width: `${status.percentage}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {status.value} مشاريع
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
