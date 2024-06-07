
export interface IDefaultMeta {
  service?: string;
  machineId?: string;
  xIdempotentKey?: string;
  xB3Spanid?: string;
  xB3Traceid?: string;
  origin?: {
    fileName: string,
    line: string,
    functionName: string,
  }
}
