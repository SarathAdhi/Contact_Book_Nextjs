import { PlusIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import PageLayout from "../common/layouts/PageLayout";
import axios, { AxiosResponse } from "../lib/axios";
import { storage } from "../utils/storage";
import { showSuccessToast } from "../utils/toast";
import { TableHeaderBuilder } from "react-table-utils";
import { ColumnDef } from "@tanstack/react-table";
import LinkedItem from "../common/components/elements/LinkedItem";
import DataTable from "../common/components/react-table";
import { TrashIcon } from "@heroicons/react/solid";
import { showQuestionAlert } from "../utils/alert";
import AddContactForm from "../modules/Home/AddContactForm";
import { supabaseClient } from "../utils/supabaseClient";

export type UserDetails = {
  name: string;
  number: string;
};

const Home: NextPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    number: "",
  });

  const [allContactDetails, setAllContactDetails] = useState<UserDetails[]>([]);

  const headerColumns = new TableHeaderBuilder<UserDetails>()
    .add("serial", (col) =>
      col.header("S.No").accessorFn((_, index) => index + 1)
    )
    .add("name")
    .add("number", (col) =>
      col.cell((value) => (
        <LinkedItem
          href={`tel:${value}`}
          className="text-blue-600 font-semibold"
        >
          {value}
        </LinkedItem>
      ))
    )
    .add("action", (col) =>
      col.cell((value) => (
        <button
          className="bg-red-500 p-1 rounded-lg text-white"
          onClick={async () => {
            showQuestionAlert(
              "Confirmation needed",
              `Are you sure you want to delete this contact ${value}?`,
              async () => {
                const { data, message }: AxiosResponse = await axios.post(
                  "/contact/delete",
                  {
                    user_id: storage.getToken("token"),
                    number: value,
                  }
                );

                setAllContactDetails(data);
                showSuccessToast(message);
              }
            );
          }}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      ))
    )
    .build();

  const columns: ColumnDef<UserDetails>[] = useMemo(() => headerColumns, []);

  const [isSildeOver, setIsSildeOver] = useState(false);

  const getAllContacts = async () => {
    const { data } = await axios.post("/contact/get", {
      id: storage.getToken("token"),
    });
    setAllContactDetails(data);
  };

  const downloadVcfFile = async () => {
    const id = storage.getToken("token");
    const { data, message }: AxiosResponse = await axios.post("/download", {
      id,
    });

    showSuccessToast(message);
    const { data: download } = supabaseClient.storage
      .from("vcf-file")
      .getPublicUrl(`public/${id}.vcf`);

    console.log(download);
  };

  useEffect(() => {
    getAllContacts();
    // downloadVcfFile();
  }, []);

  return (
    <PageLayout title="Home" className="pt-16">
      <div className="group">
        <button
          className="fixed top-2 right-2 bg-indigo-600 p-1 rounded-full text-white"
          onClick={() => setIsSildeOver(true)}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
        <p className="fixed bg-indigo-300 font-semibold px-2 py-1 rounded-lg -top-10 right-12 duration-200 group-hover:top-1.5">
          Add Contacts
        </p>
      </div>

      <AddContactForm
        isSildeOver={isSildeOver}
        setIsSildeOver={setIsSildeOver}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        setAllContactDetails={setAllContactDetails}
      />

      {allContactDetails?.length !== 0 ? (
        <DataTable columns={columns} data={allContactDetails} />
      ) : (
        <h1 className="text-xl font-semibold">No Contacts created yet.</h1>
      )}
    </PageLayout>
  );
};

export default Home;
