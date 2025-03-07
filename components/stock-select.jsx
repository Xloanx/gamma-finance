
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
                <SelectItem value="ExxonMobil(xom)">ExxonMobil</SelectItem>
                <SelectItem value="Chevron(cvx)">Chevron</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Materials</SelectLabel>
                <SelectItem value="Dow Inc.(dow)">Dow Inc.</SelectItem>
                <SelectItem value="DuPont de Nemours (DD)">DuPont de Nemours (DD)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Industrials</SelectLabel>
                <SelectItem value="Boeing (ba)">Boeing </SelectItem>
                <SelectItem value="Caterpillar(cat)">Caterpillar</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Consumer Discretionary</SelectLabel>
                <SelectItem value="Amazon(amzn)">Amazon</SelectItem>
                <SelectItem value="Tesla(tsla)"> Tesla </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Consumer Staples</SelectLabel>
                <SelectItem value="Procter & Gamble(pg)">Procter & Gamble</SelectItem>
                <SelectItem value="Coca-Cola(ko)">Coca-Cola</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Health Care</SelectLabel>
                <SelectItem value="Johnson & Johnson(jnj)">Johnson & Johnson</SelectItem>
                <SelectItem value="Pfizer(pfe)">Pfizer</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Financials</SelectLabel>
                <SelectItem value="JPMorgan Chase(jpm)">JPMorgan Chase</SelectItem>
                <SelectItem value="Goldman Sachs(gs)">Goldman Sachs</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Information Technology</SelectLabel>
                <SelectItem value="Apple(aapl)">Apple</SelectItem>
                <SelectItem value="Microsoft(msft)">Microsoft</SelectItem>
                <SelectItem value="NVIDIA(nvda)">NVIDIA</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Communication Services</SelectLabel>
                <SelectItem value="Alphabet(GOOG)">Alphabet</SelectItem>
                <SelectItem value="Meta Platforms (meta)"> Meta Platforms </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Utilities</SelectLabel>
                <SelectItem value="Duke Energy(duk)">Duke Energy</SelectItem>
                <SelectItem value="NextEra Energy(nee)">NextEra Energy</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Real Estate</SelectLabel>
                <SelectItem value="American Tower Corporation(amt)">American Tower Corporation</SelectItem>
                <SelectItem value="Simon Property Group(spg)">Simon Property Group</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
     );
}
 
export default StockSelect;