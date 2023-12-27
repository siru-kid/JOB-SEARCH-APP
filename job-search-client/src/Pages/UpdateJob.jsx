import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";

const UpdateJob = () => {
  const { id } = useParams();
  //   console.log(id);
  const {
    _id,
    jobTitle,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    employmentType,
    description,
    postedBy,
    skills,
  } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data);
    fetch(`http://localhost:3000/update-job/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Updated Successfully!!!");
        }
        reset();
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "Node", label: "Node" },
    { value: "Swift", label: "Swift" },
    { value: "React", label: "React" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "C#", label: "C#" },
    { value: "PHP", label: "PHP" },
    { value: "Rust", label: "Rust" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 pt-6">
      {/* form */}
      <div className="bg-[#FAFAFA] py-10px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Comapny Name</label>
              <input
                type="text"
                placeholder="Ex:Microsoft"
                defaultValue={companyName}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                defaultValue={minPrice}
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$120k"
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 3rd row */}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Locations</label>
              <input
                type="text"
                placeholder="Ex: Addis ababa"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* 4th row */}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={postingDate}
                placeholder="Ex: 2023-12-20"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              defaultValue={skills}
              className="create-job-input py-4"
              defaultInputValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                defaultValue={companyLogo}
                placeholder="Paste your company logo URL:https://www.weshare.com/img1 "
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>
          {/* 6th row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              defaultValue={description}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              {...register("description")}
              rows={6}
              placeholder="Job Description"
            />
          </div>
          {/* last row */}

          <div>
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              defaultValue={postedBy}
              placeholder="your email"
              {...register("postedBy")}
              className="create-job-input"
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
