import React from "react";
import UsersDisplay from "./UsersDisplay";
import { getClient } from "@/lib/client";
import { UsersDocument } from "@/generated/graphql";
import { NetworkStatus } from "@apollo/client";

const fetchUsers = async () => {
  return getClient().query({ query: UsersDocument });
};

const Home: React.FC<{}> = async () => {
  const users = await fetchUsers();

  if (users.networkStatus !== NetworkStatus.ready) {
    return null;
  }

  const serializedUsersData = JSON.stringify(users.data.users);

  return (
    <>
      <UsersDisplay initialData={serializedUsersData} />
    </>
  );
};

export default Home;
