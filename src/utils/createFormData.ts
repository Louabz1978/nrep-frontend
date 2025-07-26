function createFormData(
  data: Record<string, string | string[] | undefined | null | number | boolean>
): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue; // Skip undefined/null values
    }

    if (Array.isArray(value)) {
      // Handle arrays (string[], number[], boolean[])
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}`, item);
        }
      });
    } else {
      // Handle primitives (string, number, boolean)
      formData.append(key, String(value));
    }
  }

  return formData;
}

export default createFormData;
