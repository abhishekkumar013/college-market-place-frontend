import React from 'react'

import DeveloperCard from '../components/DeveloperCard'
const About = () => {
  const developers = [
    {
      name: 'Abhishek Kumar',
      role: 'Full Stack Web & Mobile Developer',
      imageUrl: '/images/abhi.jpg',
      isHighlighted: false,
      linkdin: 'https://www.linkedin.com/in/abhishek-kumar-a03253262/',
      github: 'https://github.com/abhishekkumar013',
      insta: 'https://www.instagram.com/_abhi._.arya/',
    },
    {
      name: 'Abhishek Tiwari',
      role: 'Front-end Developer\nUI/UX Designer',
      imageUrl: '/path/to/abhishek-tiwari-image.jpg',
      isHighlighted: false,
      linkdin: '',
      github: '',
      insta: '',
    },
  ]

  return (
    <div className="flex flex-wrap justify-center bg-gray-100 gap-20 p-8">
      {developers.map((dev, index) => (
        <DeveloperCard key={index} {...dev} />
      ))}
    </div>
  )
}

export default About
