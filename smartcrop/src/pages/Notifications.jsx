import React, { useState } from 'react';

const NotificationPage = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message from John', timestamp: '2023-10-25T10:30:00', read: false },
    { id: 2, message: 'Reminder: Meeting at 2 PM', timestamp: '2023-10-24T14:00:00', read: true },
    { id: 3, message: 'Your order has been shipped', timestamp: '2023-10-23T09:15:00', read: false },
    { id: 4, message: 'New follower: Jane Doe', timestamp: '2023-10-22T18:45:00', read: true },
  ]);

  const [newNotification, setNewNotification] = useState('');

  // Mark notification as read/unread
  const toggleReadStatus = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Send new notification
  const sendNotification = () => {
    if (newNotification.trim() === '') return;
    const newNotif = {
      id: notifications.length + 1,
      message: newNotification,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications([newNotif, ...notifications]);
    setNewNotification('');
  };

  // Group notifications by date
  const groupNotificationsByDate = () => {
    const grouped = {};
    notifications.forEach((notification) => {
      const date = new Date(notification.timestamp).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(notification);
    });
    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Notifications</h1>

        {/* Send Notification Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Notification</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
              placeholder="Type your notification..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendNotification}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div>
          {Object.entries(groupedNotifications).map(([date, notifs]) => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{date}</h3>
              <ul className="space-y-2">
                {notifs.map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-4 rounded-lg ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleReadStatus(notification.id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          {notification.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;