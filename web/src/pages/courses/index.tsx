import type { GetStaticProps } from 'next'
import Section from '~/components/common/Section'
import revalidateOptions from '~/constants/revalidateOptions'
import type { Page } from '~/types'

interface CoursesPageProps {
  courses: any[]
}

const CoursesPage: Page = () => {
  return (
    <Section>
      <div className="relative mx-3 w-full overflow-hidden rounded-lg bg-gray-900 px-8 py-10 text-center md:my-6 md:px-20 md:py-16">
        <h1 className="font-serif text-3xl font-semibold text-white md:text-4xl">
          Explore courses
        </h1>
        <p className="mt-2 text-sm text-gray-200">Check our latest courses.</p>
      </div>
    </Section>
  )
}

export default CoursesPage

export const getStaticProps: GetStaticProps<CoursesPageProps> = async () => {
  return {
    props: { courses: [] },
    revalidate: revalidateOptions.everyMinute,
  }
}
