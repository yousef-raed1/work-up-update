import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const ProjectContext = createContext();

const API_URL = "http://127.0.0.1:8000/api/projects";

export default function ProjectContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = response.data;

      const projectsData = Array.isArray(data)
        ? data
        : Array.isArray(data.projects)
        ? data.projects
        : Array.isArray(data.data)
        ? data.data
        : [];

      setProjects(projectsData);
    } catch (error) {
      console.error(
        "Laravel Error:",
        error.response?.data || error.message
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    try {
      const response = await axios.post(
        API_URL,
        projectData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      await getProjects();

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error(
        "RESPONSE DATA:",
        error.response?.data
      );

      return {
        success: false,
        error: error.response?.data || {
          message: error.message,
        },
      };
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}`,
        projectData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      await getProjects();

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error(
        "RESPONSE DATA:",
        error.response?.data
      );

      return {
        success: false,
        error: error.response?.data || {
          message: error.message,
        },
      };
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });

      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) => project.id !== id
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Laravel Error:",
        error.response?.data || error.message
      );

      return false;
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
        getProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  return useContext(ProjectContext);
};