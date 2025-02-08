
export async function parseRequestBody(req) {
  try {
    const contentType = req.headers.get("content-type");
    let body;

    if (contentType.includes("application/json")) {
      body = await req.json(); // Handle JSON data
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.text();
      body = Object.fromEntries(new URLSearchParams(formData)); // Handle form data
    } else {
      throw new Error("Unsupported content type");
    }

    return body;
  } catch (error) {
    throw new Error(`Error parsing request body: ${error.message}`);
  }
}
