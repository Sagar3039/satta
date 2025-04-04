
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ResultData {
  date: string;
  value: string;
}

interface ResultTableProps {
  gameId: string;
  gameName: string;
  results: ResultData[];
}

const ResultTable = ({ gameId, gameName, results }: ResultTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-secondary/30">
      <Table>
        <TableHeader>
          <TableRow className="bg-black/30">
            <TableHead className="w-1/2 text-white font-semibold">Date</TableHead>
            <TableHead className="w-1/2 text-white font-semibold">Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow
              key={`${gameId}-${index}`}
              className={index % 2 === 0 ? 'bg-black/20' : 'bg-transparent'}
            >
              <TableCell className="text-gray-400">{result.date}</TableCell>
              <TableCell>
                <span className="text-gold font-semibold">{result.value}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultTable;
