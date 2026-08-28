import { responses } from "./responses";
import { Languages } from "./types";

const pickRandom = <T>(options: readonly T[]) =>
  options[Math.floor(Math.random() * options.length)];

export const t = (
  key: keyof typeof responses,
  languages?: (string | Languages)[],
  params?: Record<string, string>
) => {
  const language =
    (languages?.find((l) => Object.values<string>(Languages).includes(l)) as
      | Languages
      | undefined) ?? Languages.EN;

  return pickRandom(responses[key][language]).replace(
    /\{\{(\w+)\}\}/g,
    (_, name) => params?.[name] || ""
  );
};
