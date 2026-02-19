import logoLight from './images/marriage_logo_light.png'
import logoDark from './images/marriage_logo_dark.png'
import ceoImage from './images/divine-effiong-Mn_-cbRkiNw-unsplash.webp';

import dots from './images/dots.svg'

import heroImg from "./images/hero-image.webp"
import servicesImg from "./images/service-image.jpg"
import hoverImg from "./images/hover-image.png"
import hoverImgDark from "./images/hover-image-dark.png"
import secondaryImage from "./images/secondary-image.jpg"
import quoteImg from './images/open.png'

import sidebarIcon from './images/sideBarIcon.png'
import closeSidebarIcon from './images/closeSidebar.png'

import coachImg from './images/coach.png'
import hallImg from './images/hall.png'
import weddingRingImg from './images/wedding-ring.png'
import type { Review, Solution } from './interfaces'
import arrowLeft from './images/arrow-left.png'

import { House, UserRound, Briefcase, Video } from "lucide-react";

export const assets = {
  logoDark, logoLight, dots, heroImg, servicesImg, secondaryImage, hoverImg, quoteImg, arrowLeft, hoverImgDark, ceoImage, sidebarIcon, closeSidebarIcon
}

export const navLinks = [
  { 
    name: "Home", 
    link: "#home", 
    icon: House 
  },
  { 
    name: "About", 
    link: "#about", 
    icon: UserRound 
  },
  { 
    name: "Services", 
    link: "#services", 
    icon: Briefcase 
  },
  { 
    name: "Webinar", 
    link: "#webinar", 
    icon: Video 
  },
];

export const services: string [] = [
  'Post marital Coaching', "Pre Marital Coaching", "Visual Coaching"
]


export const solutions: Solution[] = [
  {
    name: 'Post-Marital Coaching',
    image: hallImg, // Replace with your actual imported variable
    text: 'Navigate the complexities of married life with tools for effective communication, conflict resolution, and deepening your emotional connection.' 
  },
  {
    name: "Pre-Marital Coaching",
    image: weddingRingImg, // Replace with your actual imported variable
    text: 'Build a solid foundation before saying "I do." We cover financial planning, family dynamics, and shared values to ensure a lifelong partnership.'
  },
  {
    name: "Virtual Coaching",
    image: coachImg, // Replace with your actual imported variable
    text: 'Access professional guidance from the comfort of your home. Our flexible digital sessions fit into your busy schedule without compromising on impact.'
  }
];

export const reviews: Review[] = [
  {
    name: "Sandra Okafor",
    rating: 5,
    text: "I was on the verge of giving up on my marriage. My husband had become emotionally distant and we hadn't truly connected in over a year. After just a few sessions with her, we finally started having the honest conversations we'd been avoiding for so long. She has a gift for making both people feel heard without taking sides. Our marriage is stronger now than it was on our wedding day.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Michelle Adeyemi",
    rating: 4,
    text: "My husband was struggling with anger issues that were tearing our home apart. I had tried talking to him myself but it always ended in arguments. She created a safe space where he actually opened up for the first time in years. She gave us practical tools we still use every day. I genuinely believe she saved our family.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Grace Nwosu",
    rating: 5,
    text: "After my husband lost his job, the stress pushed us to a really dark place. We were arguing constantly and I felt completely alone in the marriage. She helped us understand that we were both grieving in different ways and taught us how to support each other instead of pulling apart. Six months later my husband found a new role and we came out of that season closer than ever. I can't thank her enough.",
    image: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=150&h=150&fit=crop&crop=face",
  },
];