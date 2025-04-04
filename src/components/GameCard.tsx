
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp } from 'lucide-react';

interface GameCardProps {
  id: string;
  name: string;
  latestResult?: string;
  resultTime?: string;
  isLive?: boolean;
  popularity?: number;
}

const GameCard = ({ id, name, latestResult, resultTime, isLive = false, popularity = 0 }: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`bg-secondary/30 border border-white/5 transition-all duration-300 ${
        isHovered ? 'neon-border transform scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 relative">
        <h3 className={`text-xl font-bold ${isHovered ? 'neon-text' : 'text-white'}`}>
          {name}
        </h3>
        {isLive && (
          <Badge className="absolute top-3 right-6 bg-red-500 text-white animate-pulse">
            LIVE
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        {latestResult ? (
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-gray-400 text-sm mb-2">Latest Result</p>
            <span className="gold-text text-4xl font-bold">{latestResult}</span>
            {resultTime && (
              <div className="flex items-center mt-3 text-gray-400 text-xs">
                <Clock className="w-3 h-3 mr-1" />
                <span>{resultTime}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-400 text-sm">Results awaited</p>
          </div>
        )}
        
        {popularity > 0 && (
          <div className="flex items-center mt-2 text-gray-400 text-xs">
            <TrendingUp className="w-3 h-3 mr-1 text-neon-green" />
            <span>{popularity}% players active</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/games/${id}`} className="w-full">
          <Button 
            variant="outline" 
            className={`w-full border border-white/10 ${
              isHovered 
                ? 'bg-gold hover:bg-gold-light text-black' 
                : 'bg-secondary hover:bg-white/10 text-white'
            }`}
          >
            Record chart
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
