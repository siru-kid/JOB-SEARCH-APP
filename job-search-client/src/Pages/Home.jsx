import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCarentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobsData(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  // filter jobs by title
  const filteredItems = jobsData.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ................Radio filtering...............
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ................button-based filtering...............
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //calculate the index range

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for the next page

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCarentPage(currentPage + 1);
    }
  };

  // function for the next page

  const prevPage = () => {
    if (currentPage > 1) {
      setCarentPage(currentPage - 1);
    }
  };
  // main function
  const filteredData = (data, selected, query) => {
    let filteredData = data;

    // filtering Input items
    if (query) {
      filteredData = filteredItems;
    }

    // category filtering
    if (selected) {
      filteredData = filteredData.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
    }

    //slice the data based on the current Page

    const { startIndex, endIndex } = calculatePageRange();
    filteredData = filteredData.slice(startIndex, endIndex);

    return filteredData.map((job, i) => <Card key={i} data={job} />);
  };

  const result = filteredData(jobsData, selectedCategory, query);

  return (
    <div className="text-blue">
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          {<Sidebar handleChange={handleChange} handleClick={handleClick} />}
        </div>
        {/* jobcards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data Found!</p>
            </>
          )}

          {/* pagination here */}

          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="hover:underline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                className="hover:underline"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* right side */}
        <div className="bg-white p-4 rounded">
          <Newsletter />{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;
