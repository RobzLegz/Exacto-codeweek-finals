export const getUrl = (str: string) => {
  let clean = "";

  const split = str.replaceAll(" ", "-").toLowerCase().split("");

  for (let i = 0; i < split.length; i++) {
    if (allowedChars.some((ch) => ch.toLowerCase() === split[i])) {
      let char = split[i];

      for (const k in replaced) {
        if (char === k) {
          char = replaced[k];
        }
      }

      clean = `${clean}${char}`;
    }
  }

  while (clean.includes("--")) {
    clean = clean.replaceAll("--", "-");
  }

  return clean;
};

const allowedChars = [
  "a",
  "ā",
  "b",
  "c",
  "č",
  "d",
  "e",
  "ē",
  "f",
  "g",
  "ģ",
  "h",
  "i",
  "ī",
  "j",
  "k",
  "ķ",
  "l",
  "ļ",
  "m",
  "n",
  "ņ",
  "o",
  "p",
  "r",
  "s",
  "š",
  "t",
  "u",
  "ū",
  "v",
  "z",
  "w",
  "q",
  "y",
  "x",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "-",
];

const replaced: Record<string, string> = {
  ā: "a",
  č: "c",
  ē: "e",
  ģ: "g",
  ī: "i",
  ķ: "k",
  ļ: "l",
  ņ: "n",
  š: "s",
  ū: "u",
  ž: "z",
};
