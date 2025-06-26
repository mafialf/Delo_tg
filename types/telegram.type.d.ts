// types/telegram.type.d.ts

declare namespace window {
  const Telegram: {
    WebApp: {
      initDataUnsafe: {
        user: {
          id: number;
          username?: string;
        };
      };
      openLink: (url: string) => void;
      close: () => void;
      backButton: {
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
        offClick: (callback: () => void) => void;
      };
    };
  };
}
