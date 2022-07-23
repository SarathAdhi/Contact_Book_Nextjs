import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { supabaseClient } from "../../../utils/supabaseClient";
import { useRouter } from "next/router";
import { storage } from "../../../utils/storage";
import axios, { AxiosResponse } from "../../../lib/axios";

export const SideBar = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const isValidId = async () => {
    const id = storage.getToken("token");
    const { error }: AxiosResponse = await axios.post("/profile", {
      id,
    });

    if (error) {
      storage.clearToken("token");
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
    const id = storage.getToken("token") || null;

    if (!id) router.replace("/auth/login");
    else isValidId();
  }, []);

  return (
    <>
      <button
        type="button"
        className="bg-white-300 fixed flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none "
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Close sidebar</span>
        <MenuIcon className="w-6 h-6 text-gray-500" aria-hidden="true" />
      </button>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex "
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col flex-1 w-full max-w-xs">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-5">
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="w-64 p-5 bg-white gap-5 flex flex-col items-center fixed inset-y-0 flex-1 rounded-r-xl">
                <div className="flex gap-2 flex-col items-center">
                  <div className="flex items-center gap-2 p-2 border-2 border-[#ff0062] rounded-lg">
                    <img
                      className="mx-auto h-8 w-auto"
                      src="/logo.png"
                      alt="SupaBook"
                    />
                    <h1 className="text-2xl font-bold ">SupaBook</h1>
                  </div>
                  <p className="text-center font-semibold">
                    Create and store all your contacts here.
                  </p>
                </div>
                <button
                  onClick={() => {
                    storage.clearToken("token");
                    router.replace("/auth/login");
                  }}
                  className="bg-red-500 text-white font-semibold px-3 py-1 rounded-md duration-300 hover:rounded-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
