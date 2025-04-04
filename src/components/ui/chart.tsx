
import React from 'react';

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
}

export const BarChart: React.FC<ChartProps> = ({ data }) => {
  // In a real app, this would use a charting library like recharts
  // This is a simplified mock component for demonstration
  
  return (
    <div className="relative h-full w-full flex items-end">
      {data.labels.map((label, idx) => {
        const value = data.datasets[0].data[idx];
        const maxValue = Math.max(...data.datasets[0].data);
        const height = (value / maxValue) * 100;
        const bgColor = Array.isArray(data.datasets[0].backgroundColor) 
          ? data.datasets[0].backgroundColor[idx] 
          : data.datasets[0].backgroundColor;
        
        return (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div 
              className="w-4/5 rounded-t-md" 
              style={{ 
                height: `${height}%`, 
                backgroundColor: bgColor,
              }}
            />
            <div className="mt-2 text-xs text-gray-400 text-center">{label}</div>
            <div className="text-white font-semibold">{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export const LineChart: React.FC<ChartProps> = ({ data }) => {
  // In a real app, this would use a charting library like recharts
  // This is a simplified mock component for demonstration
  
  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="flex-1 border-b border-l border-white/10 relative">
        <div className="absolute inset-0 flex items-end">
          {data.labels.map((label, idx) => {
            const value = data.datasets[0].data[idx];
            const maxValue = Math.max(...data.datasets[0].data);
            const height = (value / maxValue) * 100;
            
            return (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="w-full h-full relative">
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: data.datasets[0].borderColor,
                      bottom: `${height}%`,
                    }}
                  />
                  {idx > 0 && (
                    <div 
                      className="absolute bottom-0 right-1/2 w-full h-0.5"
                      style={{ 
                        backgroundColor: data.datasets[0].borderColor,
                        bottom: `${height}%`,
                        transform: `rotate(${Math.atan2(
                          (data.datasets[0].data[idx] - data.datasets[0].data[idx-1]) / maxValue * 100, 
                          100 / data.labels.length
                        )}rad)`,
                        transformOrigin: 'right bottom',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex">
        {data.labels.map((label) => (
          <div key={label} className="flex-1 text-center text-xs text-gray-400 mt-2">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
