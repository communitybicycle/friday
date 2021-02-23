import Container from "components/layout/Container";
import React, { useEffect, useRef, useState } from "react";
import { hot } from "react-hot-loader";
import { XTerm } from "xterm-for-react";
// import { spawn } from "node-pty";

// const ptyProcess = spawn("powershell.exe", [], {
//   name: "xterm-color",
//   cols: 80,
//   rows: 30,
//   cwd: process.env.HOME,
//   env: process.env,
// });
//
// ptyProcess.on("data", function (data) {
//   process.stdout.write(data);
// });
//
// ptyProcess.write("ls\r");
// ptyProcess.resize(100, 40);
// ptyProcess.write("ls\r");

const Terminal: React.FC = () => {
  const [input, setInput] = useState("");
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (xtermRef.current) {
      xtermRef.current.terminal.writeln("Hello, world!");
    }
  }, []);

  return (
    <Container>
      <XTerm
        ref={xtermRef}
        onData={(data) => {
          const code = data.charCodeAt(0);
          // If the user hits empty and there is something typed echo it.
          if (code === 13 && input.length > 0) {
            xtermRef.current?.terminal.write(
              "\r\nYou typed: '" + input + "'\r\n"
            );
            xtermRef.current?.terminal.write("echo> ");
            setInput("");
          } else if (code < 32 || code === 127) {
            // Disable control Keys such as arrow keys
            return;
          } else {
            // Add general key press characters to the terminal
            xtermRef.current?.terminal.write(data);
            setInput(input + data);
          }
        }}
      />
    </Container>
  );
};

export default hot(module)(Terminal);
