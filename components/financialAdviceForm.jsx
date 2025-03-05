'use client';
import { useState } from 'react';
import StockSelect from './stock-select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const FinancialAdviceForm = () => {
    const [stockQuery, setStockQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleAdviceRequest = () => {
        setResponse(`AI Response: Your advice for ${stockQuery}`);
    };

    return ( 
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Ask for Financial Advice</h2>
            <StockSelect/>
            <Input 
                className="my-4" 
                placeholder="Enter your stock-related question..." 
                value={stockQuery} 
                onChange={(e) => setStockQuery(e.target.value)}
            />
            <Button className="bg-blue-500 hover:bg-blue-700 mb-4" onClick={handleAdviceRequest}>Submit</Button>
            {response && <Textarea className="mt-2" value={response} readOnly />}
        </div>
    );
}

export default FinancialAdviceForm;
