
"use client";

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const StockSelect = ({onStockSelect}) => {
    const [selectedStock, setSelectedStock] = useState("");
    return ( 
        <Select onValueChange={onStockSelect}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a Stock of Interest" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Energy</SelectLabel>
                <SelectItem value="xom">ExxonMobil</SelectItem>
                <SelectItem value="cvx">Chevron</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Materials</SelectLabel>
                <SelectItem value="dow">Dow Inc.</SelectItem>
                <SelectItem value="dd">DuPont de Nemours (DD)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Industrials</SelectLabel>
                <SelectItem value="ba">Boeing </SelectItem>
                <SelectItem value="cat">Caterpillar</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Consumer Discretionary</SelectLabel>
                <SelectItem value="amzn">Amazon</SelectItem>
                <SelectItem value="tsla"> Tesla </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Consumer Staples</SelectLabel>
                <SelectItem value="pg">Procter & Gamble</SelectItem>
                <SelectItem value="ko">Coca-Cola</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Health Care</SelectLabel>
                <SelectItem value="jnj">Johnson & Johnson</SelectItem>
                <SelectItem value="pfe">Pfizer</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Financials</SelectLabel>
                <SelectItem value="jpm">JPMorgan Chase</SelectItem>
                <SelectItem value="gs">Goldman Sachs</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Information Technology</SelectLabel>
                <SelectItem value="aapl">Apple</SelectItem>
                <SelectItem value="msft">Microsoft</SelectItem>
                <SelectItem value="nvda">NVIDIA</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Communication Services</SelectLabel>
                <SelectItem value="goog">Alphabet</SelectItem>
                <SelectItem value="meta"> Meta Platforms </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Utilities</SelectLabel>
                <SelectItem value="duk">Duke Energy</SelectItem>
                <SelectItem value="nee">NextEra Energy</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Real Estate</SelectLabel>
                <SelectItem value="amt">American Tower Corporation</SelectItem>
                <SelectItem value="spg">Simon Property Group</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
     );
}
 
export default StockSelect;