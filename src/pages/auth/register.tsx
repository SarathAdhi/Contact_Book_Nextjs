import { LockClosedIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LinkedItem from "../../common/components/elements/LinkedItem";
import PageLayout from "../../common/layouts/PageLayout";
import axios, { AxiosResponse } from "../../lib/axios";
import RegisterForm from "../../modules/Auth/RegisterForm";
import { showErrorAlert } from "../../utils/alert";
import { storage } from "../../utils/storage";
import { supabaseClient } from "../../utils/supabaseClient";
import { showSuccessToast } from "../../utils/toast";

const register = () => {
  const router = useRouter();

  useEffect(() => {
    if (storage.getToken("token")) router.replace("/");
  }, []);

  return (
    <PageLayout title="Register" showNavbar={false} className="pt-20">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register a new account
            </h2>
          </div>

          <RegisterForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default register;
