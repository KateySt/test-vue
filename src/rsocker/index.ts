import Connection from "@/rsocker/connection/Connection";

export const WS_URL = 'ws://localhost:7000/rsocket'
export const WS = new Connection(WS_URL)