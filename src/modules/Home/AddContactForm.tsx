import { UserAddIcon } from "@heroicons/react/solid";
import React from "react";
import SlideOver from "../../common/layouts/SlideOver";
import axios, { AxiosResponse } from "../../lib/axios";
import { UserDetails } from "../../pages";
import { storage } from "../../utils/storage";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

type Props = {
  isSildeOver: boolean;
  setIsSildeOver: (value: boolean) => void;
  userDetails: UserDetails;
  setUserDetails: (value: UserDetails) => void;
  setAllContactDetails: (value: UserDetails[]) => void;
};

const AddContactForm: React.FC<Props> = ({
  isSildeOver,
  setIsSildeOver,
  userDetails,
  setUserDetails,
  setAllContactDetails,
}) => {
  const addContact = async (e: any) => {
    e.preventDefault();
    const { error, message, data }: AxiosResponse = await axios.post(
      "/contact/add",
      {
        id: storage.getToken("token"),
        name: userDetails.name,
        number: userDetails.number,
      }
    );
    if (error) {
      showErrorToast(message, "bottom-start");
      return;
    }

    setUserDetails({ name: "", number: "" });
    setIsSildeOver(false);
    setAllContactDetails(data);
    showSuccessToast(message, "bottom-start");
  };

  return (
    <SlideOver
      title="Add Contacts"
      isOpen={isSildeOver}
      setIsOpen={setIsSildeOver}
    >
      <form
        onSubmit={addContact}
        className="mt-5 w-full rounded-md gap-5 flex flex-col items-center"
      >
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            name="contact-name"
            className="text-center bg-gray-200 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={userDetails.name}
            onChange={({ target }) =>
              setUserDetails({
                name: target.value,
                number: userDetails.number,
              })
            }
            placeholder="Contact Name"
            required
          />

          <input
            type="number"
            name="mobile-number"
            className="text-center bg-gray-200 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            value={userDetails.number}
            onChange={({ target }) => {
              if (target.value.length === 11 || target.value.length > 13) {
                showWarningToast("Mobile number should be 10 or 12 digits");
              }

              setUserDetails({
                number: target.value,
                name: userDetails.name,
              });
            }}
            placeholder="Mobile Number"
            required
          />
        </div>

        <button
          type="submit"
          className="group relative gap-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          <span className="flex items-center">
            <UserAddIcon
              className="h-5 w-5 duration-300 text-indigo-500 group-hover:text-indigo-200"
              aria-hidden="true"
            />
          </span>
          Add Contact
        </button>
      </form>
    </SlideOver>
  );
};

export default AddContactForm;
