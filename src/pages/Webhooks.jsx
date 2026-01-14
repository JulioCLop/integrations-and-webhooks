import { useState } from 'react'
import { 
  Filter, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Download,
  X
} from 'lucide-react'

const Webhooks = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const webhooks = [
    {
      id: 1,
      service: 'Stripe',
      event: 'payment.succeeded',
      status: 'success',
      timestamp: '2024-01-15 14:32:15',
      duration: '45ms',
      payload: { amount: 100, currency: 'usd' },
    },
    {
      id: 2,
      service: 'GitHub',
      event: 'push',
      status: 'success',
      timestamp: '2024-01-15 14:17:42',
      duration: '120ms',
      payload: { repo: 'my-repo', branch: 'main' },
    },
    {
      id: 3,
      service: 'Slack',
      event: 'message',
      status: 'failed',
      timestamp: '2024-01-15 13:45:23',
      duration: '5000ms',
      error: 'Connection timeout',
      payload: { channel: '#general', text: 'Hello' },
    },
    {
      id: 4,
      service: 'Shopify',
      event: 'order.created',
      status: 'success',
      timestamp: '2024-01-15 13:22:10',
      duration: '89ms',
      payload: { order_id: '12345', total: 299.99 },
    },
    {
      id: 5,
      service: 'Stripe',
      event: 'customer.subscription.created',
      status: 'success',
      timestamp: '2024-01-15 12:58:33',
      duration: '67ms',
      payload: { customer_id: 'cus_123', plan: 'pro' },
    },
    {
      id: 6,
      service: 'GitHub',
      event: 'pull_request',
      status: 'success',
      timestamp: '2024-01-15 12:35:18',
      duration: '95ms',
      payload: { pr_number: 42, action: 'opened' },
    },
    {
      id: 7,
      service: 'Mailchimp',
      event: 'subscribe',
      status: 'failed',
      timestamp: '2024-01-15 11:20:45',
      duration: '3000ms',
      error: 'Invalid API key',
      payload: { email: 'user@example.com' },
    },
    {
      id: 8,
      service: 'Zapier',
      event: 'task.completed',
      status: 'success',
      timestamp: '2024-01-15 10:15:30',
      duration: '234ms',
      payload: { task_id: 'task_789', status: 'done' },
    },
  ]

  const filteredWebhooks = webhooks.filter((webhook) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'success' && webhook.status === 'success') ||
      (filter === 'failed' && webhook.status === 'failed')
    const matchesSearch =
      webhook.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webhook.event.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const [selectedWebhook, setSelectedWebhook] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Webhooks</h2>
        <p className="text-gray-600 mt-1">
          Monitor and debug webhook events in real-time
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search webhooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Events</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Webhooks Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWebhooks.map((webhook) => (
                <tr
                  key={webhook.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {webhook.service}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{webhook.event}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        webhook.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {webhook.status === 'success' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      <span className="capitalize">{webhook.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{webhook.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{webhook.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedWebhook(webhook)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Webhook Detail Modal */}
      {selectedWebhook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Webhook Details
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedWebhook.service} - {selectedWebhook.event}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedWebhook(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Status Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`text-sm font-medium ${
                        selectedWebhook.status === 'success'
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}
                    >
                      {selectedWebhook.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedWebhook.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timestamp:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedWebhook.timestamp}
                    </span>
                  </div>
                  {selectedWebhook.error && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Error:</span>
                      <p className="text-sm text-red-600 mt-1">
                        {selectedWebhook.error}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Payload</h4>
                  <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                  {JSON.stringify(selectedWebhook.payload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Webhooks
