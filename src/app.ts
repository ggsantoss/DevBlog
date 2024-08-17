import { server } from './server';
import { PORT } from '../config.json';

server.listen(PORT, () => {
  console.log(`Running! PORT: ${PORT}`);
});
