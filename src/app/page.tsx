"use client";

import Header from "@/components/ui/header/header";
import Landing from "@/pages/landing/landing";
import Footer from "@/components/ui/footer/footer";


// Type definitions for menu
export interface SubLink {
  name: string;
  link: string;
}

export interface SubMenuGroup {
  Head: string;
  sublink: SubLink[];
}

export interface MenuItem {
  name: string;
  link?: string;
  submenu?: boolean;
  sublinks?: SubMenuGroup[];
}

const links: MenuItem[] = [
  {
    name: 'Administration', submenu: true, sublinks: [
      {
        Head: 'Centeral Admin',
        sublink: [
          { name: 'Exams & Records', link: '/exams-records' },
          { name: 'The Admission Unit', link: '/admission-units' },
          { name: 'Boarding Students', link: '/boarding-students' },
          { name: 'Day Students', link: '/day-students' },
        ]
      },
      {
        Head: 'Centers',
        sublink: [
          { name: 'Skill Acquisition', link: '/skill-acquisition' },
          { name: 'ICT Center', link: '/ict-center' },
        ]
      },
    ]
  },
  {
    name: 'Admission', submenu: true, sublinks: [
      {
        Head: 'Sections',
        sublink: [
          { name: 'Nursery Section', link: '/admission-nursery' },
          { name: 'Primary Section', link: '/admission-primary' },
          { name: 'Junior Section', link: '/admission-junior' },
          { name: 'Senior Section', link: '/admission-senior' },
        ]
      },
      {
        Head: 'Fees & Scholarship',
        sublink: [
          { name: 'Schedule of fees', link: '/schedule-fees' },
          { name: 'Part Time Fees', link: '/part-time-fees' },
          { name: 'Available Scholarship', link: '/avaiable-schoolarship' },
        ]
      },
    ]
  },
  {
    name: 'About Us', submenu: true, sublinks: [
      {
        Head: 'Hallmark Academy',
        sublink: [
          { name: 'Proprietor', link: '/about-proprietor' },
          { name: 'Principal', link: '/about-principal' },
          { name: 'Head Master', link: '/about-head-master' },
          { name: 'Nursery Head', link: '/about-nursery-head' },
          { name: 'Mission', link: '/about-mission' },
          { name: 'Vision', link: '/about-vision' },
        ]
      },
      {
        Head: 'Units & Sections',
        sublink: [
          { name: 'Nursery Section', link: '/about-nursery-section' },
          { name: 'Primary Section', link: '/about-primary-section' },
          { name: 'Junior Section', link: '/about-junior-section' },
          { name: 'Senior Section', link: '/about-senior-section' },
        ]
      },
    ]
  },
  {
    name: 'Research', submenu: true, sublinks: [
      {
        Head: 'Research',
        sublink: [
          { name: 'Research Policy', link: '/research-policy' },
          { name: 'Academic Journals', link: '/academic-journals' },
          { name: 'Publications', link: '/publications' },
        ]
      },
      {
        Head: 'Resources',
        sublink: [
          { name: 'Library Policy', link: '/library-policy' },
          { name: 'Repository Journals', link: '/repository-journals' },
          { name: 'E-Learning', link: '/e-learning' },
          { name: 'OER', link: '/oer' },
        ]
      },
    ]
  },
  {
    name: 'News & Media', submenu: true, sublinks: [
      {
        Head: 'News Updates',
        sublink: [
          { name: 'College News', link: '/college-news' },
          { name: 'College Bulletin', link: '/college-bulletin' },
          { name: 'Photo Gallary', link: '/photo-gallary' },
        ]
      },
    ]
  },
  { name: 'Contact', link: '/contact' },
];

const App = () => {
  return (
    <article className="w-full min-h-screen flex flex-col bg-neutral-900 text-neutral-200 font-[family-name:var(--font-geist-sans)]">
      <Header links={links} />
      <Landing />
      <Footer />
    </article>
  );
};

export default App;