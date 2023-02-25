/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Loading } from "components/UI";
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="abc@mail.ru"
              className="input-bordered input w-full focus:border-primary focus:outline-none"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="12345678"
              className="input-bordered input w-full focus:border-primary focus:outline-none"
              {...register("password", { required: true })}
            />
          </div>
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
