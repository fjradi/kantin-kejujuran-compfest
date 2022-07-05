import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useRef } from "react";
import Router from "next/router";
import Link from "next/link";

const SignUp = () => {
  const studentIDRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const validateStudentID = (value) =>
    value > 0 &&
    value < 100000 &&
    parseInt(value[0]) + parseInt(value[1]) + parseInt(value[2]) ===
      parseInt(value[3] + value[4]);
  const validatePassword = (value) =>
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
  const validateConfirmPassword = (value) =>
    value === passwordRef.current.value;

  const onSubmit = () => {
    if (!validateStudentID(studentIDRef.current.value)) return;
    if (!validatePassword(passwordRef.current.value)) return;
    if (!validateConfirmPassword(confirmPasswordRef.current.value)) return;

    fetch("/api/users", {
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
          Router.push("/login");
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
          <p className="font-semibold">Sign Up</p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <Input
              label="Student ID"
              type="number"
              otherConfig={{ placeholder: "e.g 41207" }}
              errorMessage="Student ID should consist of 5 digits number and the last digit should be the sum of the first 3 digits"
              validateValue={validateStudentID}
              externalRef={studentIDRef}
            />
          </div>
          <div className="mb-2">
            <Input
              label="Password"
              type="password"
              otherConfig={{ placeholder: "Password" }}
              errorMessage="Password must contain letters and numbers and be 6-16 characters"
              validateValue={validatePassword}
              externalRef={passwordRef}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Confirm Password"
              type="password"
              otherConfig={{ placeholder: "Password" }}
              errorMessage="Password do not match"
              validateValue={validateConfirmPassword}
              externalRef={confirmPasswordRef}
            />
          </div>
          <Button onClickHandler={onSubmit}>Sign Up</Button>
          <div className="mt-4">
            <p className="inline text-sm text-gray-500">
              Already have an account?
            </p>
            <Link href="/login">
              <a className="text-blue-500"> Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
