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

const worldBubbleFiles: Record<string, string> = {
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

const worldMapFiles: Record<string, string> = {
  "wizard city": "images07ea454d3ca44d5e8416fc2658e97ca1.png",
  krokotopia: "images07fee8bd22ce45fe81f359b2764a1b22.png",
  marleybone: "images08c75c2121b3453aade77791af05d8cd.png",
  mooshu: "images09b68b776ba446cbb1bded475a13106d.png",
  dragonspyre: "images0a1f2b26dfb346bca66e33c59c43c3dd.png",
  celestia: "images0b3d88af600845d7a88b7b7cc05ec78d.png",
  zafaria: "images0b6f0938bbe14abe81f165b90b2b0ca9.png",
  avalon: "images0c79f3cd330840e2805022228d41daff.png",
  azteca: "images0ce60c3425a04213b0bcf86010605819.png",
  khrysalis: "images0e31b5afdab942adac738956b798ddd7.png",
  polaris: "images0e3285712d7d45729751d559b78b99d3.png",
  mirage: "images0e4b4e0594d543029baec5bbebfaa952.png",
  empyrea: "images0eb2c58c96574c25914c8b30af927836.png",
  karamelle: "images0ef7aba8d05e405f9734dcb23660d654.png",
};

const worldArtFile = (
  name: string,
  library: Record<string, string>,
) => library[name.toLowerCase()] ?? `${formatLibraryFileName(name)}.png`;

export const worldBubblePath = (name: string) =>
  libraryRoot("World map Images", worldArtFile(name, worldBubbleFiles));

export const worldMapPath = (name: string) =>
  libraryRoot("World map Images", worldArtFile(name, worldMapFiles));
