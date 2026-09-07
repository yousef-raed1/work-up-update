import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const ProjectsContext = createContext(null);

const API_URL = "http://127.0.0.1:8000/api";
const TOKEN_KEY = "apex_admin_token";

export function ProjectsProvider({ children }) {
    const [projects, setProjects] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        return token
            ? {
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json",
              }
            : {
                  Accept: "application/json",
              };
    }, []);

    const clearError = useCallback(() => {
        setError("");
    }, []);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/work-projects`,
                {
                    method: "GET",
                    headers: getAuthHeaders(),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                        "حدث خطأ أثناء جلب المشاريع."
                );
            }

            const projectsData = Array.isArray(data.data)
                ? data.data
                : [];

            setProjects(projectsData);

            return {
                success: true,
                data: projectsData,
            };
        } catch (err) {
            const message =
                err.message ||
                "حدث خطأ أثناء جلب المشاريع.";

            setError(message);
            setProjects([]);

            return {
                success: false,
                message,
                data: [],
            };
        } finally {
            setLoading(false);
        }
    }, [getAuthHeaders]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const createProject = useCallback(
        async (formData) => {
            setSaving(true);
            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/work-projects`,
                    {
                        method: "POST",
                        headers: getAuthHeaders(),
                        body: formData,
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    return {
                        success: false,
                        message:
                            data.message ||
                            "حدث خطأ أثناء إضافة المشروع.",
                        errors: data.errors || null,
                    };
                }

                if (data.data) {
                    setProjects((prev) => [
                        data.data,
                        ...prev,
                    ]);
                }

                return {
                    success: true,
                    message:
                        data.message ||
                        "تم إنشاء المشروع بنجاح.",
                    data: data.data || null,
                };
            } catch (err) {
                const message =
                    err.message ||
                    "حدث خطأ أثناء الاتصال بالخادم.";

                setError(message);

                return {
                    success: false,
                    message,
                    errors: null,
                };
            } finally {
                setSaving(false);
            }
        },
        [getAuthHeaders]
    );

    const getProject = useCallback(
        async (id) => {
            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/work-projects/${id}`,
                    {
                        method: "GET",
                        headers: getAuthHeaders(),
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    return {
                        success: false,
                        message:
                            data.message ||
                            "حدث خطأ أثناء جلب المشروع.",
                        data: null,
                    };
                }

                return {
                    success: true,
                    data: data.data || null,
                };
            } catch (err) {
                const message =
                    err.message ||
                    "حدث خطأ أثناء الاتصال بالخادم.";

                setError(message);

                return {
                    success: false,
                    message,
                    data: null,
                };
            }
        },
        [getAuthHeaders]
    );

    const updateProject = useCallback(
        async (id, formData) => {
            setSaving(true);
            setError("");

            try {
                formData.append("_method", "PUT");

                const response = await fetch(
                    `${API_URL}/work-projects/${id}`,
                    {
                        method: "POST",
                        headers: getAuthHeaders(),
                        body: formData,
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

                if (data.data) {
                    setProjects((prev) =>
                        prev.map((project) =>
                            String(project.id) ===
                            String(id)
                                ? data.data
                                : project
                        )
                    );
                }

                return {
                    success: true,
                    message:
                        data.message ||
                        "تم تعديل المشروع بنجاح.",
                    data: data.data || null,
                };
            } catch (err) {
                const message =
                    err.message ||
                    "حدث خطأ أثناء الاتصال بالخادم.";

                setError(message);

                return {
                    success: false,
                    message,
                    errors: null,
                };
            } finally {
                setSaving(false);
            }
        },
        [getAuthHeaders]
    );

    const deleteProject = useCallback(
        async (id) => {
            setError("");

            try {
                const response = await fetch(
                    `${API_URL}/work-projects/${id}`,
                    {
                        method: "DELETE",
                        headers: getAuthHeaders(),
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    return {
                        success: false,
                        message:
                            data.message ||
                            "حدث خطأ أثناء حذف المشروع.",
                    };
                }

                setProjects((prev) =>
                    prev.filter(
                        (project) =>
                            String(project.id) !==
                            String(id)
                    )
                );

                return {
                    success: true,
                    message:
                        data.message ||
                        "تم حذف المشروع بنجاح.",
                };
            } catch (err) {
                const message =
                    err.message ||
                    "حدث خطأ أثناء الاتصال بالخادم.";

                setError(message);

                return {
                    success: false,
                    message,
                };
            }
        },
        [getAuthHeaders]
    );

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                loading,
                saving,
                error,
                fetchProjects,
                createProject,
                getProject,
                updateProject,
                deleteProject,
                clearError,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}

export function useProjects() {
    const context = useContext(ProjectsContext);

    if (!context) {
        throw new Error(
            "useProjects must be used inside ProjectsProvider"
        );
    }

    return context;
}

export default ProjectsContext;