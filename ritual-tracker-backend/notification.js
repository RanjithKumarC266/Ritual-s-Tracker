const cron = require('node-cron');
const Ritual = require('./models/Ritual');

const sendNotification = (ritual) => {
  console.log(`🔔 NOTIFICATION: Time to do "${ritual.title}"! Description: ${ritual.description}, Scheduled time: ${ritual.time}`);
};

const startNotificationScheduler = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const rituals = await Ritual.find();
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      rituals.forEach((ritual) => {
        if (ritual.time === currentTime && !ritual.completed) {
          sendNotification(ritual);
        }
      });
    } catch (err) {
      console.log('Scheduler error:', err);
    }
  });

  console.log('📅 Notification scheduler started!');
};

module.exports = { startNotificationScheduler };