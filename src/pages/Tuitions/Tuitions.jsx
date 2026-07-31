import React, { useState } from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegUser,
  FaSearch,
  FaFilter,
} from 'react-icons/fa';
import { FaRegCalendarDays } from 'react-icons/fa6';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router';

const Tuitions = () => {
  const axiosPublic = useAxios();

  const [search, setSearch] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const { data: tuitions = [] } = useQuery({
    queryKey: ['tuitionPosts'],
    queryFn: async () => {
      const res = await axiosPublic.get('/Tution/tuitionPosts');
      return Array.isArray(res.data)
        ? res.data
        : (res.data.result ?? res.data.data ?? []);
    },
  });

  // Filter logic
  const filtered = tuitions
    .filter(t => {
      const matchSearch =
        t.subjects?.toLowerCase().includes(search.toLowerCase()) ||
        t.location?.toLowerCase().includes(search.toLowerCase());
      const matchMedium = mediumFilter ? t.medium === mediumFilter : true;
      const matchClass = classFilter ? t.class === classFilter : true;
      const matchSubject = subjectFilter
        ? t.subjects?.toLowerCase().includes(subjectFilter.toLowerCase())
        : true;
      const matchLocation = locationFilter
        ? t.location?.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      return (
        matchSearch &&
        matchMedium &&
        matchClass &&
        matchSubject &&
        matchLocation
      );
    })
    .sort((a, b) => {
      if (sortFilter === 'low') return parseInt(a.salary) - parseInt(b.salary);
      if (sortFilter === 'high') return parseInt(b.salary) - parseInt(a.salary);
      if (sortFilter === 'newest')
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  const handleReset = () => {
    setSearch('');
    setMediumFilter('');
    setClassFilter('');
    setSubjectFilter('');
    setLocationFilter('');
    setSortFilter('');
  };

  // Unique values from data
  const uniqueSubjects = [...new Set(tuitions.map(t => t.subjects))];
  const uniqueLocations = [...new Set(tuitions.map(t => t.location))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold">All Tuitions</h2>
        <p className="text-gray-500">
          Browse all available tuition posts. Find your perfect tutor today!
        </p>
      </div>

      {/* Top Search + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Subject or Location..."
            className="input input-bordered w-full pl-10 rounded-full"
          />
        </div>

        {/* Sort */}
        <select
          value={sortFilter}
          onChange={e => setSortFilter(e.target.value)}
          className="select select-bordered rounded-full"
        >
          <option value="">Default Sort</option>
          <option value="low">Lowest Budget</option>
          <option value="high">Highest Budget</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Filter Panel */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow p-5 sticky top-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 font-bold text-lg">
                <FaFilter />
                Filters
              </div>
              <button
                onClick={handleReset}
                className="text-green-500 font-semibold text-sm hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Medium */}
            <div className="mb-4">
              <label className="font-semibold block mb-2">Medium</label>
              <select
                value={mediumFilter}
                onChange={e => setMediumFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Mediums</option>
                <option value="Bangla Medium">Bangla Medium</option>
                <option value="English Medium">English Medium</option>
                <option value="English Version">English Version</option>
              </select>
            </div>

            {/* Class */}
            <div className="mb-4">
              <label className="font-semibold block mb-2">Class / Level</label>
              <select
                value={classFilter}
                onChange={e => setClassFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Classes</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
              </select>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="font-semibold block mb-2">Subject</label>
              <select
                value={subjectFilter}
                onChange={e => setSubjectFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Subjects</option>
                {uniqueSubjects.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="font-semibold block mb-2">District</label>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((l, i) => (
                  <option key={i} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right - Cards */}
        <div className="flex-1">
          {/* Result count */}
          <div className="mb-4 text-gray-500">
            Showing{' '}
            <span className="font-bold text-black">{filtered.length}</span>{' '}
            tuitions
          </div>

          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 mt-20 text-xl">
              No tuitions found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(tuition => (
                <div
                  key={tuition._id}
                  className="bg-white rounded-2xl shadow-md p-5 min-h-[350px] flex flex-col"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{tuition.subjects}</h2>
                    <span className="badge badge-outline p-4 badge-success">
                      {tuition.status}
                    </span>
                  </div>

                  {/* Class & Medium */}
                  <div className="flex flex-wrap gap-5 text-gray-600 mt-2">
                    <p className="flex items-center gap-2">
                      <FaBookOpen />
                      {tuition.class} - {tuition.medium}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 text-gray-700 mt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-blue-500 text-lg" />
                      </div>
                      {tuition.location}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                        <FaMoneyBillWave className="text-blue-500 text-lg" />
                      </div>
                      ৳{' '}
                      <span className="font-bold text-black">
                        {tuition.salary}
                      </span>{' '}
                      / month
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-500 text-lg" />
                      </div>
                      {tuition.days} Days/Week
                    </div>
                  </div>

                  {/* User & Date */}
                  <div className="flex items-center justify-between my-7 bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaRegUser />
                      {tuition.userName}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaRegCalendarDays />
                      {tuition.createdAt &&
                        formatDistanceToNow(new Date(tuition.createdAt), {
                          addSuffix: true,
                        })}
                    </div>
                  </div>

                  {/* Button */}
                  <Link to={`/tuitions/${tuition._id}`} className="mt-auto">
                    <button className="btn btn-outline btn-primary w-full">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tuitions;
