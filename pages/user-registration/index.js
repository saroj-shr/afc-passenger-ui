// import React from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { useQuery, useMutation, queryCache } from "@tanstack/react-query";
import { push } from "next/router";

import {
  addUser,
  getUsers,
  verifiedUser,
} from "../../queries/useClientRegistration";

const UserRegistration = () => {
  const { data: session } = useSession();

  const { userData, error } = useQuery(["userDetails"], () =>
    getUsers({ email: session.user.email })
  );

  const mutation = useMutation(addUser, {
    onSuccess: async (data) => {
      console.log("mutation", data);
      verifiedUser({ email: session.user.email })
        .then(() => {
          push("/dashboard");
        })
        .catch(() => console.log("erro"));

      // queryCache.cancelQueries("userDetails");
      // const snapshot = queryCache.getQueryData("userDetails");
      // queryCache.setQueryData("userDetails", (prev) => [
      //   ...prev,
      //   { ...newData, id: new Date().toISOString() },
      // ]);
      // return () => queryCache.setQueryData("userDetails", snapshot);
    },
    // onSettled: () => queryCache.refetchQueries("userDetails"),

    onError: (error) => {
      console.log("erro");
    },
  });

  const userRegistrationForm = (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
        userType: "passenger",
      }}
      onSubmit={async (values) => {
        mutation.mutate({
          email: session.user.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          userType: values.userType,
        });
      }}
    >
      <Form className="">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your First Name?</span>
          </label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your Last Name?</span>
          </label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your Phone Number?</span>
          </label>
          <Field
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select User</span>
          </label>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Passenger</span>
              <Field
                type="radio"
                name="userType"
                className="radio radio-primary"
                value="passenger"
                checked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Driver</span>
              <Field
                type="radio"
                name="userType"
                className="radio radio-primary"
                value="driver"
              />
            </label>
          </div>
        </div>
        <div className="form-control w-full max-w-xs mt-3">
          <button className=" btn btn-outline btn-primary" type="submit">
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );

  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-4 md:mb-0">
              <img src="/draw2.svg" className="w-full" alt="Phone image" />
            </div>

            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-4">
                Automated Fare Collection System <br />
                <span className="text-blue-600">User Registration </span>
              </h1>
              {userRegistrationForm}

              <div className="form-control w-full max-w-xs mt-3">
                <button
                  className=" btn btn-outline btn-warning"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegistration;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (session.verifiedUser) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
