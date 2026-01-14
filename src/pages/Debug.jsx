import { useState } from 'react'
import { 
  AlertCircle, 
  Search, 
  Filter,
  Clock,
  XCircle,
  CheckCircle2,
  RefreshCw,
  ExternalLink
} from 'lucide-react'

const Debug = () => {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const failures = [
    {
      id: 1,
      service: 'Slack',
      error: 'Connection timeout after 5 seconds',
      status: 'failed',
      severity: 'high',
      timestamp: '2024-01-15 13:45:23',
      retries: 3,
      lastAttempt: '2 minutes ago',
      endpoint: 'https://hooks.slack.com/services/...',
      stackTrace: 'Error: ETIMEDOUT\n    at Socket.socketConnectTimeout...',
    },
    {
      id: 2,
      service: 'Mailchimp',
      error: 'Invalid API key provided',
      status: 'failed',
      severity: 'high',
      timestamp: '2024-01-15 11:20:45',
      retries: 1,
      lastAttempt: '3 hours ago',
      endpoint: 'https://us1.api.mailchimp.com/3.0/...',
      stackTrace: 'Error: 401 Unauthorized\n    at Request.handleResponse...',
    },
    {
      id: 3,
      service: 'Stripe',
      error: 'Rate limit exceeded',
      status: 'warning',
      severity: 'medium',
      timestamp: '2024-01-15 10:15:30',
      retries: 2,
      lastAttempt: '5 hours ago',
      endpoint: 'https://api.stripe.com/v1/charges',
      stackTrace: 'Error: 429 Too Many Requests\n    at Request.handleResponse...',
    },
    {
      id: 4,
      service: 'GitHub',
      error: 'Webhook signature verification failed',
      status: 'failed',
      severity: 'medium',
      timestamp: '2024-01-15 09:30:12',
      retries: 0,
      lastAttempt: '6 hours ago',
      endpoint: 'https://api.github.com/webhooks',
      stackTrace: 'Error: Invalid signature\n    at verifySignature...',
    },
    {
      id: 5,
      service: 'Shopify',
      error: 'SSL certificate validation failed',
      status: 'failed',
      severity: 'high',
      timestamp: '2024-01-15 08:45:55',
      retries: 4,
      lastAttempt: '7 hours ago',
      endpoint: 'https://myshop.myshopify.com/admin/api/...',
      stackTrace: 'Error: CERT_HAS_EXPIRED\n    at TLSSocket.onConnectSecure...',
    },
    {
      id: 6,
      service: 'Zapier',
      error: 'Request body too large',
      status: 'warning',
      severity: 'low',
      timestamp: '2024-01-15 07:20:18',
      retries: 1,
      lastAttempt: '8 hours ago',
      endpoint: 'https://hooks.zapier.com/hooks/catch/...',
      stackTrace: 'Error: 413 Payload Too Large\n    at Request.handleResponse...',
    },
  ]

  const filteredFailures = failures.filter((failure) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'high' && failure.severity === 'high') ||
      (filter === 'medium' && failure.severity === 'medium') ||
      (filter === 'low' && failure.severity === 'low')
    const matchesSearch =
      failure.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      failure.error.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const [selectedFailure, setSelectedFailure] = useState(null)

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    return status === 'failed' ? (
      <XCircle className="h-5 w-5 text-red-600" />
    ) : (
      <AlertCircle className="h-5 w-5 text-yellow-600" />
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Debug & Failures</h2>
        <p className="text-gray-600 mt-1">
          Track and debug integration failures and errors
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Failures</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {failures.length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Severity</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {failures.filter((f) => f.severity === 'high').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retries Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {failures.filter((f) => f.retries > 0).length}
              </p>
            </div>
            <RefreshCw className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600 mt-1">0</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search failures..."
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
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Failures List */}
      <div className="space-y-4">
        {filteredFailures.map((failure) => (
          <div
            key={failure.id}
            className={`bg-white rounded-lg border-2 p-6 ${getSeverityColor(
              failure.severity
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">{getStatusIcon(failure.status)}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {failure.service}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(
                        failure.severity
                      )}`}
                    >
                      {failure.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{failure.error}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{failure.timestamp}</span>
                    </div>
                    <div>
                      <span className="font-medium">Retries:</span> {failure.retries}
                    </div>
                    <div>
                      <span className="font-medium">Last Attempt:</span>{' '}
                      {failure.lastAttempt}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setSelectedFailure(failure)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Details</span>
                </button>
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Failure Detail Modal */}
      {selectedFailure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Failure Details
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedFailure.service}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFailure(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Error Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Error:</span>
                    <span className="text-sm font-medium text-red-700">
                      {selectedFailure.error}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Severity:</span>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded ${getSeverityColor(
                        selectedFailure.severity
                      )}`}
                    >
                      {selectedFailure.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Retries:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedFailure.retries}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timestamp:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedFailure.timestamp}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Endpoint
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <code className="text-sm text-gray-900 break-all">
                    {selectedFailure.endpoint}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Stack Trace
                </h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                  {selectedFailure.stackTrace}
                </pre>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry Request</span>
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Debug
