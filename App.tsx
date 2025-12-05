import React, { useState } from 'react';
import { SystemState } from './types';
import { BootScreen } from './components/BootScreen';
import { LoginScreen } from './components/LoginScreen';
import { Desktop } from './components/Desktop';

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