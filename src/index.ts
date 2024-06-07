import { LogCallback } from 'winston';
import { createdLogger, InitialLogger } from './config/winston';
import { IDefaultMeta } from './types/winston_interfaces';
import { getLineOfCode } from './utils/get_line_utils';

enum ELogLevels {
  error,
  warn,
  info,
  debug,
}

const initLogger = (metaData: IDefaultMeta) => InitialLogger(metaData);

const main = (logLevel: ELogLevels, ...str: any[]) => {
  if (str?.length > 0) {
    const mappingStr = [];

    for (const itemStr of str) {
      let convertToString = '';
      try {
        if (itemStr instanceof Error) {
          return createdLogger.error(mappingStr.join(' - '), itemStr)
        }

        if (typeof itemStr !== 'string') {
          convertToString = JSON.stringify(itemStr);
        } else {
          convertToString = itemStr;
        }
      } catch (err) {
        return '';
      }
      mappingStr.push(convertToString);
    }

    const fullStr = mappingStr.join(' - ');

    const traceLog = getLineOfCode();

    initLogger({origin: {fileName: traceLog.fileName, functionName: traceLog.functionName, line: traceLog.lineOfCode}})

    switch (logLevel) {
      case ELogLevels.info: {
        return createdLogger.info(fullStr);
      }

      case ELogLevels.warn: {
        return createdLogger.warn(fullStr);
      }

      case ELogLevels.debug: {
        return createdLogger.debug(fullStr);
      }

      case ELogLevels.error: {
        return createdLogger.error(fullStr);
      }

      default: {
        return createdLogger.error(new Error('[Log level not found!]'))
      }
    }
  }
};

const logger = () => {};

logger.info = (...str: any[]) => {
  return main(ELogLevels.info, ...str);
};

logger.warn = (...str: any[]) => {
  return main(ELogLevels.warn, ...str);
};
logger.debug = (...str: any[]) => {
  return main(ELogLevels.debug, ...str);
};

logger.error = (...str: any[]) => {
  return main(ELogLevels.error, ...str);
};

export {initLogger, logger, ELogLevels};

