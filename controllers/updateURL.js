import {aliasToURL , longURLToURLInfo, aliasAnalytics} from '../mappings.js';

export function updateURL(req, res) {
  try {
    const alias = req.params.alias;
    const { custom_alias, ttl } = req.body;
    if (!aliasToURL[alias]) {
      return res.status(404).json({ error: 'Alias not found' });
    }
    if (custom_alias) {
        const currentTime = new Date();
        const data = aliasToURL[alias];
        // if (currentTime - new Date(data.createdAt) > data.ttl) {
        //   delete aliasToURL[alias];
        //   delete longURLToURLInfo[data.long_url];
        //   delete aliasAnalytics[alias];
        //   return res.status(410).json({ error: 'Alias has expired' });
        // }

      if (aliasToURL[custom_alias]) {
        return res.status(409).json({ error: 'Custom alias already in use' });
      }

      //update the alias in all the mappings
      aliasToURL[custom_alias] = { ...aliasToURL[alias], alias: custom_alias };
      delete aliasToURL[alias];

      const long_url = aliasToURL[custom_alias].long_url;
      longURLToURLInfo[long_url].alias = custom_alias;

      if (aliasAnalytics[alias]) {
        aliasAnalytics[custom_alias] = { ...aliasAnalytics[alias], alias: custom_alias };
        delete aliasAnalytics[alias];
      }
    }
    if (ttl) {
      aliasToURL[custom_alias].ttl = ttl;
    }   
    res.status(200).json(aliasToURL[custom_alias]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
