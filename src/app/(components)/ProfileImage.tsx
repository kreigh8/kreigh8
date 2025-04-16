'use client'

import { motion } from 'motion/react'

function ProfileImage() {
  return (
    <motion.div>
      <motion.svg
        className="h-[300px] w-[300px] xl:h-[300px] xl:w-[506px]"
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="253"
          cy="253"
          r="245"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: '24 10 0 0' }}
          animate={{
            strokeDasharray: ['15 110 25 25', '16 25 82 72', '4 230 22 22'],
            rotate: [120, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        <motion.circle
          cx="253"
          cy="253"
          r="250"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: '24 10 0 0' }}
          animate={{
            strokeDasharray: ['15 120 25 25', '16 25 92 72', '4 250 22 22'],
            rotate: [60, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'mirror'
          }}
        />
      </motion.svg>
    </motion.div>
  )
}

export default ProfileImage
