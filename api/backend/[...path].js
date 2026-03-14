const DEFAULT_BACKEND_ORIGIN = "https://blog-api.bykh.org";

const parseTargetPath = (pathParam) => {
  if (Array.isArray(pathParam)) {
    return pathParam.join("/");
  }
  return pathParam || "";
};

const buildTargetUrl = (req) => {
  const backendOrigin = process.env.BACKEND_ORIGIN || DEFAULT_BACKEND_ORIGIN;
  const incomingUrl = new URL(req.url, "http://localhost");
  const targetPath = parseTargetPath(req.query.path);
  return `${backendOrigin.replace(/\/$/, "")}/${targetPath}${incomingUrl.search}`;
};

const getForwardHeaders = (req, targetUrl) => {
  const headers = {
    Accept: req.headers.accept || "application/json",
  };

  if (req.headers["content-type"]) {
    headers["Content-Type"] = req.headers["content-type"];
  }

  if (req.headers.authorization) {
    headers.Authorization = req.headers.authorization;
  }

  headers.Origin = new URL(targetUrl).origin;
  return headers;
};

const getForwardBody = (req) => {
  if (req.method === "GET" || req.method === "HEAD") {
    return undefined;
  }

  if (req.body == null) {
    return undefined;
  }

  if (typeof req.body === "string" || Buffer.isBuffer(req.body)) {
    return req.body;
  }

  return JSON.stringify(req.body);
};

export default async function handler(req, res) {
  const targetUrl = buildTargetUrl(req);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: getForwardHeaders(req, targetUrl),
      body: getForwardBody(req),
    });

    res.status(response.status);

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    const cacheControl = response.headers.get("cache-control");
    if (cacheControl) {
      res.setHeader("Cache-Control", cacheControl);
    }

    if (response.status === 204) {
      return res.end();
    }

    const payload = Buffer.from(await response.arrayBuffer());
    return res.send(payload);
  } catch {
    return res.status(502).json({
      error: "Failed to connect to upstream backend.",
    });
  }
}
