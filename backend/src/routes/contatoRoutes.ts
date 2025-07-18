import express from "express";
import { PrismaClient } from "@prisma/client";
import { ContatoRepository } from "../repositories/contatoRepository";
import { ContatoController } from "../controllers/contatoController";
import { validateRequestMiddleware } from "../middlewares/validateRequestMiddleware";
import { CreateContatoSchema, ReadContatosSchema } from "../dtos/contatoDto";
import { IdParamSchema } from "../dtos/baseDto";
import { jwtMiddleware } from "../middlewares/jwtMiddleware";
import { PessoaRepository } from "../repositories/pessoaRepository";

const router = express.Router();

const prismaClient = new PrismaClient();

const repository = new ContatoRepository(prismaClient);
const pessoaRepository = new PessoaRepository(prismaClient);
const controller = new ContatoController(repository, pessoaRepository);

router.post(
  "/",
  jwtMiddleware,
  validateRequestMiddleware(CreateContatoSchema, "body"),
  (req, res) => controller.create(req, res)
);
router.put(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  validateRequestMiddleware(CreateContatoSchema, "body"),
  (req, res) => controller.update(req, res)
);
router.get(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  (req, res) => controller.findById(req, res)
);
router.get(
  "/",
  jwtMiddleware,
  validateRequestMiddleware(ReadContatosSchema, "params"),
  async (req, res) => controller.findAll(req, res)
);
router.delete(
  "/:id",
  jwtMiddleware,
  validateRequestMiddleware(IdParamSchema, "params"),
  (req, res) => controller.delete(req, res)
);

export default router;
