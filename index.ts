#!/usr/bin/env bun

import { Command } from "commander";
import { runwakeup } from "./tui/wakeup";

const program = new Command();

program.name("mrknight").description("my personal ai assistant").version("0.1");

program
  .command("wakeup")
  .description("Open the banner and pick cli or telegram mode")
  .action(async () => {
    await runwakeup();
  });

await program.parseAsync(process.argv);
