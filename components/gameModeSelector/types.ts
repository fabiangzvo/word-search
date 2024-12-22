export interface GameModeSelectorProps {
  mode: "words" | "questions";
  onModeChange: (mode: "words" | "questions") => void;
}
