import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Clock,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const stats = [
    {
      label: 'Active Services',
      value: '12',
      change: '+2 this month',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Successful Requests',
      value: '1,234',
      change: '+12% from last week',
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Failed Requests',
      value: '23',
      change: '-5% from last week',
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Pending Webhooks',
      value: '8',
      change: '3 in queue',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  const recentWebhooks = [
    {
      id: 1,
      service: 'Stripe',
      event: 'payment.succeeded',
      status: 'success',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      service: 'GitHub',
      event: 'push',
      status: 'success',
      timestamp: '15 minutes ago',
    },
    {
      id: 3,
      service: 'Slack',
      event: 'message',
      status: 'failed',
      timestamp: '1 hour ago',
    },
    {
      id: 4,
      service: 'Shopify',
      event: 'order.created',
      status: 'success',
      timestamp: '2 hours ago',
    },
  ]

  const recentFailures = [
    {
      id: 1,
      service: 'Slack',
      error: 'Connection timeout',
      timestamp: '1 hour ago',
      severity: 'high',
    },
    {
      id: 2,
      service: 'Mailchimp',
      error: 'Invalid API key',
      timestamp: '3 hours ago',
      severity: 'medium',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your integrations and webhooks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Webhooks */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Webhooks
            </h3>
            <Link
              to="/webhooks"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentWebhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      webhook.status === 'success'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {webhook.service}
                    </p>
                    <p className="text-xs text-gray-500">{webhook.event}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{webhook.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Failures */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Failures
            </h3>
            <Link
              to="/debug"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentFailures.map((failure) => (
              <div
                key={failure.id}
                className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {failure.service}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        failure.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {failure.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{failure.error}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {failure.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
