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
          <input
            className="rounded-lg border border-base-content border-opacity-30 bg-transparent py-2 px-3 outline-none focus:border-opacity-100"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <input
            className="rounded-lg border border-base-content border-opacity-30 bg-transparent py-2 px-3 outline-none focus:border-opacity-100"
            placeholder="Password"
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
