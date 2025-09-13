//import the in memory map from mappings.js
import {aliasToURL , longURLToURLInfo, aliasAnalytics} from '../mappings.js';

export async function shortenURL(req, res) {
  try {
    const { long_url, ttl, alias } = req.body;
    if (!long_url) {
      return res.status(400).json({ error: 'long_url is required' });
    }
    const urlAlias = alias || Math.random().toString(36).substring(2, 8);
    const defaultTTL = 2 * 60 * 1000;

    aliasToURL[urlAlias] = { long_url, ttl: ttl || defaultTTL, createdAt: new Date(), alias: urlAlias };
    longURLToURLInfo[long_url] = { alias: urlAlias, ttl: ttl || defaultTTL, createdAt: new Date() };

    res.status(201).json(aliasToURL[urlAlias]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}