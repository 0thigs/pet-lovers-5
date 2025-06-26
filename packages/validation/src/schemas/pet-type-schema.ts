import { z } from 'zod'

export const petTypeSchema = z.enum(
  ['CACHORRO', 'GATO', 'PASSARO', 'ROEDOR', 'REPTIL', 'PEIXE'], 
  {required_error: 'Tipo de pet deve ser informado'}
)