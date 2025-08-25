import axios from "axios";

export async function getCourseTimestamp(folderID: string) {
  try {
    const response = await axios.get(`/api/courses/${folderID}/timestamp`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch timestamp:", error);
    // Return a consistent error object if the API call fails
    return { error: "Failed to fetch timestamp." };
  }
}

// Your existing getCourses function
export async function getCourses(folderID: string) {
    try {
        const response = await axios.get(`/api/folder_details/${folderID}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        // Return a consistent error object if the API call fails
        return { error: "Failed to fetch courses." };
    }
}

// actions/courses.ts

export async function getCourseMetadata(folderID: string) {
  try {
    const response = await axios.get(`/api/courses/${folderID}/metadata`);
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch course metadata." };
  }
}