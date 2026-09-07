import React, { useState } from "react";

import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaProjectDiagram,
  FaSpinner,
  FaTimes,
  FaImage,
} from "react-icons/fa";

import { useProjects } from "../../dashboard/context-dash/Displaydash";

export default function Homeproject() {
  const {
    projects = [],
    loading,
    addProject,
    deleteProject,
  } = useProjects();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    title_two: "",
    subtitle: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("من فضلك اختر ملف صورة فقط");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة كبير جدًا. الحد الأقصى المسموح هو 5MB");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      title_two: "",
      subtitle: "",
      description: "",
      category: "",
      image: null,
    });

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("من فضلك اكتب اسم المشروع");
      return;
    }

    if (!formData.category.trim()) {
      alert("من فضلك اختر نوع الخدمة");
      return;
    }

    if (!formData.image) {
      alert("من فضلك اختر صورة للمشروع");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("title_two", formData.title_two);
      data.append("subtitle", formData.subtitle);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("image", formData.image);

      const result = await addProject(data);

      if (result?.success) {
        alert("تم إضافة المشروع بنجاح");
        resetForm();
        setShowForm(false);
      } else {
        const validationErrors =
          result?.error?.errors || {};

        const firstValidationError =
          Object.values(validationErrors)?.[0]?.[0];

        const errorMessage =
          firstValidationError ||
          result?.error?.message ||
          "حدث خطأ أثناء إضافة المشروع";

        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "حدث خطأ أثناء إضافة المشروع"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد من حذف المشروع؟"
    );

    if (!confirmDelete) {
      return;
    }

    const success = await deleteProject(id);

    if (success) {
      alert("تم حذف المشروع بنجاح");
    } else {
      alert("حدث خطأ أثناء حذف المشروع");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const title =
      project.title?.toLowerCase() || "";

    const titleTwo =
      project.title_two?.toLowerCase() || "";

    const subtitle =
      project.subtitle?.toLowerCase() || "";

    const category =
      project.category?.toLowerCase() || "";

    const description =
      project.description?.toLowerCase() || "";

    const searchValue =
      search.toLowerCase();

    return (
      title.includes(searchValue) ||
      titleTwo.includes(searchValue) ||
      subtitle.includes(searchValue) ||
      category.includes(searchValue) ||
      description.includes(searchValue)
    );
  });

  const totalProjects = projects.length;

  const projectsWithDescription =
    projects.filter(
      (project) =>
        project.description?.trim()
    ).length;

  const projectsWithoutDescription =
    totalProjects - projectsWithDescription;

  return (
    <div
      dir="ltr"
      className="space-y-8"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-800">
            المشاريع
          </h1>

          <p className="mt-2 text-gray-500">
            أضف وأدر جميع مشاريع Work-Up من هنا.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-gradient-to-r
            from-[#532AAA]
            to-[#00C0A9]
            px-6
            py-3.5
            font-bold
            text-white
            shadow-lg
            transition-all
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <FaPlus />
          إضافة مشروع جديد
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                إجمالي المشاريع
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-800">
                {totalProjects}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-xl text-[#532AAA]">
              <FaProjectDiagram />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                تحتوي على وصف
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-800">
                {projectsWithDescription}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
              <FaProjectDiagram />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                بدون وصف
              </p>

              <h2 className="mt-3 text-3xl font-black text-gray-800">
                {projectsWithoutDescription}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
              <FaProjectDiagram />
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-800">
                إضافة مشروع جديد
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                أدخل بيانات المشروع الجديد
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gray-100
                text-gray-500
                transition
                hover:bg-red-50
                hover:text-red-500
              "
            >
              <FaTimes />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-600">
                اسم المشروع
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="مثال: E-Commerce Website"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  outline-none
                  focus:border-[#532AAA]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-600">
                العنوان الثاني
              </label>

              <input
                type="text"
                name="title_two"
                value={formData.title_two}
                onChange={handleChange}
                placeholder="عنوان إضافي للمشروع"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  outline-none
                  focus:border-[#532AAA]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-600">
                اسم العميل
              </label>

              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="مثال: Ahmed Mohamed"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  outline-none
                  focus:border-[#532AAA]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-gray-600">
                نوع الخدمة
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  outline-none
                  focus:border-[#532AAA]
                "
              >
                <option value="">
                  اختر الخدمة
                </option>

                <option value="Web Development">
                  Web Development
                </option>

                <option value="UI / UX Design">
                  UI / UX Design
                </option>

                <option value="Branding">
                  Branding
                </option>

                <option value="E-Commerce">
                  E-Commerce
                </option>

                <option value="Digital Marketing">
                  Digital Marketing
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-gray-600">
                صورة المشروع
              </label>

              <div className="relative">
                {!imagePreview ? (
                  <label
                    htmlFor="project-image"
                    className="
                      flex
                      min-h-[220px]
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-gray-200
                      bg-gray-50
                      px-6
                      py-10
                      transition
                      hover:border-[#532AAA]
                      hover:bg-purple-50
                    "
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-[#532AAA]">
                      <FaImage />
                    </div>

                    <p className="text-base font-bold text-gray-700">
                      اختر صورة المشروع
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      PNG, JPG, JPEG أو WEBP
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      الحد الأقصى 5MB
                    </p>

                    <input
                      id="project-image"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                    <img
                      src={imagePreview}
                      alt="معاينة صورة المشروع"
                      className="
                        h-[280px]
                        w-full
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        text-white
                        shadow-lg
                        transition
                        hover:bg-red-600
                      "
                      title="حذف الصورة"
                    >
                      <FaTimes />
                    </button>

                    <label
                      htmlFor="project-image-change"
                      className="
                        absolute
                        bottom-4
                        right-4
                        cursor-pointer
                        rounded-xl
                        bg-black/70
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-white
                        backdrop-blur
                        transition
                        hover:bg-black
                      "
                    >
                      تغيير الصورة
                    </label>

                    <input
                      id="project-image-change"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-gray-600">
                وصف المشروع
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="اكتب وصف المشروع..."
                rows="5"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3.5
                  outline-none
                  focus:border-[#532AAA]
                "
              />
            </div>

            <div className="flex justify-end md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[#532AAA]
                  to-[#00C0A9]
                  px-8
                  py-3.5
                  font-bold
                  text-white
                  transition
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {submitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaPlus />
                )}

                {submitting
                  ? "جاري الإضافة..."
                  : "إضافة المشروع"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-800">
              المشاريع المضافة
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              جميع المشاريع الموجودة في قاعدة البيانات
            </p>
          </div>

          <div className="relative">
            <FaSearch
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مشروع..."
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                py-3
                pl-4
                pr-11
                outline-none
                focus:border-[#532AAA]
                md:w-72
              "
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-500">
                <th className="px-6 py-5">
                  المشروع
                </th>

                <th className="px-6 py-5">
                  العميل
                </th>

                <th className="px-6 py-5">
                  الخدمة
                </th>

                <th className="px-6 py-5">
                  الوصف
                </th>

                <th className="px-6 py-5">
                  الإجراءات
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-16 text-center"
                  >
                    <div className="flex justify-center">
                      <FaSpinner className="animate-spin text-3xl text-[#532AAA]" />
                    </div>

                    <p className="mt-3 text-gray-400">
                      جاري تحميل المشاريع...
                    </p>
                  </td>
                </tr>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="
                      border-t
                      border-gray-100
                      transition
                      hover:bg-gray-50
                    "
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="
                              h-14
                              w-14
                              shrink-0
                              rounded-xl
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-14
                              w-14
                              shrink-0
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
                        )}

                        <div>
                          <span className="font-bold text-gray-700">
                            {project.title}
                          </span>

                          {project.title_two && (
                            <p className="mt-1 text-xs text-gray-400">
                              {project.title_two}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {project.subtitle || "غير محدد"}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-[#532AAA]">
                        {project.category || "غير محدد"}
                      </span>
                    </td>

                    <td className="max-w-sm px-6 py-5 text-gray-500">
                      <p className="line-clamp-2">
                        {project.description ||
                          "لا يوجد وصف"}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(project.id)
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-red-50
                          text-red-500
                          transition
                          hover:bg-red-500
                          hover:text-white
                        "
                        title="حذف المشروع"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-12 text-center text-gray-400"
                  >
                    لا توجد مشاريع
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
