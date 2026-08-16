import { Language } from './types';

export interface Translations {
  title: string;
  infoButton: string;
  closeButton: string;
  instructions: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  questionOutcomeSubtitle: string;
  flipButton: string;
  flippingButton: string;
  reflection: {
    startBtn: string;
    closeBtn: string;
    questions: string[];
  };
  logs: {
    header: string;
    placeholder: string;
    empty: string;
  };
  infoModal: {
    header: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    withLove: string;
    author: string;
  };
}

export const translations: Record<Language, Translations> = {
  esp: {
    title: 'monedaire',
    infoButton: 'info',
    closeButton: 'cerrar',
    instructions: {
      step1: '1. respira profundo',
      step2: '2. piensa en tu pregunta',
      step3: '3. presiona el botón de lanzar (y cierra los ojos)',
      step4: '4. reflexiona sobre tu resultado (recomendado)',
    },
    questionOutcomeSubtitle: '¿qué resultado esperabas?',
    flipButton: 'LANZAR',
    flippingButton: 'LANZANDO...',
    reflection: {
      startBtn: 'quiero reflexionar sobre mi resultado',
      closeBtn: 'cerrar reflexión',
      questions: [
        '¿me satisface el resultado que obtuve?',
        '¿volvería a lanzar la moneda?',
        '¿cómo me hace sentir este resultado?',
        '¿creo que es lo mejor para mí hacer esto?',
      ],
    },
    logs: {
      header: 'registra tus dudas',
      placeholder: 'tu pregunta',
      empty: 'aún no hay tiradas registradas. presiona lanzar para comenzar.',
    },
    infoModal: {
      header: 'info',
      title: 'sobre monedaire:',
      p1: 'monedaire se me ocurrió en un momento en el que necesitaba una moneda virtual, a falta de una real, para lanzar y resolver mis eternas indecisiones.',
      p2: 'esta moneda tiene una tercera cara, que es la verdadera.',
      p3: 'responder a la pregunta de esa tercera cara, en los momentos que te salga, va a resolver tus dudas y tus deseos más claramente que un sí o un no.',
      p4: 'espero que esta herramienta te sea útil.',
      withLove: 'con amor',
      author: '-Lorena',
    },
  },
  eng: {
    title: 'monedaire',
    infoButton: 'info',
    closeButton: 'close',
    instructions: {
      step1: '1. take a deep breath',
      step2: '2. think of your question',
      step3: '3. press the flip button (and close your eyes)',
      step4: '4. reflect on your result (recommended)',
    },
    questionOutcomeSubtitle: 'what result were you hoping for?',
    flipButton: 'FLIP',
    flippingButton: 'FLIPPING...',
    reflection: {
      startBtn: 'i want to reflect on my result',
      closeBtn: 'close reflection',
      questions: [
        'am i satisfied with the result i got?',
        'would i flip the coin again?',
        'how does this result make me feel?',
        'do i believe doing this is best for me?',
      ],
    },
    logs: {
      header: 'record your doubts',
      placeholder: 'your question',
      empty: 'no flips recorded yet. press flip to begin.',
    },
    infoModal: {
      header: 'info',
      title: 'about monedaire:',
      p1: 'monedaire came to me at a moment when i needed a virtual coin, for lack of a real one, to flip and resolve my endless indecisions.',
      p2: 'this coin has a third side, which is the true one.',
      p3: 'answering the question of that third side, whenever it comes up, will resolve your doubts and desires much more clearly than a yes or a no.',
      p4: 'i hope this tool is helpful to you.',
      withLove: 'with love',
      author: '-Lorena',
    },
  },
};
