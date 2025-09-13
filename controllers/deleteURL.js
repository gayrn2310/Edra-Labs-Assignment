import {aliasToURL , longURLToURLInfo, aliasAnalytics} from '../mappings.js';

//delete the alias from all the mappings
export function deleteURL(req, res) {
  try {
    const alias = req.params.alias;
    const data = aliasToURL[alias];
    if (!data) {
      return res.status(404).json({ error: 'Alias not found' });
    }
    
    const long_url = data.long_url;
    const currentTime = new Date();

    // if (currentTime - new Date(data.createdAt) > data.ttl) {
    //   return res.status(410).json({ error: 'Alias has expired and associated data deleted' });
    // }

    delete aliasToURL[alias];
    delete longURLToURLInfo[long_url];
    delete aliasAnalytics[alias];

    res.status(200).json({ message: 'Alias and associated data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}