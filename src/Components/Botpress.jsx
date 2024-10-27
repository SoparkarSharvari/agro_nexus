import React, { useEffect } from 'react';

const BotpressChatbot = () => {
  useEffect(() => {
    // Ensure the Botpress webchat is initialized after the component mounts
    if (window.botpressWebChat) {
      window.botpressWebChat.init();
    }
  }, []);

  return null; // This component does not render anything itself
};

export default BotpressChatbot;
