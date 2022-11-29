import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Required({ fields, fieldholder }) {
  return (
    <>
      <label class="flex flex-col">
        <span class="mx-4 flex text-lg font-medium text-slate-700 before:text-red-500 before:content-['*'] after:ml-0.5">
          {fields}
        </span>
        <input
          type="text"
          name="text"
          class="m-4 mt-1 flex flex-col rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder={fieldholder}
        />
      </label>
    </>
  );
}
function NotRequired({ fields, fieldholder }) {
  return (
    <>
      <label class="flex flex-col">
        <span class="text-slate-700Required mx-4 flex text-lg font-medium">
          {fields}
        </span>
        <input
          type="text"
          name="text"
          class="m-4 mt-1 flex flex-col rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder={fieldholder}
        />
      </label>
    </>
  );
}
function ContactNumber({ fields, number }) {
  return (
    <>
      <label class="flex flex-col">
        <span class="mx-4 flex text-lg font-medium text-slate-700 before:text-red-500 before:content-['*'] after:ml-0.5">
          {fields}
        </span>
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="tel"
          class="required m-4 mt-1 flex flex-col rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder={number}
        />
      </label>
    </>
  );
}
function Gender({ fields, fieldholder }) {
  return (
    <>
      <label class="flex flex-col">
        <span class="mx-4 flex text-lg font-medium text-slate-700">
          {fields}
        </span>
        <select
          id="countries"
          class="required m-4 mt-1 flex flex-col rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
        >
          <option>{fieldholder}</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>
    </>
  );
}

export default function Information() {
  return (
    <div className="mx-auto min-h-screen max-w-md">
      <Link to="/registration">
        <button className="mt-8 ml-2 pb-6 text-xl">
          <LeftOutlined />
        </button>
      </Link>
      <div className="mb-10 flex flex-col p-4">
        <h1 className="text-xl ">Welcome</h1>
        <h1 className="text-xl font-bold">Fill in the information below</h1>
      </div>
      <Required fields="First Name" fieldholder="Enter your first name" />
      <NotRequired fields="Middle Name" fieldholder="Enter your middle name" />
      <Required fields="Last Name" fieldholder="Enter your last name" />
      <ContactNumber fields="Contact Number" number="+63|9** *** ****" />
      <Gender fields="Gender" fieldholder="Select your gender" />
      <Link to="/address">
        <button class="float-right mx-4 mt-8 rounded-md bg-green-900 py-2 px-6 text-white">
          Next
        </button>
      </Link>
    </div>
  );
}
