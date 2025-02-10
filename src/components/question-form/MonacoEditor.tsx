
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MonacoEditor = ({ value, onChange }: MonacoEditorProps) => {
  const { theme } = useTheme();

  return (
    <Editor
      height="300px"
      defaultLanguage="markdown"
      theme={theme === "dark" ? "vs-dark" : "light"}
      value={value}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        lineNumbers: "off",
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        padding: { top: 8, bottom: 8 },
      }}
    />
  );
};

export default MonacoEditor;
