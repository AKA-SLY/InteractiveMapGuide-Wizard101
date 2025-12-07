export const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

export const libraryRoot = (...segments: string[]) =>
  `${basePath}/${["W101 Images", ...segments]
    .map((segment) => segment.split("/").map(encodeURIComponent).join("/"))
    .join("/")}`;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

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

export const libraryPathFromSlug = (
  folder: string,
  name: string,
  extension: "png" | "jpg" | "jpeg" | "webp" = "png",
  formatter: (value: string) => string = slugify,
) => libraryPath(folder, name, extension, formatter);

const worldArtFiles: Record<string, string> = {
  "wizard city": "images99d33ab103ab4ba2b1cc3c58d1455938.png",
  krokotopia: "images00e161ed394c40eda40c7eed0ef6bf82.png",
  marleybone: "images5501e6f32859477f997ab623b957cb35.png",
  mooshu: "images04a89a31eb55400db7b03f07796f026c.png",
  dragonspyre: "images0016273f5ac04cb58939bf2278b948ff.png",
  celestia: "images045402903db14d06ba4717a5c293a34e.png",
  zafaria: "images079ff4fd9781485fbb458decf6a5b2b7.png",
  avalon: "images031ecda551a24256b562d1a87d9556ad.png",
  azteca: "images000a6e8d39bf4449bd7d7a51b91e6a1d.png",
  khrysalis: "images0ef7aba8d05e405f9734dcb23660d654.png",
  polaris: "images04f208bd7443426caa643afe02233bde.png",
  mirage: "images0175aafd490840b8b8dbde18d527c84d.png",
  empyrea: "images162fbf1e158f4694858ac6c880e6e487.png",
  karamelle: "images11a1be42efa24d90b0b697e37c557e3d.png",
};

const worldArtFile = (name: string) =>
  worldArtFiles[name.toLowerCase()] ?? `${formatLibraryFileName(name)}.png`;

export const worldBubblePath = (name: string) => libraryRoot("World map Images", worldArtFile(name));

export const worldMapPath = (name: string) => libraryRoot("World map Images", worldArtFile(name));
