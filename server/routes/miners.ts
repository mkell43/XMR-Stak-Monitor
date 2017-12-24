import { Request, Response, Router } from "express";
import { miners } from "../minersconfig";
var request = require("request");

const minersRouter: Router = Router();

minersRouter.get("/get", (req: Request, res: Response) => {
  //This removes the username/password information, in case this server is exposed to the wider interwebs
  var _miners = {
    miners:miners.miners.map((miner) => {
      return {
        name: miner.name,
        url: miner.url
      }
    })
  };

  return res.json(_miners);
});

minersRouter.get("/getApiResult", (req:Request, res: Response) => {
  if(req.query.name){
    var server = miners.miners.filter((item) => item.name == req.query.name)[0];
    var url = server.url;
    if(server.username && server.password){
      url = `http://${server.username}:${server.password}@${server.url.replace("http://", "")}`;
    }
    url += "/api.json";
    request({
      "url":url,
      "method":"GET"
    }, (error:any, response:Response, data:any)=>{
        return res.json(JSON.parse(data));
    })

  }
})

export { minersRouter };
