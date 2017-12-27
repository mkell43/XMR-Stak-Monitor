/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

export interface IXmrStakError{
  "count":number,
  "last_seen":number,
  "text":"string"
}

export interface IXmrStakHashRate
  {  
    "threads": Array<Array<number>>,
    "total":Array<number>,
    "highest":number
 }

export interface IXmrStakResults{
  "diff_current":number,
  "shares_good":number,
  "shares_total":number,
  "avg_time":number,
  "hashes_total":number,
  "best":Array<number>,
  "error_log":Array<IXmrStakError>
 }

 export interface IXmrStakConnection{
  "pool":string,
  "uptime":number,
  "ping":number,
  "error_log":Array<IXmrStakError>,
  "uptimeToString":string
}

export interface IXmrStakApiResponse {
    "result":string,
    "minerName":string,
    data:{
      "version":string
      "hashrate":IXmrStakHashRate,
      "results":IXmrStakResults,
      "connection":IXmrStakConnection
    }
 }
