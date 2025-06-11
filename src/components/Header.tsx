import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const getBreadcrumbs = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return null;
    }
    
    if (path === '/insights') {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">Inzichten</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }
    
    if (path.startsWith('/theme/')) {
      const slug = path.split('/')[2];
      const themeNames: { [key: string]: string } = {
        'woningmarkt': 'Woningmarkt',
        'klimaat': 'Klimaat',
        'onderwijs': 'Onderwijs',
        'zorg': 'Zorg',
        'immigratie': 'Immigratie',
        'economie': 'Economie',
        'veiligheid': 'Veiligheid',
        'europa': 'Europa'
      };
      
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">{themeNames[slug] || 'Thema'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    }
    
    return null;
  };

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          {/* Title - enhanced with subtle gradient */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent text-center md:text-left">
            Waar staan partijen voor?
          </h1>
          
          {/* Navigation controls - enhanced hover states */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Terug
              </Button>
            )}
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} hover:bg-primary/10 hover:text-primary transition-all duration-300`} 
                    asChild
                  >
                    <Link to="/">
                      Thema's
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} hover:bg-primary/10 hover:text-primary transition-all duration-300`} 
                    asChild
                  >
                    <Link to="/insights">
                      Inzichten
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Admin access button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
              title="Admin Panel"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {getBreadcrumbs() && (
          <div className="mt-3">
            {getBreadcrumbs()}
          </div>
        )}
      </div>
    </header>
  );
};
