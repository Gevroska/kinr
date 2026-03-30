import { KickChatServer } from '../../utils/chat/kickChatServer';
import ws from 'ws';

const kickChatServer = new KickChatServer();
export const wsServer = new ws.Server({ noServer: true });
kickChatServer.startWebSocketServer(wsServer);
