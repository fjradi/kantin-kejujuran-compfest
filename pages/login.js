import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
import Link from "next/link";
import Router from "next/router";

const Login = () => {
  const studentIDRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async () => {
    if (studentIDRef.current.value === "") return;
    if (passwordRef.current.value === "") return;

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentID: parseInt(studentIDRef.current.value),
        password: passwordRef.current.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          Router.push("/");
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log("An unexpected error happened occurred:", err.message);
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-72 bg-white  m-auto">
        <div className="bg-blue-500 p-4 text-white flex flex-col items-center">
          <p className="font-semibold">Login</p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <Input
              label="Student ID"
              type="text"
              ref={studentIDRef}
              otherConfig={{ placeholder: "e.g 41207" }}
              externalRef={studentIDRef}
              validateValue={(value) => true}
              errorMessage=""
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              ref={passwordRef}
              otherConfig={{ placeholder: "Password" }}
              externalRef={passwordRef}
              validateValue={(value) => true}
              errorMessage=""
            />
          </div>
          <Button onClickHandler={onSubmit}>Login</Button>
          <div className="mt-4">
            <p className="inline text-sm text-gray-500">
              Dont have an account?
            </p>
            <Link href="/signup">
              <a className="text-blue-500"> Sign Up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
