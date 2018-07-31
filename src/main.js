import { server } from './config/index';
import Server from './libs/Server/Server';

let gossip_server = new Server(server);
gossip_server.run();
