// 📁 src/components/ResultsTable.tsx
import React from "react";
import { useGameManagement } from "@/context/GameManagementContext";
import { Button } from "@/components/ui/button";

const ResultsTable = () => {
  const { results, handleEdit, handleDelete } = useGameManagement();

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-white/10">
        <thead className="bg-white/10">
          <tr>
            <th className="border border-white/10 px-4 py-2 text-left">Game ID</th>
            <th className="border border-white/10 px-4 py-2 text-left">Date</th>
            <th className="border border-white/10 px-4 py-2 text-left">Value</th>
            <th className="border border-white/10 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-t border-white/10">
              <td className="border border-white/10 px-4 py-2">{result.gameId}</td>
              <td className="border border-white/10 px-4 py-2">{result.date}</td>
              <td className="border border-white/10 px-4 py-2">{result.value}</td>
              <td className="border border-white/10 px-4 py-2 space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(result)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(result.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {results.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center px-4 py-2">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
