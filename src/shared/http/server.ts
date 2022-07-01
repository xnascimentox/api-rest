import 'reflect-metadata';

import express, { NextFunction, Request, Response } from "express";

import 'express-async-errors';

import cors from 'cors';

import { errors }  from 'celebrate';

import routes from './routes';

import producRouter from '@modules/products/routes/products.routes'

import AppError from '@shared/errors/AppErro';

import '@shared/typeorm/';

import uploadConfig from '@config/upload';

const app = express ();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors)

app.use(
  (error: Error,request: Request,resonse: Response,next: NextFunction) =>{
    if ( error instanceof AppError) {

      return resonse.status(error.statusCode).json({

        status: 'error',

        message: error.message,
      });
    }
    console.log(error);

    return resonse.status(500).json({

      status: 'error',

      message: 'internal server error',
    });
   },

);
app.listen(5005,() =>{

  console.log('server online on port 5005');

});
