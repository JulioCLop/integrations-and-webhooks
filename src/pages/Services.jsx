import { useState } from 'react'
import { 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Settings,
  Trash2,
  ExternalLink
} from 'lucide-react'

const Services = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Stripe',
      description: 'Payment processing and subscription management',
      status: 'connected',
      type: 'API',
      lastSync: '2 minutes ago',
      requests: 1234,
      successRate: 99.8,
    },
    {
      id: 2,
      name: 'GitHub',
      description: 'Version control and repository management',
      status: 'connected',
      type: 'Webhook',
      lastSync: '15 minutes ago',
      requests: 567,
      successRate: 98.5,
    },
    {
      id: 3,
      name: 'Slack',
      description: 'Team communication and notifications',
      status: 'error',
      type: 'API',
      lastSync: '1 hour ago',
      requests: 890,
      successRate: 95.2,
    },
    {
      id: 4,
      name: 'Shopify',
      description: 'E-commerce platform integration',
      status: 'connected',
      type: 'Webhook',
      lastSync: '30 minutes ago',
      requests: 234,
      successRate: 99.1,
    },
    {
      id: 5,
      name: 'Mailchimp',
      description: 'Email marketing automation',
      status: 'error',
      type: 'API',
      lastSync: '3 hours ago',
      requests: 456,
      successRate: 92.3,
    },
    {
      id: 6,
      name: 'Zapier',
      description: 'Workflow automation platform',
      status: 'connected',
      type: 'API',
      lastSync: '5 minutes ago',
      requests: 789,
      successRate: 97.8,
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-700'
      case 'error':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    return status === 'connected' ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : (
      <XCircle className="h-4 w-4" />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600 mt-1">
            Manage your API integrations and webhook connections
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    {service.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${getStatusColor(
                    service.status
                  )}`}
                >
                  {getStatusIcon(service.status)}
                  <span className="capitalize">{service.status}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm text-gray-900">{service.lastSync}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Requests</span>
                <span className="text-sm font-medium text-gray-900">
                  {service.requests.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-gray-900">
                  {service.successRate}%
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center space-x-1 text-sm text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1 text-sm text-primary-600 hover:text-primary-700 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                <ExternalLink className="h-4 w-4" />
                <span>View Logs</span>
              </button>
              <button className="text-gray-400 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Add New Service
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Stripe, GitHub, Slack"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>API</option>
                  <option>Webhook</option>
                  <option>Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key / Endpoint
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter API key or webhook URL"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services
