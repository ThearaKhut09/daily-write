const getFileExtension = (fileName) => {
  const extension = fileName?.split(".")?.pop()?.toLowerCase();
  return extension || "jpg";
};

const DEFAULT_API_BASE_URL = "https://blog-api.bykh.org/api/v100";

const resolveMediaBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_BASE_URL || DEFAULT_API_BASE_URL;
  const isVercelDeployment =
    typeof window !== "undefined" && window.location.hostname.endsWith("vercel.app");

  if (!isVercelDeployment || !/^https?:\/\//i.test(configuredBaseUrl)) {
    return configuredBaseUrl;
  }

  try {
    const { pathname } = new URL(configuredBaseUrl);
    const normalizedPath = pathname.replace(/\/$/, "");
    return `/proxy${normalizedPath}`;
  } catch {
    return configuredBaseUrl;
  }
};

export const resolveMediaPreviewUrl = (
  response,
  originalFileName,
  baseUrl = resolveMediaBaseUrl(),
) => {
  const payload = response?.data ?? response;
  const media = Array.isArray(payload) ? payload[0] : payload;

  if (typeof media === "string" && media.startsWith("http")) {
    return media;
  }

  const directUrl =
    media?.previewLink ||
    media?.previewUrl ||
    media?.url ||
    media?.fileUrl ||
    media?.downloadUrl;

  if (directUrl) {
    return directUrl.startsWith("http")
      ? directUrl
      : `${baseUrl}/${directUrl.replace(/^\//, "")}`;
  }

  const fileName = media?.fileName || media?.name;
  if (fileName) {
    return `${baseUrl}/${fileName}`;
  }

  const uuid = media?.uuid || media?.id || media?.fileUuid || media?.mediaUuid;
  if (uuid) {
    return `${baseUrl}/${uuid}.${getFileExtension(originalFileName)}`;
  }

  return "";
};
