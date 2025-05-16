import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let nbSaboteurs = 0;
let nbDecollage = 0;


wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);

    if(data == "spawn_saboteur") {
      nbSaboteurs++;
      console.log("nbSaboteurs: ", nbSaboteurs);
      ws.send("spawn_saboteur,"+nbSaboteurs);
    }

    if(data == "close_saboteur"){
      nbSaboteurs--;
      console.log("nbSaboteurs: ", nbSaboteurs);
      ws.send("close_saboteur,"+nbSaboteurs);
    }

    if(data == "spawn_decollage") {
      nbDecollage++;
      console.log("nbDecollage: ", nbDecollage);
      ws.send("spawn_decollage,"+nbDecollage);
    }

    if(data == "close_decollage"){
      nbDecollage--;
      console.log("nbDecollage: ", nbDecollage);
      ws.send("close_decollage,"+nbDecollage);
    }



    broadcast(data);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});

function broadcast(msg) {
  for (const client of wss.clients) {
    client.send(msg);
  }
}
