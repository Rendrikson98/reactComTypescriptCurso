import React, { useState, useEffect } from 'react';
import { Footer, Form, Input, LoginHeader } from '../../componentes';
import Styles from './login-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}: Props) => {
  const history = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      await saveAccessToken.save(account.accessToken);
      history('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
      console.log(state.mainError);
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <Link data-testid="signup" to={'/signup'} className={Styles.link}>
            Criar conta
          </Link>
          <Form />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
