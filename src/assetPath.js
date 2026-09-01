function compressedImagePath(path) {
  const normalized = String(path).replace(/^\/+/, "");

  if (!/^assets\/.+\.(?:jpe?g|png)$/i.test(normalized)) {
    return normalized;
  }

  return normalized
    .replace(/^assets\//, "assets/webp/")
    .replace(/\.(?:jpe?g|png)$/i, ".webp");
}

export function assetPath(path) {
  return `${import.meta.env.BASE_URL}${compressedImagePath(path)}`;
}
