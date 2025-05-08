import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getCoffees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coffees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coffees:', error);
    throw error;
  }
};
export const getWorkshops = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/workshops`);
    return response.data;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
};
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};
export const getTeammates = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teammates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teammates:', error);
    throw error;
  }
};

export const getAccessories = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/accessories?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accessories:', error);
    throw error;
  }
};

export const getGrinders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/grinders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching grinders:', error);
    throw error;
  }
};
export const getCommercial = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/commercial`);
    return response.data;
  } catch (error) {
    console.error('Error fetching commercial machines:', error);
    throw error;
  }
};
export const getProfessional = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/professional`);
    return response.data;
  } catch (error) {
    console.error('Error fetching professional machines:', error);
    throw error;
  }
};
export const getCourseById = async (_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${_id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch course' };
  }
};
export const getMachines = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching machines:', error);
    throw error;
  }
};
export const addWorkshop = async (formData) => {
  const form = new FormData();
  form.append("title", formData.title?.trim() || '');  // Use formData
  form.append("length_value", formData.length_value ? Number(formData.length_value) : 0);
  form.append("length_unit", formData.length_unit?.trim() || 'h');
  form.append("class_size", formData.class_size ? Number(formData.class_size) : 0);
  form.append("description", formData.description?.trim() || '');
  form.append("image_url", formData.image_url);

  try {
    const response = await axios.post(`${API_BASE_URL}/workshops`, form);
    return response.data;
  } catch (error) {
    console.error('Error adding workshop:', error);
    throw error.response?.data || { message: 'Failed to add workshop' };
  }
};
export const addCoffee = async (formData) => {
  const form = new FormData();
  form.append("name", formData.name?.trim() || '');
  form.append("country", formData.country?.trim() || '');
  form.append("process", formData.process?.trim() || '');
  form.append("score", formData.score ? Number(formData.score) : 0);
  form.append("weTaste", formData.weTaste || []);
  form.append("image_url", formData.image);  // Change to match backend key


  try {
    const response = await axios.post(`${API_BASE_URL}/coffees`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding coffee:", error);
    throw error.response?.data || { message: "Failed to add coffee" };
  }
};
export const addAccessory = async (accessoryData) => {
  const form = new FormData();
  form.append("title", accessoryData.title?.trim() || '');
  form.append("image_url", accessoryData.image_url); // Assuming main image is passed as a File
  
  // Convert subitems array into a JSON string and append
  const subitemsToSend = accessoryData.subitems.map(sub => ({
    title: sub.title,
    description: sub.description,
    image_url: sub.image_url ? sub.image_url.name : '', // Only append the file name for subitem image
  }));
  form.append("subitems", JSON.stringify(subitemsToSend));

  // Append each subitem image file to the form data
  accessoryData.subitems.forEach((subitem, index) => {
    if (subitem.image_url instanceof File) {
      form.append("subitem_images", subitem.image_url); // Multiple files with the same field name
    }
  });
  
  try {
    const response = await axios.post(`${API_BASE_URL}/accessories`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding accessory:", error);
    throw error.response?.data || { message: "Failed to add accessory" };
  }
};
export const addGrinder = async (grinderData) => {
  const form = new FormData();
  form.append("title", grinderData.title?.trim() || '');
  form.append("description", grinderData.description?.trim() || '');
  form.append("image_url", grinderData.image_url); // main image file

  // Convert subItems to JSON string for titles and filenames
  const subItemsToSend = grinderData.subItems.map(sub => ({
    title: sub.title,
    image_url: sub.image_url,
  }));
  form.append("subItems", JSON.stringify(subItemsToSend));

  // Append each subitem image file
  grinderData.subItems.forEach((sub, index) => {
    if (sub._file instanceof File) {
      form.append("subitem_images", sub._file);
    }
  });

  // Append additional_info
  form.append("additional_info", JSON.stringify(grinderData.additional_info));


  // Append details
  grinderData.details.forEach((detail, index) => {
    form.append(`details[]`, detail);
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/grinders`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding grinder:", error);
    throw error.response?.data || { message: "Failed to add grinder" };
  }
};
export const addMachine = async (machineData) => {
  const form = new FormData();
  form.append("category", machineData.category?.trim() || '');
  form.append("title", machineData.title?.trim() || '');
  form.append("description", machineData.description?.trim() || '');
  form.append("image_url", machineData.image_url);

  form.append("additional_info", JSON.stringify(machineData.additional_info));
  form.append("large_info", JSON.stringify(machineData.large_info));


  try {
    const response = await axios.post(`${API_BASE_URL}/items`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding machine:", error);
    throw error.response?.data || { message: "Failed to add machine" };
  }
};
export const addCourse = async (courseData) => {
  const form = new FormData();

  form.append("title", courseData.title?.trim() || "");
  form.append("subtitle", courseData.subtitle?.trim() || "");
  form.append("overview", courseData.overview?.trim() || "");

  // Append array fields as JSON
  form.append("objectives",courseData.objectives || []);
  form.append("topics", courseData.topics || []);
  form.append("structure", courseData.structure || []);
  form.append("target_audience", courseData.target_audience || []);

  // File input
  if (courseData.image_url instanceof File) {
    form.append("image_url", courseData.image_url);
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/courses`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error.response?.data || { message: "Failed to add course" };
  }
};
export const addTeammate = async (teammateData) => {
  const form = new FormData();
  form.append("name", teammateData.name?.trim() || '');
  form.append("role", teammateData.role?.trim() || '');
  form.append("image_url", teammateData.image_url); // Assuming it's a File instance

  try {
    const response = await axios.post(`${API_BASE_URL}/teammates`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding teammate:", error);
    throw error.response?.data || { message: "Failed to add teammate" };
  }
};
export const editTeammate = async (_id, formData) => {
  const form = new FormData();
  form.append('name', formData.name?.trim() || '');
  form.append('role', formData.role?.trim() || '');
  
  // Append image only if it's a File (new image uploaded)
  if (formData.image_url instanceof File) {
    form.append('image_url', formData.image_url);
  }

  try {
    const response = await axios.patch(`${API_BASE_URL}/teammates/${_id}`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing teammate:', error);
    throw error.response?.data || { message: 'Failed to edit teammate' };
  }
};
export const deleteTeammate = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/teammates/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting teammate:", error);
    throw error.response?.data || { message: "Failed to delete teammate" };
  }
};
export const editAccessory = async (_id, accessoryData) => {
  const form = new FormData();
  form.append("title", accessoryData.title?.trim() || '');

  if (accessoryData.image_url instanceof File) {
    form.append("image_url", accessoryData.image_url);
  }

  // Subitems (excluding image_url)
  const subitems = accessoryData.subitems.map((sub) => ({
    title: sub.title?.trim() || '',
    description: sub.description?.trim() || '',
    image_url: typeof sub.image_url === "string" ? sub.image_url : null, // Keep existing URL
  }));
  form.append("subitems", JSON.stringify(subitems));

  // Add subitem images by index key: subitem_images_0, subitem_images_1, ...
  accessoryData.subitems.forEach((sub, index) => {
    if (sub.image_url instanceof File) {
      form.append(`subitem_images_${index}`, sub.image_url);
    }
  });

  try {
    const response = await axios.patch(`${API_BASE_URL}/accessories/${_id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing accessory:", error);
    throw error.response?.data || { message: "Failed to edit accessory" };
  }
};

export const deleteAccessory = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/accessories/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting accessory:", error);
    throw error.response?.data || { message: "Failed to delete accessory" };
  }
};

