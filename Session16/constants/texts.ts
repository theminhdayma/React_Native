type Locale = "en" | "vi";

export const texts: Record<
  Locale,
  {
    selectLanguage: string;
    description: string;
    school: string;
  }
> = {
  en: {
    selectLanguage: "English",
    description:
      "This is a simple demonstration of managing languages in React Native using useState to switch the displayed text content.",
    school: "Rikkei Academy",
  },
  vi: {
    selectLanguage: "Tiếng Việt",
    description:
      "Đây là một ví dụ đơn giản về việc quản lý ngôn ngữ trong React Native, sử dụng useState để chuyển đổi văn bản.",
    school: "Học viện Rikkei",
  },
};
