
const getLineOfCode = (): {
    fileName: string,
    lineOfCode: string,
    functionName: string,
} => {
    const getErrorObject = (): Array<any> => {
        try {
            throw Error('');
        } catch (err) {
            const stackLines = (err as Error).stack!.split("\n");
            return stackLines;
        }
    };

    const err: Array<any> = getErrorObject();
    const callerLine: string = err[5].toString();

    const extractFileAndCodeLine = callerLine.substring(callerLine.indexOf("(/")).replace(/[()]/g, '');
    const resultFileAndCodeLine = extractFileAndCodeLine.split('/').pop();
    const [fileName, lineOfCode, lineOfColumn] = resultFileAndCodeLine ? resultFileAndCodeLine.split(':') : ['', '', ''];

    const extractFuncName = callerLine.split(' ');
    const funcName = extractFuncName[extractFuncName.length - 2];

    return {
        fileName,
        lineOfCode: `${lineOfCode}:${lineOfColumn}`,
        functionName: funcName,
    };
};

export {getLineOfCode};
