import {aliasToURL , longURLToURLInfo, aliasAnalytics} from '../mappings.js';

export function getAnalytics(req, res) {
  try {
    const alias = req.params.alias;
    const analytics = aliasAnalytics[alias];
    const data = aliasToURL[alias];
   
    if (!analytics) {
      return res.status(404).json({ error: 'No analytics found for this alias' });
    }

    if (data) {
      const currentTime = new Date();
    //   if (currentTime - new Date(data.createdAt) > data.ttl) {
    //     delete aliasToURL[alias];
    //     delete longURLToURLInfo[data.long_url];
    //     delete aliasAnalytics[alias];
    //     return res.status(410).json({ error: 'Alias has expired' });
    //   }
    }

    if (!aliasToURL[alias]) {
      return res.status(404).json({ error: 'Alias not found' });
    }
    analytics.timestamps = analytics.timestamps.slice(-10);
    res.status(200).json(analytics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}