export const editWorkshop = async (_id, formData) => {
  const form = new FormData();
  if (formData.title) form.append('title', formData.title.trim());
  if (formData.length_value) form.append('length_value', Number(formData.length_value));
  if (formData.length_unit) form.append('length_unit', formData.length_unit.trim());
  if (formData.class_size) form.append('class_size', Number(formData.class_size));
  if (formData.description) form.append('description', formData.description.trim());
  if (formData.image_url instanceof File) form.append('image_url', formData.image_url);

  try {
    const response = await axios.patch(`${API_BASE_URL}/workshops/${_id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing workshop:', error);
    throw error.response?.data || { message: 'Failed to edit workshop' };
  }
};
export const deleteWorkshop = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/workshops/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting workshop:', error);
    throw error.response?.data || { message: 'Failed to delete workshop' };
  }
};
//edit coffee
export const editCoffee = async (_id, formData) => {
  const form = new FormData();
  if (formData.name) form.append("name", formData.name.trim());
  if (formData.country) form.append("country", formData.country.trim());
  if (formData.process) form.append("process", formData.process.trim());
  if (formData.score !== undefined) form.append("score", Number(formData.score));
  if (formData.weTaste) {
    if (Array.isArray(formData.weTaste)) {
      form.append("weTaste", formData.weTaste.join(","));
    } else if (typeof formData.weTaste === "string") {
      form.append("weTaste", formData.weTaste.trim());
    }
  }
  if (formData.image) form.append("image_url", formData.image);

  try {
    const response = await axios.patch(`${API_BASE_URL}/coffees/${_id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error('Error editing coffee:', error);
    throw error.response?.data || { message: 'Failed to edit coffee' };
  }
};

// ✅ NEW: Delete a coffee
export const deleteCoffee = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/coffees/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting coffee:', error);
    throw error.response?.data || { message: 'Failed to delete coffee' };
  }
};
export const editCourse = async (_id, formData) => {
  const form = new FormData();
  if (formData.title) form.append("title", formData.title.trim());
  if (formData.subtitle) form.append("subtitle", formData.subtitle.trim());
  if (formData.overview) form.append("overview", formData.overview.trim());
  if (formData.objectives) form.append("objectives", JSON.stringify(formData.objectives));
  if (formData.structure) form.append("structure", JSON.stringify(formData.structure));
  if (formData.target_audience) form.append("target_audience", JSON.stringify(formData.target_audience));
  if (formData.topics) form.append("topics", JSON.stringify(formData.topics));
  if (formData.image_url) form.append("image_url", formData.image_url); // Must be a File

  try {
    const response = await axios.patch(`${API_BASE_URL}/courses/${_id}`, form);
    return response.data;
  } catch (error) {
    console.error('Error editing course:', error);
    throw error.response?.data || { message: 'Failed to edit course' };
  }
};
export const deleteCourse = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/courses/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error.response?.data || { message: 'Failed to delete course' };
  }
};
// Edit an existing grinder
export const editGrinder = async (grinderId, grinderData) => {
  const form = new FormData();

  form.append("title", grinderData.title?.trim() || '');
  form.append("description", grinderData.description?.trim() || '');

  if (grinderData.image_url instanceof File) {
    form.append("image_url", grinderData.image_url);
  }

  grinderData.subItems.forEach((sub, index) => {
    if (sub._file instanceof File) {
      form.append("subitem_images", sub._file);
    }
  });

  form.append("subItems", JSON.stringify(
    grinderData.subItems.map(({ title, image_url }) => ({ title, image_url }))
  ));
  form.append("additional_info", JSON.stringify(grinderData.additional_info));
  form.append("details", JSON.stringify(grinderData.details));

  try {
    const response = await axios.patch(`${API_BASE_URL}/grinders/${grinderId}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing grinder:", error);
    throw error.response?.data || { message: "Failed to edit grinder" };
  }
};




// Delete a grinder
export const deleteGrinder = async (_id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/grinders/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting grinder:', error);
    throw error.response?.data || { message: 'Failed to delete grinder' };
  }
};

export const editItem = async (_id, updatedData, imageFile) => {
  try {
    const formData = new FormData();

    // Append non-file fields
    for (const key in updatedData) {
      if (
        updatedData[key] !== undefined &&
        updatedData[key] !== null &&
        typeof updatedData[key] !== 'object'
      ) {
        formData.append(key, updatedData[key]);
      } else if (typeof updatedData[key] === 'object') {
        formData.append(key, JSON.stringify(updatedData[key]));
      }
    }

    // Append image file if provided
    if (imageFile) {
      formData.append('image_url', imageFile);
    }

    const response = await axios.patch(
      `http://localhost:5000/api/items/${_id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Edit item error:', error);
    throw error.response?.data || { error: 'Something went wrong' };
  }
};

export const deleteItem = async (_id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/items/${_id}`);
    return response.data;
  } catch (error) {
    console.error('Delete item error:', error);
    throw error.response?.data || { error: 'Something went wrong' };
  }
};
export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data; // returns { username, token }
  } catch (error) {
    console.error('Error logging in admin:', error);
    throw error.response?.data || { message: 'Login failed' };
  }
};


