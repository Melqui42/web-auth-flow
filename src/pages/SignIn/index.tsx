import { z } from 'zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { AxiosError } from 'axios'
import classNames from 'classnames'
import axios from '../../axiosConfig'

import Alert from '../../components/Alert'
import Field from '../../components/Field'
import Form from '../../components/Form'
import { authSchema } from '../../schemas/userSchema'
import Icon from '../../utils/iconImport'

type FormProps = z.infer<typeof authSchema>

const SignIn: React.FC = () => {
  const [remember, setRemember] = useState<boolean>(false)
  const [security, setSecurity] = useState<boolean>(false)

  const [alert, setAlert] = useState<[boolean, string]>([false, ''])
  const [duration, setDuration] = useState<boolean>(false)

  const navigate = useNavigate()

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormProps>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = async (data: FormProps) => {
    try {
      const request = await axios.post('/signin', {
        email: data.email,
        password: data.password,
        remember,
      })

      if (request.data.status === 'success') {
        setAlert([true, request.data.message])
      }

      localStorage.setItem('accessToken', request.data.details.token)

      setTimeout(() => {
        reset()
        navigate('/signup')
      }, 3000)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        if (err.response.data.status === 'error') {
          setAlert([false, err.response.data.message])
        }
      }
    }

    setDuration(true)

    setTimeout(() => {
      setDuration(false)
    }, 2500)
  }

  return (
    <div className="w-full relative h-screen flex items-center justify-center">
      <Alert type={alert[0]} toggle={duration} message={alert[1]} />
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Header.Root>
          <Form.Header.Title>Seja bem-vindo de volta</Form.Header.Title>
          <Form.Header.Description>
            Ei, insira seus dados para fazer login em sua conta.
          </Form.Header.Description>
        </Form.Header.Root>
        <Form.Content>
          <Field.Root errorMessage={errors.email?.message}>
            <Field.Input
              {...register('email')}
              type="email"
              placeholder="Insira seu e-mail"
            />
          </Field.Root>
          <Field.Root errorMessage={errors.password?.message}>
            <Field.Input
              {...register('password')}
              type={security ? 'text' : 'password'}
              placeholder="Insira sua senha"
            />
            <Field.Action
              toggle={security}
              onClick={() => setSecurity(!security)}
            />
          </Field.Root>
        </Form.Content>
        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRemember(!remember)}
            className="flex gap-2 text-sm text-[#6f6f6f] "
          >
            <div
              className={classNames(
                'w-[20px] h-[20px] rounded-md relative border border-[#6f6f6f]',
                {
                  'bg-blue-500': remember,
                },
              )}
            >
              {!remember ? (
                ''
              ) : (
                <Icon.Fa.FaCheck className="absolute top-[2px] left-[2px] text-md text-white" />
              )}
            </div>
            Lembrar-me
          </button>
          <Link
            to="/recover-password"
            className="text-sm text-[#6f6f6f] hover:text-[#2d2d2d] underline transition-colors duration-500"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Form.Action>ENTRAR</Form.Action>
        <div className="w-full flex items-center justify-center gap-2 text-sm text-[#6f6f6f]">
          <div className="w-8 h-px bg-[#6f6f6f]"></div>Ou cadastre-se com
          <div className="w-8 h-px bg-[#6f6f6f]"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-4 h-10 text-sm font-medium text-[#6f6f6f] border border-[#9B9A9A] shadow-gray rounded-lg">
          <img
            src={require('../../assets/google.png')}
            alt=""
            className="w-5"
          />
          Cadastre-se com Google
        </button>
        <Link to="/signup" className="text-sm text-[#6f6f6f]">
          Ainda não tem uma conta?{' '}
          <span className="font-bold hover:text-[#2d2d2d] underline transition-colors duration-500">
            Criar a minha conta.
          </span>
        </Link>
      </Form.Root>
    </div>
  )
}

export default SignIn
