import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const headers = {
  headers: {
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
    DNT: "1",
    Origin: "http://localhost:4000",
  },
};
const backEndURL = process.env.BACKEND_URL;

const addUser = async ({
  email,
  firstName,
  lastName,
  phoneNumber,
  userType,
  ...userData
}) => {
  const response = await axios.post(
    "http://localhost:4000",
    {
      query: `mutation{\n  createOneUsers(data:{\n    email:"${email}"\n    firstName:"${firstName}"\n    lastName:"${lastName}"\n    phoneName:"${phoneNumber}"\n    userType:"${userType}"\n  }){\n    id\n  }\n}`,
    },
    headers
  );

  return response.data;
};

const getUsers = async ({ email, ...userData }) => {
  const response = await axios.post(
    "http://localhost:4000/",
    {
      query: `query{\n  users(where:{\n    email:{\n      equals: "${email}"\n    }\n  }){\n    id\n    userType\n    status\n    email\n  }\n}`,
    },
    headers
  );
  return response.data;
};

const verifiedUser = async ({ email, ...rest }) => {
  const config = {
    method: "post",
    url: "/api/verfiyUser",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email,
    }),
  };

  const response = await axios(config);

  return response.data;
};

// const useAddUser = () => useQuery(["userDetails"], () => addUser());

// const [useAddUser] = useMutation(addUser, {});

export { addUser, getUsers, verifiedUser };
