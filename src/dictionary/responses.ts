import { Languages } from "./types";

export const responses = {
  "success.reply": {
    [Languages.EN]: [
      "Sure! Press here to download it!",
      "Here you go, tap here to download.",
      "All set — your download is right here.",
      "Got it! Grab the file here.",
      "Done! Hit here to save it.",
      "Coming right up, download it here.",
    ],
    [Languages.PT]: [
      "Tá na mão, aperta aqui pra baixar!",
      "Prontinho! É só clicar aqui pra baixar.",
      "Saiu! Toca aqui pra fazer o download.",
      "Aqui está, clica aqui pra salvar.",
      "Feito! O download tá logo aqui.",
      "Pode pegar, é só apertar aqui.",
    ],
  },
  "error.notAReply": {
    [Languages.EN]: [
      "This post is not a reply. Please reply to a post and tag me to get the download link.",
      "I need a reply to work with. Mention me in a reply to the post you want to download.",
      "There is no post above this one. Reply to the post you want and tag me there.",
      "Nothing to download here — tag me in a reply to the post you are after.",
      "That was not a reply. Answer the post you want to save and mention me in it.",
      "I only work on replies. Reply to the post and call me in.",
    ],
    [Languages.PT]: [
      "Este post não é uma resposta. Responda a um post mencionando o bot para fazer o download.",
      "Preciso de uma resposta pra funcionar. Me marque respondendo ao post que você quer baixar.",
      "Não tem post acima desse. Responda ao post que você quer e me chame por lá.",
      "Não achei nada pra baixar aqui — me marque respondendo ao post desejado.",
      "Isso não é uma resposta. Responda ao post que você quer salvar e me mencione nele.",
      "Só funciono em respostas. Responde o post e me chama.",
    ],
  },
  "error.unknown": {
    [Languages.EN]: [
      "An unknown error occurred: {{error}}",
      "Something went wrong on my side: {{error}}",
      "I could not finish that one. The error was: {{error}}",
      "Unexpected failure while handling your request: {{error}}",
      "I hit a snag: {{error}}",
      "That did not go as planned: {{error}}",
    ],
    [Languages.PT]: [
      "Ocorreu um erro desconhecido: {{error}}",
      "Deu ruim aqui do meu lado: {{error}}",
      "Não consegui terminar esse. O erro foi: {{error}}",
      "Falha inesperada ao processar seu pedido: {{error}}",
      "Esbarrei num problema: {{error}}",
      "Não saiu como planejado: {{error}}",
    ],
  },
} as const;
