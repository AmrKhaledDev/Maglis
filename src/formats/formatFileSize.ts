function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} بايت`;
  }
  if (bytes < 1024 ** 2) {
    return `${(bytes / 1024).toFixed(1)} كيلو بايت`;
  }
  if (bytes < 1024 ** 3) {
    return `${(bytes / 1024 ** 2).toFixed(1)} ميجا بايت`;
  }
  return `${(bytes / 1024 ** 3).toFixed(1)} جيجا بايت`;
}
export default formatFileSize;
