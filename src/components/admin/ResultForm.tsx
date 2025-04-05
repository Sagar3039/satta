import React, { useState, useEffect } from "react";
import { useGameManagement } from "@/context/GameManagementContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DEFAULT_GAMES = [
  "Delhi bazar",
  "Shree ganesh",
  "Faridabad",
  "Lucky seven",
  "Gaziyabad",
  "Gali ",
  "Desawar",
];

const ResultForm = () => {
  const { handleAddResult, editingResult, handleClearEditingResult } =
    useGameManagement();

  const [gameId, setGameId] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState("2");
  const [minute, setMinute] = useState("33");
  const [ampm, setAmpm] = useState("PM");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (editingResult) {
      setGameId(editingResult.gameId);
      const fullDate = new Date(editingResult.date);
      setDate(fullDate);

      let h = fullDate.getHours();
      let m = fullDate.getMinutes();
      setHour(String(h % 12 || 12));
      setMinute(String(m).padStart(2, "0"));
      setAmpm(h >= 12 ? "PM" : "AM");
      setValue(editingResult.value);
    }
  }, [editingResult]);

  const buildDateTime = (): Date | null => {
    if (!date) return null;
    const d = new Date(date);
    let h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    d.setHours(h, m);
    return d;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullDate = buildDateTime();
    if (!gameId || !fullDate || !value) return;

    handleAddResult(gameId, fullDate.toISOString(), value);
    setGameId("");
    setDate(null);
    setHour("2");
    setMinute("33");
    setAmpm("PM");
    setValue("");
    handleClearEditingResult();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="game">Select Game</Label>
        <select
          id="game"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          className="w-full p-2 bg-black/50 border border-white/10 rounded"
          required
        >
          <option value="" disabled>
            Select a game
          </option>
          {DEFAULT_GAMES.map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Date</Label>
        <DatePicker
          selected={date}
          onChange={(d: Date | null) => setDate(d)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
          className="w-full p-2 bg-black/50 border border-white/10 rounded"
          required
        />
      </div>

      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Label>Hour</Label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full p-2 bg-black/50 border border-white/10 rounded"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <Label>Minute</Label>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full p-2 bg-black/50 border border-white/10 rounded"
          >
            {Array.from({ length: 60 }, (_, i) =>
              String(i).padStart(2, "0")
            ).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <Label>AM / PM</Label>
          <select
            value={ampm}
            onChange={(e) => setAmpm(e.target.value)}
            className="w-full p-2 bg-black/50 border border-white/10 rounded"
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="value">Result Value</Label>
        <Input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>

      <Button type="submit">
        {editingResult ? "Update Result" : "Add Result"}
      </Button>
    </form>
  );
};

export default ResultForm;
