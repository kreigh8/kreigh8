'use client'

import { IClient } from '@/model/Client'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'

function AnimatedClient({ client }: { client: IClient }) {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="flex flex-col items-center justify-center"
    >
      <Link href={client.clientUrl} target="_blank" className="w-full">
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.25, delay: 0.025, ease: 'easeInOut' }
          }}
        >
          <Image
            src={client.imageUrl}
            alt={client.clientName}
            width={90}
            height={60}
            className="m-auto object-cover"
          />
        </motion.div>

        <div className="md:text-md relative block overflow-hidden text-center text-sm whitespace-nowrap">
          <div>
            {client.clientName.split('').map((c, i) => {
              if (c === ' ') {
                return ' '
              }
              return (
                <motion.span
                  variants={{ initial: { y: 0 }, hovered: { y: '-100%' } }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                    delay: 0.025 * i
                  }}
                  className="inline-block"
                  key={i}
                >
                  {c}
                </motion.span>
              )
            })}
          </div>
          <div className="absolute inset-0">
            {client.clientName.split('').map((c, i) => {
              if (c === ' ') {
                return ' '
              }
              return (
                <motion.span
                  variants={{ initial: { y: '-100%' }, hovered: { y: 0 } }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                    delay: 0.025 * i
                  }}
                  className="inline-block"
                  key={i}
                >
                  {c}
                </motion.span>
              )
            })}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default AnimatedClient
