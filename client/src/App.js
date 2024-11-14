import './App.css';
import {Box, Button} from '@mui/material'
import SocketClient from './socket-client';
import {useRef, useState, useEffect} from 'react';

function App() {
    const [counter, setCounter] = useState(0);
    const sc = useRef(new SocketClient());

    useEffect(() => {
        const socketClient = sc.current;
        socketClient.connect();

        return () => {
            socketClient.disconnect();
        };
    }, []);

    useEffect(() => {
        const socketClient = sc.current;
        const handleGetCounterValue = () => {
            socketClient.emit('setCounterValue', counter);
        };

        socketClient.on('getCounterValue', handleGetCounterValue);

        return () => {
            socketClient.off('getCounterValue', handleGetCounterValue);
        };
    }, [counter]);

    return (
        <div className="App">
            <h1>React Counter: {counter}</h1>
            <Box sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCounter(counter + 1)}
                >+</Button>
                <Button
                  variant="contained"
                  onClick={() => setCounter(counter - 1)}
                >-</Button>
            </Box>
        </div>
    );
}

export default App;
