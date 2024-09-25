import React from 'react'
import DeveloperCard from '../components/DeveloperCard'
import Layout from '../components/Layout/Layout'

const About = () => {
  const team = {
    developers: [
      {
        name: 'Abhishek Kumar',
        role: 'Full Stack Web & Mobile Developer',
        imageUrl: '/images/abhi.jpg',
        isHighlighted: false,
        linkdin: 'https://www.linkedin.com/in/abhishek-kumar-a03253262/',
        insta: 'https://www.instagram.com/_abhi._.arya/',
      },
    ],
    designers: [
      {
        name: 'Abhishek Tiwari',
        role: 'Front-end Developer\nUI/UX Designer',
        imageUrl: '/images/boka.jpg',
        isHighlighted: false,
        linkdin: '',
        insta: '',
      },
    ],
  }

  return (
    <Layout
      title="About Us"
      description="The About Us page of KIITMart showcases our team members, including developers and designers. The page displays their profile pictures, roles, and links to their professional profiles."
      keywords="KIITMart, About Us, team members, developers, designers, Abhishek Kumar, Abhishek Tiwari, Full Stack Developer, Front-end Developer, UI/UX Designer, LinkedIn, Instagram"
      author="Abhishek Kumar"
    >
      <div className="flex flex-col space-y-12 p-8 mt-6 md:mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Developers</h2>
          <div className="flex flex-wrap justify-center gap-20">
            {team.developers.map((dev, index) => (
              <DeveloperCard key={index} {...dev} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Our Designers</h2>
          <div className="flex flex-wrap justify-center gap-20">
            {team.designers.map((designer, index) => (
              <DeveloperCard key={index} {...designer} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About