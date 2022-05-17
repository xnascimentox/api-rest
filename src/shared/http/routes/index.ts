import { Router } from "express";

const routes = Router ();

routes.get('/', (request, resonse) => {
  return resonse.json({ message: 'GO GO GO!!!'})
});

export default routes;
