"use client";

import Header from "@/components/ui/header/header";
import Landing from "@/pages/landing/landing";
import Footer from "@/components/ui/footer/footer";
import Navigation from "@/components/ui/navigation/navigation";


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
          { name: 'The Proprietor', link: '/proprietor' },
          { name: 'The Principal', link: '/principal' },
          { name: 'The Headmaster', link: '/headmaster' },
          { name: 'The Nursery Head', link: '/nursery-head' },
        ]
      },
      {
        Head: 'Sections & Units',
        sublink: [
          { name: 'The Secondary Section', link: '/secondary-section' },
          { name: 'The Primary Section', link: '/primary-section' },
          { name: 'The Nusery Section', link: '/nursary-section' },
        ]
      },
      {
        Head: 'Centers',
        sublink: [
          { name: 'Skill Aquisition', link: '/skill-aquisition' },
          { name: 'ICT', link: '/ICT' },
        ]
      },
    ]
  },
  {
    name: 'Admission', submenu: true, sublinks: [
      {
        Head: 'Sections',
        sublink: [
          { name: 'Nursery', link: '/admission-nursery' },
          { name: 'Primary', link: '/admission-primary' },
          { name: 'Junior Section', link: '/admission-jss' },
          { name: 'Senior Section', link: '/admission-ss' },
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
        Head: 'All About Hallmark',
        sublink: [
          { name: 'The Secondary', link: '/about-secondary' },
          { name: 'The Primary', link: '/about-primary' },
          { name: 'The Nursery', link: '/about-nursery' },
          { name: 'Mission & Vission', link: '/about-mission-vission' },
          { name: 'Projects', link: '/about-projects' },
        ]
      },
      {
        Head: 'The Management',
        sublink: [
          { name: 'Pricipal Officer', link: '/about-principal-officer' },
          { name: 'Head Master', link: '/about-head-master-officer' },
          { name: 'Nursery Head', link: '/about-nursery-head-officer' },
          { name: 'Board of Trustees', link: '/about-board-of-trustees' },
          { name: 'Governing Council', link: '/about-governing-council' },
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
      {
        Head: 'Research Centre',
        sublink: [
          { name: 'Zankli Research Center', link: '/zankli-research-center' },
        ]
      },
    ]
  },
  {
    name: 'Portals', submenu: true, sublinks: [
      {
        Head: 'Authentication',
        sublink: [
          { name: 'Signin', link: '/signin' },
          { name: 'Signup', link: '/signup' },
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
      {/* <Header /> */}
      <Navigation links={links} />
      <Landing />
      <Footer />
    </article>
  );
};

export default App;