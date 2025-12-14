import React from 'react';
import projects from '../data/projects.js';

export default function Projects() {
  return (
    <section className="projects">
      <h2>Highlighted Projects</h2>
      <div className="grid">
        {projects.map(p => (
          <article key={p.id} className="card">
            <img src={p.img} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>Role:</strong> {p.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}