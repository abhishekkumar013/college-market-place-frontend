import React from 'react'

import DeveloperCard from '../components/DeveloperCard'
import Layout from '../components/Layout/Layout'
const About = () => {
  const developers = [
    {
      name: 'Abhishek Kumar',
      role: 'Full Stack Web & Mobile Developer',
      imageUrl: '/images/abhi.jpg',
      isHighlighted: false,
      linkdin: 'https://www.linkedin.com/in/abhishek-kumar-a03253262/',

      insta: 'https://www.instagram.com/_abhi._.arya/',
    },
    {
      name: 'Abhishek Tiwari',
      role: 'Front-end Developer\nUI/UX Designer',
      imageUrl: '/path/to/abhishek-tiwari-image.jpg',
      isHighlighted: false,
      linkdin: '',
      insta: '',
    },
  ]

  return (
    <Layout title="home" description="" keywords="" author="">
      <div className="flex flex-wrap h-[500px] 2xl:h-[700px] items-center justify-center gap-20 p-8">
        {developers.map((dev, index) => (
          <DeveloperCard key={index} {...dev} />
        ))}
      </div>
    </Layout>
  )
}

export default About
