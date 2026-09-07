import React, { createContext, useCallback, useContext, useState } from "react";

const ServicesContext = createContext(null);

const API_URL = "http://127.0.0.1:8000/api/work-services";

export function ServicesProvider({ children }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchServices = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(API_URL);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء تحميل الخدمات");
            }

            setServices(data.data || []);
        } catch (error) {
            setError(error.message || "حدث خطأ أثناء تحميل الخدمات");
        } finally {
            setLoading(false);
        }
    }, []);

    const createService = async (serviceData) => {
        setSaving(true);
        setError("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء إضافة الخدمة");
            }

            setServices((prev) => [data.data, ...prev]);

            return data;
        } catch (error) {
            setError(error.message || "حدث خطأ أثناء إضافة الخدمة");
            throw error;
        } finally {
            setSaving(false);
        }
    };

    const getService = async (id) => {
        setError("");

        try {
            const response = await fetch(`${API_URL}/${id}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء تحميل الخدمة");
            }

            return data.data;
        } catch (error) {
            setError(error.message || "حدث خطأ أثناء تحميل الخدمة");
            throw error;
        }
    };

    const updateService = async (id, serviceData) => {
        setSaving(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(serviceData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء تحديث الخدمة");
            }

            setServices((prev) =>
                prev.map((service) =>
                    service.id === id ? data.data : service
                )
            );

            return data;
        } catch (error) {
            setError(error.message || "حدث خطأ أثناء تحديث الخدمة");
            throw error;
        } finally {
            setSaving(false);
        }
    };

    const deleteService = async (id) => {
        setSaving(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "حدث خطأ أثناء حذف الخدمة");
            }

            setServices((prev) =>
                prev.filter((service) => service.id !== id)
            );

            return data;
        } catch (error) {
            setError(error.message || "حدث خطأ أثناء حذف الخدمة");
            throw error;
        } finally {
            setSaving(false);
        }
    };

    const clearError = () => {
        setError("");
    };

    return (
        <ServicesContext.Provider
            value={{
                services,
                loading,
                saving,
                error,
                fetchServices,
                createService,
                getService,
                updateService,
                deleteService,
                clearError,
            }}
        >
            {children}
        </ServicesContext.Provider>
    );
}

export function useServices() {
    const context = useContext(ServicesContext);

    if (!context) {
        throw new Error("useServices must be used inside ServicesProvider");
    }

    return context;
}