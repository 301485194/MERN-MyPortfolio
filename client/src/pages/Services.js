export default function Services() {
  return (
    <section className="services container">
      <h2>My Services</h2>
      <div className="service-grid">

        <div className="service-card">
          <img src="/images/webdev.jpg" alt="Web Development"
          width="300"
          height="200"
          loading="lazy" />
          <h3>Web Development</h3>
          <p>
            I build responsive and accessible websites using HTML5, CSS3, and JavaScript.
            My designs focus on clean layouts and excellent user experience.
          </p>
        </div>

        <div className="service-card">
          <img src="/images/reactapp.jpg" alt="React Apps"
          width="300"
          height="200"
          loading="lazy" />
          <h3>React Applications</h3>
          <p>
            I develop interactive and scalable web applications with React,
            ensuring fast performance and dynamic user interfaces.
          </p>
        </div>

        <div className="service-card">
          <img src="/images/database.jpg" alt="Database Integration"width="300"
           height="200"
           loading="lazy" />
          <h3>Database Integration</h3>
          <p>
            I can connect your frontend with robust backend systems and databases,
            ensuring seamless data storage and retrieval.
          </p>
        </div>

        <div className="service-card">
          <img src="/images/ai.png" alt="AI Solutions" width="300"
          height="200"
          loading="lazy"/>
          <h3>AI Solutions</h3>
          <p>
            Exploring artificial intelligence and automation to deliver smarter,
            data-driven solutions that solve real-world problems.
          </p>
        </div>

      </div>
    </section>
  );
}
