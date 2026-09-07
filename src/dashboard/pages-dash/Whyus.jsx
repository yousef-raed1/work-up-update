import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaStar,
  FaAward,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
  FaSave,
} from "react-icons/fa";

import { useWhyUs } from "../context-dash/WhyUsContext";

const icons = [
  {
    name: "FaStar",
    component: FaStar,
  },
  {
    name: "FaAward",
    component: FaAward,
  },
  {
    name: "FaUsers",
    component: FaUsers,
  },
  {
    name: "FaChartLine",
    component: FaChartLine,
  },
];

const emptyForm = {
  title: "",
  description: "",
  icon: "FaStar",
  active: true,
  sort_order: 1,
};

export default function Whyus() {
  const {
    items,
    loading,
    saving,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleItem,
    clearError,
  } = useWhyUs();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    ...emptyForm,
  });
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        Number(a.sort_order) -
        Number(b.sort_order)
    );
  }, [items]);

  const activeCount = useMemo(() => {
    return items.filter(
      (item) => Boolean(item.active)
    ).length;
  }, [items]);

  const inactiveCount = useMemo(() => {
    return items.filter(
      (item) => !Boolean(item.active)
    ).length;
  }, [items]);

  const openAddModal = () => {
    clearError();

    setEditingItem(null);

    const nextSortOrder =
      items.length > 0
        ? Math.max(
            ...items.map((item) =>
              Number(item.sort_order) || 0
            )
          ) + 1
        : 1;

    setForm({
      ...emptyForm,
      sort_order: nextSortOrder,
    });

    setModalOpen(true);
  };

  const openEditModal = (item) => {
    clearError();

    setEditingItem(item);

    setForm({
      title: item.title || "",
      description: item.description || "",
      icon: item.icon || "FaStar",
      active: Boolean(item.active),
      sort_order:
        Number(item.sort_order) || 1,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalOpen(false);
    setEditingItem(null);
    setForm({
      ...emptyForm,
    });

    clearError();
  };

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const saveItem = async (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const description =
      form.description.trim();

    const sortOrder = Number(
      form.sort_order
    );

    if (!title) {
      return;
    }

    if (!description) {
      return;
    }

    if (!Number.isInteger(sortOrder) || sortOrder < 1) {
      return;
    }

    const payload = {
      title,
      description,
      icon: form.icon || "FaStar",
      active: Boolean(form.active),
      sort_order: sortOrder,
    };

    try {
      if (editingItem) {
        await updateItem(
          editingItem.id,
          payload
        );
      } else {
        await createItem(payload);
      }

      setModalOpen(false);
      setEditingItem(null);
      setForm({
        ...emptyForm,
      });
    } catch {
      return;
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      await deleteItem(deleteId);

      setDeleteId(null);
    } catch {
      return;
    }
  };

  const handleToggle = async (item) => {
    try {
      await toggleItem(item);
    } catch {
      return;
    }
  };

  const getIcon = (iconName) => {
    const selectedIcon = icons.find(
      (icon) => icon.name === iconName
    );

    return selectedIcon
      ? selectedIcon.component
      : FaStar;
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              لماذا نحن
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              إدارة المميزات التي تظهر في قسم لماذا نحن
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPlus />
            إضافة ميزة
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <span>{error}</span>

            <button
              type="button"
              onClick={clearError}
              className="rounded-lg p-1 transition hover:bg-red-500/10"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
            <div className="text-sm text-slate-400">
              إجمالي المميزات
            </div>

            <div className="mt-2 text-3xl font-bold">
              {items.length}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
            <div className="text-sm text-slate-400">
              المميزات النشطة
            </div>

            <div className="mt-2 text-3xl font-bold text-green-400">
              {activeCount}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
            <div className="text-sm text-slate-400">
              المميزات غير النشطة
            </div>

            <div className="mt-2 text-3xl font-bold text-red-400">
              {inactiveCount}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03]">
            <div className="text-sm text-slate-400">
              جاري تحميل المميزات...
            </div>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] px-6 text-center">
            <FaStar className="mb-4 text-4xl text-slate-600" />

            <h2 className="text-xl font-semibold">
              لا توجد مميزات
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              لم تتم إضافة أي مميزات حتى الآن
            </p>

            <button
              type="button"
              onClick={openAddModal}
              disabled={saving}
              className="mt-5 flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaPlus />
              إضافة أول ميزة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {sortedItems.map((item) => {
              const Icon = getIcon(item.icon);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:border-white/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-2xl text-green-400">
                        <Icon />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold">
                          {item.title}
                        </h2>

                        <div className="mt-1 text-xs text-slate-500">
                          الترتيب:{" "}
                          {item.sort_order}
                        </div>
                      </div>
                    </div>

                    {Boolean(item.active) ? (
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        <FaCheckCircle />
                        نشطة
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                        <FaTimesCircle />
                        غير نشطة
                      </span>
                    )}
                  </div>

                  <p className="mt-5 min-h-[60px] text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(item)
                      }
                      disabled={saving}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        Boolean(item.active)
                          ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      }`}
                    >
                      {Boolean(item.active)
                        ? "تعطيل"
                        : "تفعيل"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEditModal(item)
                      }
                      disabled={saving}
                      className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-400 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaEdit />
                      تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteId(item.id)
                      }
                      disabled={saving}
                      className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingItem
                    ? "تعديل الميزة"
                    : "إضافة ميزة"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  البيانات سيتم حفظها في قاعدة البيانات
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={saveItem}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  العنوان
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-green-500"
                  placeholder="اكتب عنوان الميزة"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  الوصف
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-green-500"
                  placeholder="اكتب وصف الميزة"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    الأيقونة
                  </label>

                  <select
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-green-500"
                  >
                    {icons.map((icon) => (
                      <option
                        key={icon.name}
                        value={icon.name}
                        className="bg-slate-900"
                      >
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    الترتيب
                  </label>

                  <input
                    type="number"
                    name="sort_order"
                    min="1"
                    step="1"
                    value={form.sort_order}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-green-500"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="h-5 w-5 accent-green-500"
                />

                <div>
                  <div className="text-sm font-semibold">
                    الميزة نشطة
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    ستظهر الميزة في الموقع عند تفعيلها
                  </div>
                </div>
              </label>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />

                  {saving
                    ? "جاري الحفظ..."
                    : editingItem
                    ? "حفظ التعديلات"
                    : "إضافة الميزة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-400">
              <FaTrash />
            </div>

            <h2 className="text-xl font-bold">
              حذف الميزة
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              هل أنت متأكد من حذف هذه الميزة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                disabled={saving}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "جاري الحذف..."
                  : "حذف نهائي"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
