import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const WhyUsContext = createContext(null);

const API_URL = "http://127.0.0.1:8000/api";
const TOKEN_KEY = "apex_admin_token";

export function WhyUsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem(TOKEN_KEY);

    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  const getErrorMessage = (data, fallback) => {
    if (data?.message) {
      return data.message;
    }

    if (data?.errors) {
      const errors = Object.values(data.errors).flat();

      if (errors.length > 0) {
        return errors[0];
      }
    }

    return fallback;
  };

  const readResponse = async (response) => {
    const text = await response.text();

    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      return {
        message: text,
      };
    }
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/why-us`, {
        method: "GET",
        headers: getHeaders(),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "حدث خطأ أثناء جلب مميزات لماذا نحن"
          )
        );
      }

      const fetchedItems = Array.isArray(data.data)
        ? data.data
        : [];

      fetchedItems.sort(
        (a, b) =>
          Number(a.sort_order) -
          Number(b.sort_order)
      );

      setItems(fetchedItems);
    } catch (error) {
      setItems([]);
      setError(
        error?.message ||
          "حدث خطأ أثناء الاتصال بالخادم"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = async (itemData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/why-us`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: String(itemData.title || "").trim(),
          description: String(
            itemData.description || ""
          ).trim(),
          icon: itemData.icon || "FaStar",
          active: Boolean(itemData.active),
          sort_order: Number(itemData.sort_order),
        }),
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "حدث خطأ أثناء إضافة الميزة"
          )
        );
      }

      await fetchItems();

      return data.data;
    } catch (error) {
      setError(
        error?.message ||
          "حدث خطأ أثناء إضافة الميزة"
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (id, itemData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/why-us/${id}`,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            title: String(itemData.title || "").trim(),
            description: String(
              itemData.description || ""
            ).trim(),
            icon: itemData.icon || "FaStar",
            active: Boolean(itemData.active),
            sort_order: Number(itemData.sort_order),
          }),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "حدث خطأ أثناء تعديل الميزة"
          )
        );
      }

      await fetchItems();

      return data.data;
    } catch (error) {
      setError(
        error?.message ||
          "حدث خطأ أثناء تعديل الميزة"
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/why-us/${id}`,
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "حدث خطأ أثناء حذف الميزة"
          )
        );
      }

      await fetchItems();
    } catch (error) {
      setError(
        error?.message ||
          "حدث خطأ أثناء حذف الميزة"
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const toggleItem = async (item) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/why-us/${item.id}`,
        {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({
            active: !Boolean(item.active),
          }),
        }
      );

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          getErrorMessage(
            data,
            "حدث خطأ أثناء تغيير حالة الميزة"
          )
        );
      }

      await fetchItems();

      return data.data;
    } catch (error) {
      setError(
        error?.message ||
          "حدث خطأ أثناء تغيير حالة الميزة"
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <WhyUsContext.Provider
      value={{
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
      }}
    >
      {children}
    </WhyUsContext.Provider>
  );
}

export function useWhyUs() {
  const context = useContext(WhyUsContext);

  if (!context) {
    throw new Error(
      "useWhyUs must be used inside WhyUsProvider"
    );
  }

  return context;
}
