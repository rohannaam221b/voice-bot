import { useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './components/pages/Dashboard'
import { ProjectOverview } from './components/pages/ProjectOverview'
import { SolutionArchitecture } from './components/pages/SolutionArchitecture'
import { FunctionalRequirements } from './components/pages/FunctionalRequirements'
import { CustomerWorkflow } from './components/pages/CustomerWorkflow'
import { Analytics } from './components/pages/Analytics'
import { SmartPaymentAssistant } from './components/pages/SmartPaymentAssistant'
import { Compliance } from './components/pages/Compliance'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const getPageTitle = (page: string) => {
    const titles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'overview': 'Project Overview',
      'architecture': 'Solution Architecture',
      'functional-requirements': 'Functional Requirements',
      'non-functional-requirements': 'Non-Functional Requirements',
      'requirements': 'Requirements',
      'workflow': 'Customer Workflow & Use Cases',
      'compliance': 'Compliance & Security',
      'analytics': 'Analytics & Benefits',
      'smart-payment': 'Smart Payment Assistant',
      'implementation': 'Implementation Plan',
      'documentation': 'Documentation',
      'support': 'Support & Help'
    }
    return titles[page] || 'Dashboard'
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'overview':
        return <ProjectOverview />
      case 'architecture':
        return <SolutionArchitecture />
      case 'functional-requirements':
      case 'non-functional-requirements':
      case 'requirements':
        return <FunctionalRequirements />
      case 'workflow':
        return <CustomerWorkflow />
      case 'analytics':
        return <Analytics />
      case 'smart-payment':
        return <SmartPaymentAssistant />
      case 'compliance':
        return <Compliance />
      case 'implementation':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Implementation Plan</h3>
              <p className="text-muted-foreground">
                Detailed implementation roadmap coming soon...
              </p>
            </div>
          </div>
        )
      case 'documentation':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Documentation</h3>
              <p className="text-muted-foreground">
                Technical documentation and user guides coming soon...
              </p>
            </div>
          </div>
        )
      case 'support':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Support & Help</h3>
              <p className="text-muted-foreground">
                Support resources and help documentation coming soon...
              </p>
            </div>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen bg-background overflow-hidden">
      <Header currentPage={getPageTitle(currentPage)} />
      
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}