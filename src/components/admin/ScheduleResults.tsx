
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultForm from "./ResultForm";
import { useGameManagement } from "./GameManagementContext";

const ResultUpdate = () => {
  const { results, handleEdit, handleDelete } = useGameManagement();

  return (
    <div className="space-y-8">
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Update Game Results</CardTitle>
          <CardDescription>
            Add or update game results directly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResultForm />
        </CardContent>
      </Card>
      
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>Recent Results</CardTitle>
          <CardDescription>
            View and manage recent game results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-black/30">
                <TableHead className="text-white font-semibold">Game</TableHead>
                <TableHead className="text-white font-semibold">Date</TableHead>
                <TableHead className="text-white font-semibold">Result</TableHead>
                <TableHead className="text-white font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="border-b border-white/10">
                  <TableCell className="text-gray-400">{result.gameId}</TableCell>
                  <TableCell className="text-gray-400">{result.date}</TableCell>
                  <TableCell>
                    <span className="text-gold font-semibold">{result.value}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(result)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(result.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultUpdate;
