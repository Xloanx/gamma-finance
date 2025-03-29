"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StockSelector = ({ onStockSelect }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
      <label className="block font-semibold mb-2">Select a Stock:</label>
      <Select onValueChange={onStockSelect}>
        <SelectTrigger className="w-full md:w-[280px] border rounded px-3 py-2">
          <SelectValue placeholder="Select a Stock of Interest" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Energy</SelectLabel>
            <SelectItem value="XOM">ExxonMobil (XOM)</SelectItem>
            <SelectItem value="CVX">Chevron (CVX)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Materials</SelectLabel>
            <SelectItem value="DOW">Dow Inc. (DOW)</SelectItem>
            <SelectItem value="DD">DuPont (DD)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Industrials</SelectLabel>
            <SelectItem value="BA">Boeing (BA)</SelectItem>
            <SelectItem value="CAT">Caterpillar (CAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Consumer Discretionary</SelectLabel>
            <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
            <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Consumer Staples</SelectLabel>
            <SelectItem value="PG">Procter & Gamble (PG)</SelectItem>
            <SelectItem value="KO">Coca-Cola (KO)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Health Care</SelectLabel>
            <SelectItem value="JNJ">Johnson & Johnson (JNJ)</SelectItem>
            <SelectItem value="PFE">Pfizer (PFE)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Financials</SelectLabel>
            <SelectItem value="JPM">JPMorgan Chase (JPM)</SelectItem>
            <SelectItem value="GS">Goldman Sachs (GS)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Information Technology</SelectLabel>
            <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
            <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
            <SelectItem value="NVDA">NVIDIA (NVDA)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Communication Services</SelectLabel>
            <SelectItem value="GOOG">Alphabet (GOOG)</SelectItem>
            <SelectItem value="META">Meta (META)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Utilities</SelectLabel>
            <SelectItem value="DUK">Duke Energy (DUK)</SelectItem>
            <SelectItem value="NEE">NextEra Energy (NEE)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Real Estate</SelectLabel>
            <SelectItem value="AMT">American Tower (AMT)</SelectItem>
            <SelectItem value="SPG">Simon Property Group (SPG)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StockSelector;
