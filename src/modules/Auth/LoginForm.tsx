import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LinkedItem from "../../common/components/elements/LinkedItem";
import axios, { AxiosResponse } from "../../lib/axios";
import { showErrorAlert } from "../../utils/alert";
import { storage } from "../../utils/storage";
import { showSuccessToast } from "../../utils/toast";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { error, message, data }: AxiosResponse = await axios.post(
      "/auth/login",
      {
        email,
        password,
      }
    );
    if (error) {
      showErrorAlert(error, message);
      return;
    }

    storage.setToken("token", data.id);
    router.replace("/");
    showSuccessToast(message);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-1">
        <label className="text-sm">New user?</label>
        <LinkedItem
          href="/auth/register"
          className="text-sm text-blue-700 underline font-semibold"
        >
          Create new account
        </LinkedItem>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 duration-300 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
