import { responses } from "./responses.js";
import { Languages } from "./types.js";

const pickRandom = <T>(options: readonly T[]) =>
  options[Math.floor(Math.random() * options.length)];

// Posts carry BCP-47 tags such as "pt-BR", so only the primary subtag is
// compared against the languages the dictionary actually covers.
export const resolveLanguage = (languages?: (string | Languages)[]) => {
  const supported = Object.values<string>(Languages);

  const match = languages
    ?.map((language) => language.split("-")[0].toLowerCase())
    .find((language) => supported.includes(language));

  return (match as Languages | undefined) ?? Languages.EN;
};

export const t = (
  key: keyof typeof responses,
  languages?: (string | Languages)[],
  params?: Record<string, string>
) => {
  const language = resolveLanguage(languages);

  return pickRandom(responses[key][language]).replace(
    /\{\{(\w+)\}\}/g,
    (_, name) => params?.[name] || ""
  );
};
