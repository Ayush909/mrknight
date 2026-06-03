import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator";

// available cli modes
const cliModeOpts = [
  {
    value: "agent",
    label: "Agent Mode",
  },
  {
    value: "plan",
    label: "Plan Mode",
  },
  {
    value: "ask",
    label: "Ask Mode",
  },
  {
    value: "back",
    label: " ack to main menu",
  },
];

export async function runCliMode() {
  while (true) {
    const mode = await select({
      message: "Choose CLI sub-mode",
      options: cliModeOpts,
    });

    if (isCancel(mode) || mode === "back") {
      return;
    }

    if (mode === "agent") {
      await runAgentMode();
    } else if (mode === "plan") {
    } else if (mode === "ask") {
    }

    if (!cliModeOpts.some((m) => m.value === mode)) {
      console.log(chalk.yellow("\n This mode is not available yet. \n"));
    }
  }
}
