import { select, isCancel } from "@clack/prompts";
import chalk, { Chalk } from "chalk";
import figlet from "figlet";

const BANNER_FONT = "ASCI Shadow";
const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
  const lines = ascii.split("\n");
  const offsetX = 2;
  const offsetY = 1;
  const totalRows = lines.length + offsetY;

  for (let row = 0; row < totalRows; row++) {
    const faceLine = lines[row] ?? "";
    const shadowSourceRow = row - offsetY;
    const shadowLine =
      shadowSourceRow >= 0
        ? " ".repeat(offsetX) + (lines[shadowSourceRow] ?? "")
        : "";

    const maxLen = Math.max(faceLine.length, shadowLine.length);
    let combined = "";

    for (let col = 0; col < maxLen; col++) {
      const faceChar = faceLine[col] ?? " ";
      const shadowChar = shadowLine[col] ?? " ";

      if (faceChar !== " ") {
        combined += FACE(faceChar);
      } else if (shadowChar !== " ") {
        combined += SHADOW(shadowChar);
      } else {
        combined += " ";
      }
    }

    console.log(combined);
  }
}

export async function runwakeup() {
  let ascii: string;

  try {
    ascii = figlet.textSync("mrknight", { font: BANNER_FONT });
  } catch (error) {
    ascii = figlet.textSync("mrknight", { font: "Standard" });
  }
  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode you want to run it with?",
    options: [
      { value: "cli", label: "CLI" },
      { value: "telegram", label: "Telegram" },
      { value: "exit", label: "Exit" },
    ],
  });

  if (isCancel(mode) || mode === "exit") {
    console.log(chalk.dim("\n See you soon 👋\n"));
    return;
  }

  if (mode === "cli") {
    console.log(chalk.dim("Starting CLI mode..."));
    await runCliMode();
  } else if (mode === "telegram") {
    console.log(chalk.dim("Starting Telegram mode..."));
  }
}
