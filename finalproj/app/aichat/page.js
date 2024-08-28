'use client';
import { Box, Stack, Button, AppBar, Typography, Toolbar } from '@mui/material';
import { useState, useEffect, useRef} from "react";
import { TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');  // Redirect to homepage after logout
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;  
    setIsLoading(true);
    
    const userMessage = message;
    setMessage('');
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' },
    ]);

    try {
      const response = await fetch('/api/aichat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: userMessage }]),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "Sorry, something went wrong. Please try again." },
      ]);
    }
    setIsLoading(false);
  };

  return (

    <>
    <AppBar position="static" sx={{ bgcolor: '#171717' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ cursor: 'pointer', color: 'white' }}>
              My App
            </Typography>
          </Link>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ color: 'white', backgroundColor: 'rgba(0, 150, 255, 0.5)' }}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>

    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#171717"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="2px solid rgba(255, 255, 255, 0.2)"
        borderRadius="12px"
        p={2}
        spacing={3}
        bgcolor="rgba(23, 23, 23, 0.9)"
        boxShadow="0px 0px 15px rgba(255, 255, 255, 0.1)"
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          paddingRight="10px"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'rgba(0, 150, 255, 0.3)' 
                    : 'rgba(0, 255, 150, 0.3)' 
                }
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="80%"
                wordBreak="break-word"
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>

        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            InputProps={{
              style: {
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '10px',
                boxSizing: 'border-box',
                fontFamily: "'Poppins', sans-serif",
              },
              inputProps: {
                style: {
                  padding: '10px 14px',
                  lineHeight: '1.5',
                  fontFamily: "'Poppins', sans-serif",
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: "'Poppins', sans-serif",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            style={{
              backgroundColor: 'rgba(0, 150, 255, 0.5)',
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0px 0px 10px rgba(0, 150, 255, 0.5)',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
    </>
  );
}
