module Mysql2AdapterProxyFix
  def configure_connection
    @connection.query_options.merge!(as: :array)
  end
end
require 'active_record/connection_adapters/mysql2_adapter'
ActiveRecord::ConnectionAdapters::Mysql2Adapter.prepend Mysql2AdapterProxyFix
