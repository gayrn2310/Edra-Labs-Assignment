import express from 'express';
import routes from './routes/routes.js';
import cron from 'node-cron';
import { aliasToURL, longURLToURLInfo, aliasAnalytics } from './mappings.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/url', routes);

cron.schedule('* * * * *', () => {
    //delete expired aliases every minute
    const currentTime = new Date();
    for (const alias in aliasToURL) {
        const data = aliasToURL[alias];
        if (currentTime - new Date(data.createdAt) > data.ttl) {
            const long_url = data.long_url;
            delete aliasToURL[alias];
            delete longURLToURLInfo[long_url];
            delete aliasAnalytics[alias];
            console.log(`Deleted expired alias: ${alias}`);
        }
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});