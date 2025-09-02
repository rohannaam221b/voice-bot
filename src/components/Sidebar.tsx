import { useState } from 'react'
import {
  Home,
  FileText,
  Layers,
  CheckSquare,
  GitBranch,
  Shield,
  BarChart3,
  CreditCard,
  Settings,
  Folder,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu
} from 'lucide-react'
import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [requirementsOpen, setRequirementsOpen] = useState(false)

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'overview', label: 'Project Overview', icon: FileText },
    { id: 'architecture', label: 'Solution Architecture', icon: Layers },
    { 
      id: 'requirements', 
      label: 'Requirements', 
      icon: CheckSquare,
      hasSubmenu: true,
      submenu: [
        { id: 'functional-requirements', label: 'Functional Requirements' },
        { id: 'non-functional-requirements', label: 'Non-Functional Requirements' }
      ]
    },
    { id: 'workflow', label: 'Workflow & Use Cases', icon: GitBranch },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'analytics', label: 'Analytics & Benefits', icon: BarChart3 },
    { id: 'smart-payment', label: 'Smart Payment Assistant', icon: CreditCard },
    { id: 'implementation', label: 'Implementation', icon: Settings },
  ]

  const secondaryNavItems = [
    { id: 'documentation', label: 'Documentation', icon: Folder },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ]

  const NavItem = ({ item, isSubmenu = false }: { item: any, isSubmenu?: boolean }) => (
    <Button
      variant={currentPage === item.id ? 'secondary' : 'ghost'}
      className={`w-full justify-start h-10 px-3 ${isSubmenu ? 'ml-6 text-sm' : ''} ${
        currentPage === item.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      }`}
      onClick={() => onPageChange(item.id)}
    >
      {!isSubmenu && item.icon && <item.icon className="h-5 w-5 mr-3" />}
      {!isCollapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Button>
  )

  return (
    <div className={`bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <div key={item.id}>
              {item.hasSubmenu ? (
                <Collapsible
                  open={requirementsOpen}
                  onOpenChange={setRequirementsOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {!isCollapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{item.label}</span>
                          {requirementsOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  {!isCollapsed && (
                    <CollapsibleContent className="space-y-1 mt-1">
                      {item.submenu?.map((subItem) => (
                        <NavItem key={subItem.id} item={subItem} isSubmenu />
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ) : (
                <NavItem item={item} />
              )}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-sidebar-border my-4"></div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      </nav>
    </div>
  )
}