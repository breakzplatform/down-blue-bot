import { Languages } from "./types";

export const responses = {
  "success.reply": {
    [Languages.EN]: "Sure! Press here to download it!",
    [Languages.PT]: "Tá na mão, aperta aqui pra baixar!",
    // [Languages.FR]: "Bien sûr! Voici une capture d'écran de ce post:",
  },
  "error.notAReply": {
    [Languages.EN]:
      "This post is not a reply. Please reply to a post and tag me to get the download link.",
    [Languages.PT]:
      "Este post não é uma resposta. Responda a um post mencionando o bot para fazer o download.",
    // [Languages.FR]:
    //   "Ce post n'est pas une réponse. Répondez à un post et mentionnez-moi pour obtenir une capture d'écran de celui-ci.",
  },
  "error.unknown": {
    [Languages.EN]:
      "An unknown error occurred",
    [Languages.PT]:
      "Ocorreu um erro desconhecido"
  },
} as const;
