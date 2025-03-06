'use client';
import { useState, useEffect } from 'react';
import StockSelect from './stock-select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Mic } from "lucide-react";

const FinancialAdviceForm = () => {
    const [stockQuery, setStockQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [displayedResponse, setDisplayedResponse] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    let recognition;

    useEffect(() => {
        let index = 0;
        if (response) {
            const interval = setInterval(() => {
                setDisplayedResponse(response.substring(0, index));
                index++;
                if (index > response.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        } else {
            setDisplayedResponse('');
        }
    }, [response]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const handleAdviceRequest = () => {
        setResponse(`AI Response: Your advice for ${stockQuery}`);
    };

    const handleSpeech = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setStockQuery((prev) => prev + transcript);
        };

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return ( 
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Ask for Financial Advice</h2>
            <StockSelect/>
            <div className='flex flex-row my-4'>
                <Input 
                    placeholder="Enter your stock-related question..." 
                    value={stockQuery} 
                    onChange={(e) => setStockQuery(e.target.value)}
                />
                <Button variant="outline" onClick={handleSpeech}>
                    {isListening ? 'Listening...' : <Mic size={20} />}
                </Button>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-700 mb-4" onClick={handleAdviceRequest}>Submit</Button>
            {displayedResponse && (
                <Textarea 
                    className="mt-2" 
                    value={displayedResponse + (showCursor ? '|' : '')} 
                    readOnly 
                />
            )}
        </div>
    );
}

export default FinancialAdviceForm;
