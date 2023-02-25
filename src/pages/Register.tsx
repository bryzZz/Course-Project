/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Input, Loading } from "components/UI";
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
          <Input
            label="Email"
            type="email"
            {...register("email", { required: true })}
          />
          <Input
            label="Your Name"
            type="text"
            {...register("name", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            {...register("password", { required: true })}
          />
          <Input
            label="Repeat Password"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <button className="btn w-full rounded-full" type="submit">
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
