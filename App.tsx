import React, { useState } from 'react';
import { SystemState } from './types';
import BootScreen from "./BootScreen";
import LoginScreen from "./LoginScreen";
import Desktop from "./Desktop";

const App: React.FC = () => {
  const [state, setState] = useState<SystemState>(SystemState.BOOT);

  return (
    <>
      {state === SystemState.BOOT && (
        <BootScreen onComplete={() => setState(SystemState.LOGIN)} />
      )}
      
      {state === SystemState.LOGIN && (
        <LoginScreen onLogin={() => setState(SystemState.DESKTOP)} />
      )}
      
      {state === SystemState.DESKTOP && (
        <Desktop />
      )}
    </>
  );
};

export default App;
