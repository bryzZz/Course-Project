import React from "react";

import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Loading } from "components/UI";
import { useStore } from "hooks";
import { RegisterData } from "types";

interface RegisterForm extends RegisterData {
  confirmPassword: string;
}

export const Register: React.FC = observer(() => {
  const { userStore } = useStore();

  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = handleSubmit((data) => {
    if (data.password === data.confirmPassword) {
      userStore.register(data);
    }
  });

  return (
    <div className="flex flex-col items-center gap-4 pt-40">
      <h2 className="text-2xl font-semibold">Create your account</h2>
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
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
          />
          <input
            className="rounded-lg border border-base-content border-opacity-30 bg-transparent py-2 px-3 outline-none focus:border-opacity-100"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <input
            className="rounded-lg border border-base-content border-opacity-30 bg-transparent py-2 px-3 outline-none focus:border-opacity-100"
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <button
            className="flex h-12 items-center justify-center rounded-lg bg-base-content bg-opacity-[0.95] p-3 text-base-100 hover:bg-opacity-100"
            type="submit"
          >
            <Loading loading={userStore.status === "loading"} type="dots">
              Sign Up
            </Loading>
          </button>
        </form>
      </div>
      <Link to="/" className="link-hover link">
        Already have an account?
      </Link>
    </div>
  );
});
