import React from 'react'
import Layout from '../../components/Layout/Layout'

const TermsAndConditions = () => {
  const terms = [
    "Welcome to KIIT Mart! By diving into our marketplace, you're agreeing to play by our rules.",
    'Your info matters! We use your contact details to connect with you and ensure smooth communication with other students.',
    "Let's keep it safe! Alcohol, weapons, and other forbidden items are a no-go here.",
    'Sellers, step up! Make sure your product listings are spot-on; your reputation is on the line.',
    'Transactions made easy! Remember, all payments happen directly between you and the seller—KIIT Mart is just the bridge!',
    "Refunds and returns? Those are between you and your seller; we're here to facilitate, not mediate!",
    'Respect the community! Harassment and fraud have no place in our marketplace.',
    "Quality alert! While we connect buyers and sellers, we can't guarantee the quality of every product.",
    "Stay in check! We reserve the right to suspend or terminate accounts that don't follow the rules.",
    'Open communication! We ensure that all interactions between buyers and sellers remain seamless and secure for a better shopping experience!',
  ]

  return (
    <Layout
      title=" T&C"
      description="The About Us page of KIITMart showcases two team members: Abhishek Kumar, a Full Stack Web & Mobile Developer, and Abhishek Tiwari, a Front-end Developer UI/UX Designer. The page displays their profile pictures, roles, and links to their LinkedIn and Instagram profiles."
      keywords="KIITMart, About Us, team members, developers, Abhishek Kumar, Abhishek Tiwari, Full Stack Developer, Front-end Developer, UI/UX Designer, LinkedIn, Instagram"
      author="Abhishek kumar"
    >
      <div className="w-full max-w-4xl mt-8 mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 underline">
          TERMS AND CONDITIONS
        </h1>
        <ul className="list-disc space-y-3 sm:space-y-4">
          {terms.map((term, index) => (
            <li key={index} className="flex items-start px-5">
              <li key={index}>{term}</li>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TermsAndConditions
