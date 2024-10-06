import { TextInput } from "./components";
import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <TextInput
        name="first"
        label="First"
        value={value}
        disabled={false}
        error={{ className: "error", style: { color: "red" } }}
        placeholder="Placeholder"
        styles={{ backgroundColor: "red" }}
        onChange={(e) => {
          setValue(() => e.target.value);
        }}
        validations={{
          required: true,
          minLength: 5,
        }}
      />
    </>
  );
}

export default App;

type Props = {
  disabled?: boolean;
  validations?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
};
