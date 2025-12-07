export const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

export const libraryRoot = (...segments: string[]) =>
  `${basePath}/${["W101 Images", ...segments]
    .map((segment) => segment.split("/").map(encodeURIComponent).join("/"))
    .join("/")}`;

export const formatLibraryFileName = (value: string) =>
  value
    .replace(/['’]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("_");

export const libraryPath = (
  folder: string,
  name: string,
  extension: "png" | "jpg" | "jpeg" | "webp" = "png",
  formatter: (value: string) => string = formatLibraryFileName,
) => `${libraryRoot(folder)}/${encodeURIComponent(formatter(name))}.${extension}`;

export const w101Icon = (name: string, extension: "png" | "webp" = "webp") =>
  libraryPath("Icons", name, extension, formatLibraryFileName);
