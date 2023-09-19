/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Input, Loading } from "components/UI";
import { useUserStore } from "hooks";
import { RegisterData } from "types/api";

interface RegisterForm extends RegisterData {
  confirmPassword: string;
}

export const Register: React.FC = () => {
  const { registerUser, status } = useUserStore((state) => ({
    registerUser: state.register,
    status: state.status,
  }));

  const { register, handleSubmit } = useForm<RegisterForm>();

  const onSubmit = handleSubmit((data) => {
    if (data.password === data.confirmPassword) {
      registerUser(data);
    }
  });

  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-5 md:pt-32">
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <div className="w-full max-w-md overflow-hidden rounded-2xl py-6 px-8 shadow-xl">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="a@mail.ru"
            {...register("email", { required: true })}
          />
          <Input
            label="Your Name"
            type="text"
            placeholder="Nikolay"
            {...register("name", { required: true })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="******"
            {...register("password", { required: true })}
          />
          <Input
            label="Repeat Password"
            type="password"
            placeholder="******"
            {...register("confirmPassword", { required: true })}
          />
          <button className="btn w-full rounded-full" type="submit">
            <Loading loading={status === "loading"} type="dots">
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
};
