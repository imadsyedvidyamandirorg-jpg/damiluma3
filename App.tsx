import { useState } from "react";
import BootScreen from "./BootScreen";
import LoginScreen from "./LoginScreen";
import Desktop from "./Desktop";

function App() {
  const [step, setStep] = useState("boot");

  return (
    <>
      {step === "boot" && <BootScreen onFinish={() => setStep("login")} />}
      {step === "login" && <LoginScreen onLogin={() => setStep("desktop")} />}
      {step === "desktop" && <Desktop />}
    </>
  );
}

export default App;
