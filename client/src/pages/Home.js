import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home">
      <h1>Welcome — I'm Mohammed Safique Hossain</h1>
      <p className="mission">I build clean, responsive web apps and learning-focused projects. My mission: deliver reliable code and continuous learning.</p>
      <Link to="/about" className="btn">About Me</Link>
    </section>
  );
}