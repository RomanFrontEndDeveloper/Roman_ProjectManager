export function extractMentions(
  content: string,
): string[] {
  const matches =
    content.match(/@([a-zA-Z0-9_]+)/g) || [];

  return matches.map((mention) => 
    mention.replace("@", ""),
  );  //"Пройтися по всіх знайдених згадках і прибрати з кожної символ @."
}

// const text = "Привіт @roman та @john";
// console.log(text.match(/@([a-zA-Z0-9_]+)/g));

// Результат:
// ["@roman", "@john"]