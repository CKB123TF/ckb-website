import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  MediumIcon,
  LinkedInIcon,
  TwitterIcon,
  YoutubeIcon
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Christian Kildal-Brandt. I live in New York City, where I design the future.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m Christian. I live in New York City, where I write essays and stories in addition to building cool things.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-800 dark:text-zinc-300">
            <p>
              I only began to code in college while I was studying at the University of Pennsylvania (unfortunately in my final semester)
              but fell in love with the reach that I could have by harnessing the power of technology. While I had been an entrepreneur previously,
              going through the process of biking around Philadelphia with baskets full of beef jerky delivering to all of our retailers. I had previously had my goals for the company thrashed 
              due to covid and being unable to deliver directly to our customers. I made the difficult to decision to close the business down shortly
              after Covid arrived in the United States and moved on to search for professional roles in coding where I have spent my career since.
            </p>
            <p>
              Today, I’m a consultant at Slalom, where I work on building out commercial contracting
              systems for some of the largest companies in the world. In my free time I work on projects
              that I hope can impact many people in a positive way. My current side project is around
              allowing book influencers (<em>booktokers</em>) to connect more closely with their audiences.
            </p>
            <p>
              In my free time I enjoy seeing the latest films at my local movie theatre (thank you AMC plus), completing as many single player video games
              as my schedule allows (Resident Evil 4 is next on my list), and reading classic literature (Anna Karenina is a recent favorite). I hope that you enjoy
              my website and if you feel like reaching out for any reason please don’t hesitate to do so!
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {/* <SocialLink href="#" icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink>
            <SocialLink href="#" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink> */}
            <SocialLink href="https://github.com/CKB123TF" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/christian-kildal-brandt-68904215a/" icon={LinkedInIcon} className="mt-4">
              Follow on LinkedIn
            </SocialLink>
            <SocialLink href="https://medium.com/@ckildalbrandt" icon={MediumIcon} className="mt-4">
              Follow on Medium
            </SocialLink>
            <SocialLink href="https://www.youtube.com/channel/UCXmluTjm45_pZKBfzfw3rCQ" icon={YoutubeIcon} className="mt-4">
              Subscribe on Youtube
            </SocialLink>
            <SocialLink
              href="mailto:ckildalbrandt@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              ckildalbrandt@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
