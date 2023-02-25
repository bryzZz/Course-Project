/* eslint-disable jsx-a11y/label-has-associated-control */
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
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Dick"
              className="input-bordered input w-full focus:border-primary focus:outline-none"
              {...register("name", { required: true })}
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
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Repeat Password</span>
            </label>
            <input
              type="password"
              placeholder="12345678"
              className="input-bordered input w-full focus:border-primary focus:outline-none"
              {...register("confirmPassword", { required: true })}
            />
          </div>
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
