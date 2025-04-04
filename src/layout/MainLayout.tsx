
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <div className="fixed bottom-4 right-4 z-50">
        <Link to="/admin">
          <Button variant="secondary" className="bg-black/70 border border-white/10 shadow-lg">
            <UserCog className="mr-2 h-4 w-4" />
            Admin
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
