import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001/";

export default class SocketClient {
    #socket = null;

    connect() {
        if (!this.#socket) {
            this.#socket = io(SOCKET_SERVER_URL);
            console.log(this.#socket);
        }
    }

    disconnect() {
        if (this.#socket) {
            this.#socket.disconnect();
            this.#socket = null;
        }
    }

    on(event, callback){
        if (this.#socket) {
            this.#socket.on(event, callback);
        }
    }

    off(event, callback){
        if (this.#socket) {
            this.#socket.off(event, callback);
        }
    }

    emit(event, data) {
        if (this.#socket) this.#socket.emit(event, data);
    }
}
