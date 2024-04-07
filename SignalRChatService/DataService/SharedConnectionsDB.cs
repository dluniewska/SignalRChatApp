using SignalRChatService.Models;
using System.Collections.Concurrent;

namespace SignalRChatService.DataService
{
    public class SharedConnectionsDB
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new ConcurrentDictionary<string, UserConnection>();

        public ConcurrentDictionary<string, UserConnection> Connections => _connections;
    }
}
