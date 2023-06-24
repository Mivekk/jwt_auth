"use client";
import { RegisterDocument, UsersDocument } from "@/generated/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  initialData?: any;
}

const Form: React.FC<Props> = ({ initialData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useMutation(RegisterDocument, {
    update: (cache, { data }) => {
      if (!data?.register) {
        return;
      }

      cache.writeQuery({
        query: UsersDocument,
        data: {
          users: data.register,
        },
      });
    },
  });

  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const response = await register({
          variables: {
            email,
            password,
          },
        });

        console.log(response);
        //router.push("/");
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
