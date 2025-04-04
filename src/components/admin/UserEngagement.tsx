
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, LineChart } from "@/components/ui/chart";

// Mock analytics data
const visitorData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Page Views",
      data: [2500, 3200, 2800, 4100],
      backgroundColor: "rgba(212, 175, 55, 0.5)",
      borderColor: "rgb(212, 175, 55)",
      borderWidth: 2,
    },
  ],
};

const gameInterestData = {
  labels: ["Delhi Bazar", "Shree Ganes", "Faridabad", "Lucky Seven", "Gaziyabad", "Gali", "Desawar"],
  datasets: [
    {
      label: "Interest Level",
      data: [85, 72, 90, 65, 78, 83, 95],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
        "rgba(212, 175, 55, 0.7)",
      ],
      borderWidth: 1,
    },
  ],
};

const UserEngagement = () => {
  return (
    <div className="space-y-8">
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle>User Analytics Overview</CardTitle>
          <CardDescription>
            View site traffic and user engagement metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Total Visitors</p>
                  <h3 className="text-3xl font-bold text-white">12,547</h3>
                  <p className="text-green-500 text-sm">↑ 18% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Avg. Session Duration</p>
                  <h3 className="text-3xl font-bold text-white">4:32</h3>
                  <p className="text-green-500 text-sm">↑ 5% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border border-white/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-gray-400">Bounce Rate</p>
                  <h3 className="text-3xl font-bold text-white">32%</h3>
                  <p className="text-red-500 text-sm">↑ 3% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-80 mb-8">
            <h3 className="text-xl font-semibold mb-4">Site Traffic Trend</h3>
            <LineChart data={visitorData} />
          </div>
          
          <div className="h-80">
            <h3 className="text-xl font-semibold mb-4">Game Interest Distribution</h3>
            <BarChart data={gameInterestData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEngagement;
