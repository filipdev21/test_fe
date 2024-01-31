import React, { ChangeEvent, FormEvent, useState, useContext } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from '@material-tailwind/react';
import { login } from '@services';
import { AuthContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleSetToken, handleSetUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const { data } = await login({ email });
    handleSetToken(data.data.token);
    handleSetUser(data.data.user);
    navigate('/');
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleLogin}>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              type="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Log In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
