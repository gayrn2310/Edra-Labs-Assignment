import {aliasToURL , longURLToURLInfo, aliasAnalytics} from '../mappings.js';

export async function getAlias(req, res) {
  try {
    const alias = req.params.alias;
    const data = aliasToURL[alias];
    if (!data) {
      return res.status(404).json({ error: 'Alias not found' });
    }

    if (!aliasAnalytics[alias]) {
      aliasAnalytics[alias] = { count: 0, timestamps: [] };
    }
    aliasAnalytics[alias].count += 1;
    aliasAnalytics[alias].timestamps.push(new Date());
    aliasAnalytics[alias].long_url = data.long_url;
    aliasAnalytics[alias].alias = alias;

    const currentTime = new Date();
    // if (currentTime - new Date(data.createdAt) > data.ttl) {
    //   delete aliasToURL[alias];
    //   delete longURLToURLInfo[data.long_url];
    //   delete aliasAnalytics[alias];
    //   return res.status(410).json({ error: 'Alias has expired' });
    // }

    res.status(302).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
