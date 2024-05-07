import { z } from 'zod'

export const createSchema = z
  .object({
    name: z
      .string()
      .regex(/^[a-zA-Z]+\s[a-zA-Z]+$/, {
        message: 'Digite seu nome e sobrenome.',
      })
      .min(1, { message: 'Digite seu nome completo.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    password: z.string().min(8, { message: 'Senha deve ter 8 caracteres.' }),
    confirmPassword: z.string().min(8, {
      message: 'Confirmação da senha deve ter 8 caracteres.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const authSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(8, { message: 'Senha deve ter 8 caracteres.' }),
})

export const generatedCodeSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
})

export const verifyCodeSchema = z.object({
  camp1: z.string().min(1),
  camp2: z.string().min(1),
  camp3: z.string().min(1),
  camp4: z.string().min(1),
  camp5: z.string().min(1),
})

export const updatePasswordSchema = z
  .object({
    newPassword: z.string().min(8, { message: 'Senha deve ter 8 caracteres.' }),
    confirmNewPassword: z.string().min(8, {
      message: 'Confirmação da senha deve ter 8 caracteres.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmNewPassword'],
  })
