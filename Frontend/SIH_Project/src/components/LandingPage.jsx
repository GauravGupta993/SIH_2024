import React, { useState, useEffect } from 'react';
import JobPost from './JobPost';
import Dashboard from './Dashboard';
import EventSection from './EventSection';
import AlumniPost from './AlumniPost';


const LandingPage = () => {
  const [user, setUser] = useState({ name: 'Alumni User' });

  // Sample job posts and events data
  const [jobPosts, setJobPosts] = useState([
    { id: 1, title: 'Frontend Developer', company: 'WebInOrbit', location: 'Remote', description: 'Looking for a passionate frontend developer.', salary: '$75,000 - $110,000', postedDate: '2024-09-18' },
    { id: 2, title: 'Data Scientist', company: 'Tech Co', location: 'San Francisco, CA', description: 'Looking for a data-driven individual.', salary: '$85,000 - $130,000', postedDate: '2024-09-17' },
  ]);

  const [dashboardData, setDashboardData] = useState({
    referralsGiven: 2,
    jobsCreated: 5,
    eventsSponsored: 1,
    profileViews: 52
  });

  const [events, setEvents] = useState([
    { id: 1, title: 'Hackathon 2024', description: 'Annual college hackathon event', date: '2024-10-01', location: 'Campus Auditorium' },
    { id: 2, title: 'Alumni Meetup', description: 'Networking event for alumni and students.', date: '2024-11-15', location: 'City Convention Center' },
  ]);

  return (
    <div className="landing-page bg-gradient-to-br from-purple-600 to-indigo-800 min-h-screen text-white">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome message */}
        <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}!</h1>

        {/* Alumni Dashboard Section */}
        <section className="mb-12">
          <Dashboard data={dashboardData} />
        </section>

        {/* Job Postings Section */}
        <section className="job-posts mb-12">
          <h2 className="text-3xl font-semibold mb-4">Your Job Postings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobPosts.map(job => (
              <JobPost key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Alumni Events Section */}
        <section className="mb-12">
          <EventSection events={events} />
        </section>

        {/* Alumni Post Section */}
        <section className="alumni-posts">
          <h2 className="text-3xl font-semibold mb-4">Recent Alumni Posts</h2>
          <AlumniPost />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
