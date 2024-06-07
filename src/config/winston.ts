import * as winston from 'winston';
import { ecsFormat } from '@elastic/ecs-winston-format';
import { IDefaultMeta } from '../types/winston_interfaces';

const { combine, errors } = winston.format;

const tempDefaultMetaData: IDefaultMeta = {
  machineId: '',
  service: '',
  xIdempotentKey: '',
  xB3Traceid: '',
  xB3Spanid: '',
  origin: {
    fileName: '',
    line: '',
    functionName: '',
  }
};

const createdLogger = winston.createLogger({
  level: 'debug',
  defaultMeta: tempDefaultMetaData,
  format: combine(
    errors({ stack: true }),
    ecsFormat()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const InitialLogger = (defaultMeta: IDefaultMeta) => {
  tempDefaultMetaData.machineId = defaultMeta.machineId || tempDefaultMetaData.machineId;
  tempDefaultMetaData.service = defaultMeta.service || tempDefaultMetaData.service;

  tempDefaultMetaData.xIdempotentKey = defaultMeta.xIdempotentKey || tempDefaultMetaData.xIdempotentKey;
  tempDefaultMetaData.xB3Spanid = defaultMeta.xB3Spanid || tempDefaultMetaData.xB3Spanid;

  tempDefaultMetaData.xB3Traceid = defaultMeta.xB3Traceid || tempDefaultMetaData.xB3Traceid;
  tempDefaultMetaData.origin!.fileName = defaultMeta.origin!.fileName || tempDefaultMetaData.origin!.fileName;
  
  tempDefaultMetaData.origin!.line = defaultMeta.origin!.line || tempDefaultMetaData.origin!.line;
  tempDefaultMetaData.origin!.functionName = defaultMeta.origin!.functionName || tempDefaultMetaData.origin!.functionName;

  return createdLogger;
};

export { createdLogger, InitialLogger };
