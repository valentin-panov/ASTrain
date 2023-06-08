const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript)/im;
const htmlEntitiesRegex = /&#(\w+)(^\w|;)?/g;
const htmlCtrlEntityRegex = /&(newline|tab);/gi;
const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;
const urlSchemeRegex = /^.+(:|:)/gim;
const relativeFirstCharacters = [".", "/"];

function isRelativeUrlWithoutProtocol(url: string): boolean {
  return relativeFirstCharacters.indexOf(url[0]) > -1;
}

function decodeHtmlCharacters(str: string) {
  return str.replace(htmlEntitiesRegex, (_match, dec) => {
    return String.fromCharCode(dec);
  });
}

function isEncoded(uri: string): boolean {
  uri = uri || "";
  return uri !== decodeURIComponent(uri);
}

function fullyDecodeURI(uri: string): string {
  while (isEncoded(uri)) {
    uri = decodeURIComponent(uri);
  }
  return uri;
}

const sanitiseUrl = (url: string): string => {
  try {
    const sanitisedUrl = decodeHtmlCharacters(fullyDecodeURI(url))
      .replace(htmlCtrlEntityRegex, "")
      .replace(ctrlCharactersRegex, "")
      .trim();
    if (!sanitisedUrl) {
      return "about:blank";
    }
    if (isRelativeUrlWithoutProtocol(sanitisedUrl)) {
      return sanitisedUrl;
    }
    const urlSchemeParseResults = sanitisedUrl.match(urlSchemeRegex);
    if (!urlSchemeParseResults) {
      return sanitisedUrl;
    }
    const urlScheme = urlSchemeParseResults[0];
    if (invalidProtocolRegex.test(urlScheme)) {
      return "about:blank";
    }
    return sanitisedUrl;
  } catch {
    return "about:blank";
  }
};

export default sanitiseUrl;
