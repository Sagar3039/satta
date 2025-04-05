
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { GameManagementProvider } from "../../context/GameManagementContext";
import ResultForm from "./ResultForm";
import BulkUpload from "./BulkUpload";
import ResultsTable from "./ResultsTable";

const GameManagement = () => {
  return (
    <GameManagementProvider>
      <div className="space-y-8">
        <Card className="bg-black/40 border border-white/10">
          <CardHeader>
            <CardTitle>
              Add New Result
            </CardTitle>
            <CardDescription>
              Enter game result information to add to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultForm />
            <BulkUpload />
          </CardContent>
        </Card>
        
        <Card className="bg-black/40 border border-white/10">
          <CardHeader>
            <CardTitle>Recent Game Results</CardTitle>
            <CardDescription>
              View and manage recently added game results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultsTable />
          </CardContent>
        </Card>
      </div>
    </GameManagementProvider>
  );
};

export default GameManagement;
