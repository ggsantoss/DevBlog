import express, { NextFunction, Response, Request} from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compresstion from 'compression';
import multer from 'multer';
import { Logger } from './middlewares/logger';
import { engine } from 'express-handlebars';
import { router } from './routes/postRouter';

import swaggerUI from 'swagger-ui-express';
import { routerUser } from './routes/userRouter';

const app = express();

import handlebars from 'handlebars';

handlebars.registerHelper('getJustDescription', (text, wordCount) => {
  const words = text.split(' ');
  return words.slice(0, wordCount).join(' ');
});

handlebars.registerHelper('basename', function (filePath) {
  return filePath.split('/').pop();
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.static('public'));

app.use(limiter);

app.use(Logger.log);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());

app.use(router);
app.use(routerUser);

app.use(compresstion());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render('404', {title: '404 Pagina não encontrada'})
})

const server = http.createServer(app);

export { server, app };
