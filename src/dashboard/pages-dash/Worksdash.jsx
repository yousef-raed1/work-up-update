import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ImagePlus,
    Video,
    Plus,
    Trash2,
    CheckCircle2,
    Save,
    Upload,
    X,
    Loader2,
    Pencil,
    Eye,
    AlertTriangle,
} from "lucide-react";
import { useProjects } from "../context-dash/ProjectsContext";

const API_URL = "http://127.0.0.1:8000/api";
const TOKEN_KEY = "apex_admin_token";

const MAX_URL_LENGTH = 255;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
];

const ALLOWED_VIDEO_TYPES = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
];

export default function AddProject() {
    const navigate = useNavigate();

    const {
        projects,
        loading,
        saving,
        createProject,
        deleteProject,
        getProject,
        fetchProjects,
        error,
        clearError,
    } = useProjects();

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        category: "",
        short_description: "",
        description: "",
        project_url: "",
        features: ["", "", "", ""],
    });

    const [images, setImages] = useState([
        { file: null, preview: null },
        { file: null, preview: null },
        { file: null, preview: null },
        { file: null, preview: null },
    ]);

    const [videos, setVideos] = useState([
        {
            file: null,
            preview: null,
            title: "فيديو المشروع الأول",
        },
        {
            file: null,
            preview: null,
            title: "فيديو المشروع الثاني",
        },
        {
            file: null,
            preview: null,
            title: "فيديو المشروع الثالث",
        },
    ]);

    const [successMessage, setSuccessMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        clearError();

        return () => {
            images.forEach((image) => {
                if (image.preview) {
                    URL.revokeObjectURL(image.preview);
                }
            });

            videos.forEach((video) => {
                if (video.preview) {
                    URL.revokeObjectURL(video.preview);
                }
            });
        };
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem(TOKEN_KEY);

        return token
            ? {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
              }
            : {
                  Accept: "application/json",
              };
    };

    const resetForm = () => {
        images.forEach((image) => {
            if (image.preview) {
                URL.revokeObjectURL(image.preview);
            }
        });

        videos.forEach((video) => {
            if (video.preview) {
                URL.revokeObjectURL(video.preview);
            }
        });

        setEditingId(null);

        setFormData({
            title: "",
            subtitle: "",
            category: "",
            short_description: "",
            description: "",
            project_url: "",
            features: ["", "", "", ""],
        });

        setImages([
            { file: null, preview: null },
            { file: null, preview: null },
            { file: null, preview: null },
            { file: null, preview: null },
        ]);

        setVideos([
            {
                file: null,
                preview: null,
                title: "فيديو المشروع الأول",
            },
            {
                file: null,
                preview: null,
                title: "فيديو المشروع الثاني",
            },
            {
                file: null,
                preview: null,
                title: "فيديو المشروع الثالث",
            },
        ]);

        setValidationErrors([]);
        setSuccessMessage("");
        clearError();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setValidationErrors([]);
        setSuccessMessage("");

        if (error) {
            clearError();
        }
    };

    const handleFeatureChange = (index, value) => {
        setFormData((prev) => {
            const features = [...prev.features];
            features[index] = value;

            return {
                ...prev,
                features,
            };
        });

        setValidationErrors([]);
        setSuccessMessage("");
    };

    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    };

    const removeFeature = (index) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            event.target.value = "";

            setValidationErrors([
                "نوع الصورة غير مسموح به. استخدم JPG أو PNG أو WEBP.",
            ]);

            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            event.target.value = "";

            setValidationErrors([
                "حجم الصورة كبير جدًا. الحد الأقصى المسموح به للصورة هو 5 ميجابايت.",
            ]);

            return;
        }

        const preview = URL.createObjectURL(file);

        setImages((prev) => {
            const updated = [...prev];

            if (updated[index].preview) {
                URL.revokeObjectURL(updated[index].preview);
            }

            updated[index] = {
                file,
                preview,
            };

            return updated;
        });

        setValidationErrors([]);
        setSuccessMessage("");
    };

    const removeImage = (index) => {
        setImages((prev) => {
            const updated = [...prev];

            if (updated[index].preview) {
                URL.revokeObjectURL(updated[index].preview);
            }

            updated[index] = {
                file: null,
                preview: null,
            };

            return updated;
        });

        setValidationErrors([]);
    };

    const addImage = () => {
        setImages((prev) => [
            ...prev,
            {
                file: null,
                preview: null,
            },
        ]);
    };

    const handleVideoChange = (index, event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
            event.target.value = "";

            setValidationErrors([
                "نوع الفيديو غير مسموح به. استخدم MP4 أو WEBM أو MOV أو AVI.",
            ]);

            return;
        }

        if (file.size > MAX_VIDEO_SIZE) {
            event.target.value = "";

            setValidationErrors([
                "حجم الفيديو كبير جدًا. الحد الأقصى المسموح به للفيديو هو 50 ميجابايت.",
            ]);

            return;
        }

        const preview = URL.createObjectURL(file);

        setVideos((prev) => {
            const updated = [...prev];

            if (updated[index].preview) {
                URL.revokeObjectURL(updated[index].preview);
            }

            updated[index] = {
                ...updated[index],
                file,
                preview,
            };

            return updated;
        });

        setValidationErrors([]);
        setSuccessMessage("");
    };

    const handleVideoTitleChange = (index, value) => {
        setVideos((prev) => {
            const updated = [...prev];

            updated[index] = {
                ...updated[index],
                title: value,
            };

            return updated;
        });
    };

    const removeVideoFile = (index) => {
        setVideos((prev) => {
            const updated = [...prev];

            if (updated[index].preview) {
                URL.revokeObjectURL(updated[index].preview);
            }

            updated[index] = {
                ...updated[index],
                file: null,
                preview: null,
            };

            return updated;
        });

        setValidationErrors([]);
    };

    const removeVideo = (index) => {
        setVideos((prev) => {
            const video = prev[index];

            if (video?.preview) {
                URL.revokeObjectURL(video.preview);
            }

            return prev.filter((_, i) => i !== index);
        });
    };

    const addVideo = () => {
        setVideos((prev) => [
            ...prev,
            {
                file: null,
                preview: null,
                title: `فيديو المشروع ${prev.length + 1}`,
            },
        ]);
    };

    const validateUrl = (value) => {
        if (!value.trim()) {
            return true;
        }

        if (value.trim().length > MAX_URL_LENGTH) {
            return false;
        }

        try {
            const url = new URL(value.trim());

            return (
                url.protocol === "http:" ||
                url.protocol === "https:"
            );
        } catch {
            return false;
        }
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.title.trim()) {
            errors.push("اسم المشروع مطلوب.");
        }

        if (!formData.category.trim()) {
            errors.push("المجال مطلوب.");
        }

        if (!formData.short_description.trim()) {
            errors.push("الوصف المختصر مطلوب.");
        }

        if (!formData.description.trim()) {
            errors.push("وصف المشروع مطلوب.");
        }

        if (formData.title.trim().length > 255) {
            errors.push("اسم المشروع يجب ألا يتجاوز 255 حرفًا.");
        }

        if (formData.subtitle.trim().length > 255) {
            errors.push("العنوان الفرعي يجب ألا يتجاوز 255 حرفًا.");
        }

        if (formData.category.trim().length > 255) {
            errors.push("المجال يجب ألا يتجاوز 255 حرفًا.");
        }

        if (formData.project_url.trim()) {
            if (
                formData.project_url.trim().length >
                MAX_URL_LENGTH
            ) {
                errors.push(
                    "رابط المشروع طويل جدًا. الحد الأقصى المسموح به هو 255 حرفًا."
                );
            } else if (!validateUrl(formData.project_url)) {
                errors.push(
                    "رابط المشروع غير صحيح. استخدم رابطًا يبدأ بـ https:// أو http://."
                );
            }
        }

        images.forEach((image, index) => {
            if (!image.file) {
                return;
            }

            if (!ALLOWED_IMAGE_TYPES.includes(image.file.type)) {
                errors.push(
                    `الصورة رقم ${index + 1} تحتوي على نوع ملف غير مسموح به.`
                );
            }

            if (image.file.size > MAX_IMAGE_SIZE) {
                errors.push(
                    `الصورة رقم ${index + 1} أكبر من 5 ميجابايت.`
                );
            }
        });

        videos.forEach((video, index) => {
            if (!video.file) {
                return;
            }

            if (!ALLOWED_VIDEO_TYPES.includes(video.file.type)) {
                errors.push(
                    `الفيديو رقم ${index + 1} يحتوي على نوع ملف غير مسموح به.`
                );
            }

            if (video.file.size > MAX_VIDEO_SIZE) {
                errors.push(
                    `الفيديو رقم ${index + 1} أكبر من 50 ميجابايت.`
                );
            }
        });

        return errors;
    };

    const loadProjectForEdit = async (id) => {
        setValidationErrors([]);
        setSuccessMessage("");
        clearError();

        const result = await getProject(id);

        if (!result.success || !result.data) {
            setValidationErrors([
                result.message || "تعذر تحميل بيانات المشروع.",
            ]);

            return;
        }

        const project = result.data;

        images.forEach((image) => {
            if (image.preview) {
                URL.revokeObjectURL(image.preview);
            }
        });

        videos.forEach((video) => {
            if (video.preview) {
                URL.revokeObjectURL(video.preview);
            }
        });

        const projectImages = Array.isArray(project.images)
            ? project.images
            : [];

        const projectVideos = Array.isArray(project.videos)
            ? project.videos
            : [];

        const projectFeatures = Array.isArray(project.features)
            ? project.features
            : [];

        setEditingId(project.id);

        setFormData({
            title: project.title || "",
            subtitle: project.subtitle || "",
            category: project.category || "",
            short_description:
                project.short_description || "",
            description: project.description || "",
            project_url: project.project_url || "",
            features:
                projectFeatures.length > 0
                    ? projectFeatures
                    : [""],
        });

        setImages(
            projectImages.length > 0
                ? projectImages.map((image) => ({
                      file: null,
                      preview: image.url,
                      existing: true,
                      id: image.id,
                  }))
                : [
                      {
                          file: null,
                          preview: null,
                      },
                  ]
        );

        setVideos(
            projectVideos.length > 0
                ? projectVideos.map((video) => ({
                      file: null,
                      preview: video.url,
                      title:
                          video.title ||
                          "فيديو المشروع",
                      existing: true,
                      id: video.id,
                  }))
                : [
                      {
                          file: null,
                          preview: null,
                          title: "فيديو المشروع الأول",
                      },
                  ]
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const updateProject = async (id, payload) => {
        try {
            const response = await fetch(
                `${API_URL}/work-projects/${id}`,
                {
                    method: "POST",
                    headers: {
                        ...getAuthHeaders(),
                        "X-HTTP-Method-Override": "PUT",
                    },
                    body: payload,
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                return {
                    success: false,
                    message:
                        data.message ||
                        "حدث خطأ أثناء تعديل المشروع.",
                    errors: data.errors || null,
                };
            }

            return {
                success: true,
                message:
                    data.message ||
                    "تم تعديل المشروع بنجاح.",
                data: data.data || null,
            };
        } catch (err) {
            return {
                success: false,
                message:
                    err.message ||
                    "حدث خطأ أثناء الاتصال بالخادم.",
                errors: null,
            };
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        clearError();
        setSuccessMessage("");
        setValidationErrors([]);

        const errors = validateForm();

        if (errors.length > 0) {
            setValidationErrors(errors);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        const payload = new FormData();

        payload.append("title", formData.title.trim());

        if (formData.subtitle.trim()) {
            payload.append(
                "subtitle",
                formData.subtitle.trim()
            );
        }

        payload.append(
            "category",
            formData.category.trim()
        );

        payload.append(
            "short_description",
            formData.short_description.trim()
        );

        payload.append(
            "description",
            formData.description.trim()
        );

        if (formData.project_url.trim()) {
            payload.append(
                "project_url",
                formData.project_url.trim()
            );
        }

        formData.features
            .map((feature) => feature.trim())
            .filter((feature) => feature !== "")
            .forEach((feature, index) => {
                payload.append(
                    `features[${index}]`,
                    feature
                );
            });

        const selectedImages = images.filter(
            (image) => image.file
        );

        const selectedVideos = videos.filter(
            (video) => video.file
        );

        selectedImages.forEach((image) => {
            payload.append("images[]", image.file);
        });

        selectedVideos.forEach((video) => {
            payload.append("videos[]", video.file);
        });

        if (!editingId) {
            const result = await createProject(payload);

            if (!result.success) {
                if (result.errors) {
                    const errors = Object.values(
                        result.errors
                    ).flat();

                    setValidationErrors(
                        errors.length
                            ? errors
                            : [
                                  result.message ||
                                      "حدث خطأ أثناء إضافة المشروع.",
                              ]
                    );
                } else {
                    setValidationErrors([
                        result.message ||
                            "حدث خطأ أثناء إضافة المشروع.",
                    ]);
                }

                return;
            }

            setSuccessMessage(
                result.message ||
                    "تم إنشاء المشروع بنجاح."
            );

            await fetchProjects();

            setTimeout(() => {
                resetForm();
            }, 800);

            return;
        }

        payload.append("_method", "PUT");

        const result = await updateProject(
            editingId,
            payload
        );

        if (!result.success) {
            if (result.errors) {
                const errors = Object.values(
                    result.errors
                ).flat();

                setValidationErrors(
                    errors.length
                        ? errors
                        : [
                              result.message ||
                                  "حدث خطأ أثناء تعديل المشروع.",
                          ]
                );
            } else {
                setValidationErrors([
                    result.message ||
                        "حدث خطأ أثناء تعديل المشروع.",
                ]);
            }

            return;
        }

        setSuccessMessage(
            result.message ||
                "تم تعديل المشروع بنجاح."
        );

        await fetchProjects();

        setTimeout(() => {
            resetForm();
        }, 800);
    };

    const handleDelete = async () => {
        if (!deleteId) {
            return;
        }

        setDeleting(true);

        const result = await deleteProject(deleteId);

        setDeleting(false);

        if (!result.success) {
            setValidationErrors([
                result.message ||
                    "حدث خطأ أثناء حذف المشروع.",
            ]);

            setDeleteId(null);

            return;
        }

        setSuccessMessage(
            result.message ||
                "تم حذف المشروع بنجاح."
        );

        if (String(editingId) === String(deleteId)) {
            resetForm();
        }

        setDeleteId(null);

        await fetchProjects();
    };

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            to="/dashboard/works"
                            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-green-400"
                        >
                            <ArrowRight size={18} />
                            العودة إلى المشاريع
                        </Link>

                        <h1 className="text-3xl font-black text-white md:text-4xl">
                            {editingId
                                ? "تعديل المشروع"
                                : "إضافة مشروع جديد"}
                        </h1>

                        <p className="mt-2 text-sm leading-7 text-zinc-500">
                            {editingId
                                ? "قم بتعديل بيانات المشروع ثم احفظ التغييرات."
                                : "أضف جميع بيانات المشروع التي ستظهر في صفحة تفاصيل المشروع."}
                        </p>
                    </div>

                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 px-6 py-4 font-black text-white transition hover:border-green-500/30 hover:text-green-400 disabled:opacity-60"
                        >
                            <X size={19} />
                            إلغاء التعديل
                        </button>
                    )}
                </div>

                {(error ||
                    validationErrors.length > 0) && (
                    <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-bold leading-8 text-red-400">
                        <div className="mb-2">
                            حدث خطأ:
                        </div>

                        {validationErrors.length > 0 ? (
                            <ul className="list-inside list-disc space-y-1">
                                {validationErrors.map(
                                    (message, index) => (
                                        <li key={index}>
                                            {message}
                                        </li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <div>{error}</div>
                        )}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-4 text-sm font-bold leading-7 text-green-400">
                        <CheckCircle2 size={20} />
                        {successMessage}
                    </div>
                )}

                <section className="mb-8 rounded-[30px] border border-white/10 bg-zinc-950 p-5 sm:p-7">
                    <div className="mb-7 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                <Eye size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-white">
                                    المشاريع المضافة
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    عرض وتعديل وحذف المشاريع الموجودة.
                                </p>
                            </div>
                        </div>

                        <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-black text-green-400">
                            {projects.length} مشروع
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex min-h-[180px] items-center justify-center">
                            <Loader2
                                size={38}
                                className="animate-spin text-green-400"
                            />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-black p-10 text-center">
                            <ImagePlus
                                size={45}
                                className="mx-auto text-zinc-700"
                            />

                            <h3 className="mt-5 text-xl font-black text-white">
                                لا توجد مشاريع
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500">
                                لم تتم إضافة أي مشاريع حتى الآن.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => {
                                const mainImage =
                                    project.images?.[0]?.url ||
                                    null;

                                return (
                                    <div
                                        key={project.id}
                                        className="group overflow-hidden rounded-3xl border border-white/10 bg-black transition duration-300 hover:border-green-500/30"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            {mainImage ? (
                                                <img
                                                    src={mainImage}
                                                    alt={
                                                        project.title
                                                    }
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
                                                    <span className="text-5xl font-black text-green-400">
                                                        {project.title?.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                                            {project.category && (
                                                <span className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1.5 text-xs font-black text-black">
                                                    {
                                                        project.category
                                                    }
                                                </span>
                                            )}

                                            <div className="absolute bottom-4 right-4 left-4">
                                                <h3 className="truncate text-2xl font-black text-white">
                                                    {
                                                        project.title
                                                    }
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            {project.subtitle && (
                                                <p className="mb-3 truncate text-sm font-bold text-green-400">
                                                    {
                                                        project.subtitle
                                                    }
                                                </p>
                                            )}

                                            <p className="line-clamp-2 min-h-[48px] text-sm leading-7 text-zinc-500">
                                                {
                                                    project.short_description
                                                }
                                            </p>

                                            <div className="mt-5 flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        loadProjectForEdit(
                                                            project.id
                                                        )
                                                    }
                                                    disabled={
                                                        saving ||
                                                        deleting
                                                    }
                                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-black text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <Pencil
                                                        size={
                                                            17
                                                        }
                                                    />
                                                    تعديل
                                                </button>

                                                <Link
                                                    to={`/projects/${project.id}`}
                                                    className="flex items-center justify-center rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-zinc-300 transition hover:border-green-500/30 hover:text-green-400"
                                                    title="مشاهدة المشروع"
                                                >
                                                    <Eye
                                                        size={
                                                            18
                                                        }
                                                    />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDeleteId(
                                                            project.id
                                                        )
                                                    }
                                                    disabled={
                                                        saving ||
                                                        deleting
                                                    }
                                                    className="flex items-center justify-center rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="حذف المشروع"
                                                >
                                                    <Trash2
                                                        size={
                                                            18
                                                        }
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                <form
                    id="project-form"
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >
                    <section className="rounded-[30px] border border-white/10 bg-zinc-950 p-5 sm:p-7">
                        <div className="mb-7 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                    <CheckCircle2 size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-white">
                                        معلومات المشروع
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        البيانات الأساسية للمشروع.
                                    </p>
                                </div>
                            </div>

                            {editingId && (
                                <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-xs font-black text-yellow-400">
                                    وضع التعديل
                                </span>
                            )}
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    اسم المشروع
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="مثال: عيادة أطفال"
                                    required
                                    disabled={saving}
                                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    العنوان الفرعي
                                </label>

                                <input
                                    type="text"
                                    name="subtitle"
                                    value={
                                        formData.subtitle
                                    }
                                    onChange={handleChange}
                                    placeholder="مثال: تصميم وتطوير موقع عيادة أطفال"
                                    disabled={saving}
                                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    المجال
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={handleChange}
                                    placeholder="مثال: العيادات"
                                    required
                                    disabled={saving}
                                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    رابط المشروع
                                </label>

                                <input
                                    type="url"
                                    name="project_url"
                                    value={
                                        formData.project_url
                                    }
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    disabled={saving}
                                    className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    الوصف المختصر
                                </label>

                                <textarea
                                    name="short_description"
                                    value={
                                        formData.short_description
                                    }
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="الوصف الذي سيظهر بجانب الصورة الرئيسية..."
                                    required
                                    disabled={saving}
                                    className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-bold text-zinc-300">
                                    وصف المشروع
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="اكتب وصف المشروع بالتفصيل..."
                                    required
                                    disabled={saving}
                                    className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[30px] border border-white/10 bg-zinc-950 p-5 sm:p-7">
                        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                    <ImagePlus size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-white">
                                        صور المشروع
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        الصورة الأولى ستكون الصورة الرئيسية للمشروع.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addImage}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-400 transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Plus size={18} />
                                إضافة صورة
                            </button>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-black"
                                >
                                    <div className="relative aspect-square">
                                        {image.preview ? (
                                            <>
                                                <img
                                                    src={
                                                        image.preview
                                                    }
                                                    alt={`صورة المشروع ${
                                                        index +
                                                        1
                                                    }`}
                                                    className="h-full w-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-500 disabled:opacity-50"
                                                >
                                                    <X size={17} />
                                                </button>
                                            </>
                                        ) : (
                                            <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 transition hover:border-green-500/40 hover:bg-green-500/5">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-green-400">
                                                    <Upload
                                                        size={
                                                            23
                                                        }
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-sm font-bold text-white">
                                                        رفع صورة
                                                    </p>

                                                    <p className="mt-1 text-xs text-zinc-600">
                                                        JPG / PNG /
                                                        WEBP - 5MB
                                                    </p>
                                                </div>

                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleImageChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <div className="border-t border-white/10 px-4 py-4">
                                        <p className="text-sm font-bold text-zinc-400">
                                            {index === 0
                                                ? "الصورة الرئيسية"
                                                : `صورة ${
                                                      index +
                                                      1
                                                  }`}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[30px] border border-white/10 bg-zinc-950 p-5 sm:p-7">
                        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                    <Video size={22} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-white">
                                        فيديوهات المشروع
                                    </h2>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        أضف الفيديوهات التي ستظهر في صفحة المشروع.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addVideo}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-400 transition hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Plus size={18} />
                                إضافة فيديو
                            </button>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            {videos.map((video, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-black"
                                >
                                    <div className="relative aspect-video">
                                        {video.preview ? (
                                            <>
                                                <video
                                                    src={
                                                        video.preview
                                                    }
                                                    controls
                                                    className="h-full w-full object-cover"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVideoFile(
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-500 disabled:opacity-50"
                                                >
                                                    <X size={17} />
                                                </button>
                                            </>
                                        ) : (
                                            <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 transition hover:border-green-500/40 hover:bg-green-500/5">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-green-400">
                                                    <Upload
                                                        size={
                                                            23
                                                        }
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-sm font-bold text-white">
                                                        رفع فيديو
                                                    </p>

                                                    <p className="mt-1 text-xs text-zinc-600">
                                                        MP4 / WEBM /
                                                        MOV / AVI -
                                                        50MB
                                                    </p>
                                                </div>

                                                <input
                                                    type="file"
                                                    accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        handleVideoChange(
                                                            index,
                                                            event
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <div className="space-y-4 p-5">
                                        <div>
                                            <label className="mb-2 block text-xs font-bold text-zinc-500">
                                                عنوان الفيديو
                                            </label>

                                            <input
                                                type="text"
                                                value={
                                                    video.title
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    handleVideoTitleChange(
                                                        index,
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                disabled={
                                                    saving
                                                }
                                                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500 disabled:opacity-60"
                                            />
                                        </div>

                                        {videos.length >
                                            1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeVideo(
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    saving
                                                }
                                                className="inline-flex items-center gap-2 text-sm font-bold text-red-400 transition hover:text-red-300 disabled:opacity-50"
                                            >
                                                <Trash2
                                                    size={
                                                        17
                                                    }
                                                />
                                                حذف الفيديو
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[30px] border border-white/10 bg-zinc-950 p-5 sm:p-7">
                        <div className="mb-7 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
                                <CheckCircle2 size={22} />
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-white">
                                    مميزات المشروع
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    المميزات التي ستظهر في قسم وصف المشروع.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {formData.features.map(
                                (feature, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3"
                                    >
                                        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                                            <CheckCircle2
                                                size={19}
                                            />
                                        </div>

                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(
                                                event
                                            ) =>
                                                handleFeatureChange(
                                                    index,
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder={`الميزة رقم ${
                                                index + 1
                                            }`}
                                            disabled={saving}
                                            className="w-full rounded-xl border border-white/10 bg-black px-5 py-3 text-white outline-none transition placeholder:text-zinc-700 focus:border-green-500 disabled:opacity-60"
                                        />

                                        {formData
                                            .features
                                            .length >
                                            1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFeature(
                                                        index
                                                    )
                                                }
                                                disabled={
                                                    saving
                                                }
                                                className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black text-zinc-500 transition hover:border-red-500/30 hover:text-red-400 disabled:opacity-50"
                                            >
                                                <Trash2
                                                    size={
                                                        18
                                                    }
                                                />
                                            </button>
                                        )}
                                    </div>
                                )
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={addFeature}
                            disabled={saving}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black px-5 py-3 text-sm font-bold text-zinc-300 transition hover:border-green-500/30 hover:text-green-400 disabled:opacity-50"
                        >
                            <Plus size={18} />
                            إضافة ميزة
                        </button>
                    </section>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:justify-end">
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 px-7 py-4 font-black text-white transition hover:border-white/20 disabled:opacity-60"
                            >
                                <X size={19} />
                                إلغاء
                            </button>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-500 px-8 py-4 font-black text-black transition hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(34,197,94,.25)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? (
                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />
                            ) : editingId ? (
                                <Pencil size={20} />
                            ) : (
                                <Save size={20} />
                            )}

                            {saving
                                ? editingId
                                    ? "جاري التعديل..."
                                    : "جاري الحفظ..."
                                : editingId
                                ? "تحديث المشروع"
                                : "حفظ المشروع"}
                        </button>
                    </div>
                </form>
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
                    <div
                        dir="rtl"
                        className="w-full max-w-md rounded-[30px] border border-white/10 bg-zinc-950 p-7 shadow-2xl"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                            <AlertTriangle size={27} />
                        </div>

                        <h3 className="mt-6 text-2xl font-black text-white">
                            حذف المشروع؟
                        </h3>

                        <p className="mt-3 leading-8 text-zinc-500">
                            سيتم حذف المشروع والصور والفيديوهات والمميزات المرتبطة به نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                        </p>

                        <div className="mt-7 flex gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteId(null)
                                }
                                disabled={deleting}
                                className="flex-1 rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 font-black text-white transition hover:border-white/20 disabled:opacity-50"
                            >
                                إلغاء
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-4 font-black text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deleting ? (
                                    <Loader2
                                        size={19}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Trash2 size={19} />
                                )}

                                {deleting
                                    ? "جاري الحذف..."
                                    : "حذف نهائي"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
