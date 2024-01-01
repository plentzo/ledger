import Button from '@mui/material/Button';
import { createTheme } from '@mui/system';
import React, { useEffect, useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage("Hello I'm from React World");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  const [age, setAge] = useState(20);

  return (
    <main>
      <Button variant="outlined">Hello</Button>
    </main>
  );
}

export default App;
