import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PageLayout from "../../common/layouts/PageLayout";
import LoginForm from "../../modules/Auth/LoginForm";
import { storage } from "../../utils/storage";

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (storage.getToken("token")) router.replace("/");
  }, []);

  return (
    <PageLayout title="Login" showNavbar={false} className="pt-20">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="/logo.png"
              alt="SupaBook"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
