export function decodeURL(url: string): string {
  return url.replace(/(&#(\d+);)/g, (_match, _capture, charCode) =>
    String.fromCharCode(charCode)
  );
}
