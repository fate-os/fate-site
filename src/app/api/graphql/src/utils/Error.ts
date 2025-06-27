import { NextResponse } from 'next/server';

export const ThrowError = (error: Error) => {
  process.on('uncaughtException', function (err) {
    console.log(err);
  });

  return {
    success: false,
    message: error.stack,
    // reason: error.message,
  };
};

export const HandleError = () => {
  process.on('uncaughtException', (error, origin) => {
    console.log('----- Uncaught exception -----');
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log('----- Unhandled Rejection at -----');
    console.log(promise);
    console.log('----- Reason -----');
    console.log(reason);
  });
};
