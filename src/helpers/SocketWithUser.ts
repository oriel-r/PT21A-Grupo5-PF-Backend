import { Socket } from "socket.io";
import { AuthPayload } from "./AuthPayload";

export interface SockerWithUser extends Socket {
    user?: AuthPayload
}