/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Input, Loading } from "components/UI";
import { useStore } from "hooks";
import { LoginData } from "types";

export const Login: React.FC = observer(() => {
  const { login, status } = useStore((store) => store.userStore);

  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <div className="flex flex-col items-center gap-4 pt-40">
      <h2 className="text-2xl font-semibold">Login</h2>
      <div className="w-full max-w-md overflow-hidden rounded-2xl py-6 px-8 shadow-xl">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={status === "loading"} type="dots">
              Log In
            </Loading>
          </button>
        </form>
      </div>
      <Link to="/register" className="link-hover link">
        Don&apos;t have an account?
      </Link>
    </div>
  );
});
