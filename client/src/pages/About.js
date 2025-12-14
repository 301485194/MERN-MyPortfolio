import React from 'react';

export default function About() {
  const FULL_NAME = "Mohammed Safique Hossain"; 
  return (
    <section className="about">
      <img src="/images/profile.jpg" alt={`${FULL_NAME} headshot`} className="profile" />
      <div>
        <h2>{FULL_NAME}</h2>
        <p>
          Hello! I’m Mohammed Safique Hossain, a student of Artificial Intelligence and an aspiring software developer passionate about solving problems through technology. Originally from Bangladesh and now studying in Canada, I have always been fascinated by how software can make people’s lives easier and more connected. I enjoy working with JavaScript, React, and modern web technologies to build responsive and meaningful web applications. My mission is to keep learning, improving, and contributing to projects that create a positive impact on users and businesses alike.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
          Download Resume (PDF)
        </a>
      </div>
    </section>
  );
}
