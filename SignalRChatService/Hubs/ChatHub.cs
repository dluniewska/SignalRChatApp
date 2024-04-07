using Microsoft.AspNetCore.SignalR;
using SignalRChatService.DataService;
using SignalRChatService.Models;

namespace SignalRChatService.Hubs
{
    public class ChatHub(SharedConnectionsDB connectionsDB) : Hub
    {
        private readonly SharedConnectionsDB _connectionsDB = connectionsDB;

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            _connectionsDB.Connections[Context.ConnectionId] = conn;

            await Clients.Group(conn.ChatRoom).SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined {conn.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            if(_connectionsDB.Connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.Username, msg);
            }
        }
    }
}
