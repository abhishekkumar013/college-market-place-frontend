import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { server } from '../main'
import { toast } from 'react-toastify'

const ContactUs = () => {
  const [rating, setRating] = useState(1)
  const [message, setMessage] = useState('')

  const contactChannels = [
    {
      name: 'Instagram',
      icon: FiInstagram,
      link: 'https://www.instagram.com/kiitmart/',
      color: 'text-red-500',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(
        `${server}/feedback/add-feedback`,
        {
          rating,
          message,
        },
        { withCredentials: true },
      )
      localStorage.setItem('phoneUpdateNotificationDismissed', 'true')
      toast.success(data.message)
    } catch (error) {
      const msg = error.response?.data?.message || 'Try to submit agian'
      toast.error(msg)
    } finally {
      setRating(1)
      setMessage('')
    }
  }

  return (
    <Layout
      title="Contact Us"
      description="The Contact Us page of KIITMart offers users a way to connect via Instagram and provides a feedback form. Users can rate their experience and suggest improvements. The page features a clean design with a rating system and a message box for detailed feedback."
      keywords="KIITMart, Contact Us, Instagram, feedback form, rate us, suggest improvements, customer support, social media, user experience, contact channels"
      author="Abhishek Kumar"
    >
      <div className="flex flex-col items-center justify-center mt-20 2xl:mt-32 p-4 space-y-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white p-6 md:p-8 ">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            You may contact us via these channels:
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16">
            {contactChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.link}
                className="flex flex-col items-center group transition-transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <channel.icon
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 ${channel.color}`}
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center">
                  {channel.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white p-6 md:p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            Rate Us and Suggest for Improvement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rating
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    } focus:outline-none`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
