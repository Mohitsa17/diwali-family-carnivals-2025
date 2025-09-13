export enum Contest {
  NONE = 'NONE',
  SUPERMOM = 'SUPERMOM',
  CUTESTBABY = 'CUTESTBABY',
  SENIORCITIZEN = 'SENIORCITIZEN',
  GENERAL = 'GENERAL'
}

export interface RegistrationData {
  name: string
  age?: number
  whatsapp: string
  email?: string
  contest: Contest
  message?: string
  numberOfChildren?: number
  photoUrl?: string
  videoUrl?: string
}

export interface ContestInfo {
  id: Contest
  title: string
  description: string
  shortDescription: string
  whoCanJoin: string
  rules: string[]
  eligibility: string
  judgingCriteria: string
  contactWhatsApp: string
  sampleImage: string
}

export const CONTESTS: Record<Contest, ContestInfo> = {
  [Contest.NONE]: {
    id: Contest.NONE,
    title: 'General Registration',
    description: 'Join our Diwali Family Carnival for a day of fun, food, and festivities!',
    shortDescription: 'Join our Diwali Family Carnival for a day of fun, food, and festivities!',
    whoCanJoin: 'Everyone is welcome!',
    rules: ['Be respectful to all participants', 'Follow event guidelines'],
    eligibility: 'All ages welcome',
    judgingCriteria: 'N/A',
    contactWhatsApp: '+91-8120174075',
    sampleImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=300&fit=crop'
  },
  [Contest.SUPERMOM]: {
    id: Contest.SUPERMOM,
    title: 'Super Mom',
    description: 'Celebrate the amazing mothers in our community! Showcase your talents, share your story, and compete for the title of Super Mom.',
    shortDescription: 'Celebrate amazing mothers! Showcase talents and compete for the title of Super Mom.',
    whoCanJoin: 'Mothers of age 21-60 year',
    rules: [
      'Must be a mother of age 21 to 60 year.',
      'Submit a short video (max 2 minutes) showcasing your talents or sharing your story',
      'Include a photo of yourself if possible',
      'Be present at the event for final judging'
    ],
    eligibility: 'Mothers of age 21-60 year',
    judgingCriteria: 'Judging would be based on Quize Round, Digital Round of Facebook & Instagram views and Ramp Walk or Fashion Show on traditional and spritual theme.',
    contactWhatsApp: '+91-8120174075',
    sampleImage: '/sm.png'
  },
  [Contest.CUTESTBABY]: {
    id: Contest.CUTESTBABY,
    title: 'Cutest Baby of Indore',
    description: 'Show off your little one\'s adorable smile! Our cutest baby contest is perfect for families with children under 12 years.',
    shortDescription: 'Show off your little one\'s adorable smile! Perfect for babies under 12 years.',
    whoCanJoin: 'Babies and toddlers under 12 years',
    rules: [
      'Child must be under 12 years old',
      'Submit cute photo of your baby',
      'Include baby\'s name and age',
      'Parent/guardian must be present at the event'
    ],
    eligibility: 'Children under 12 years',
    judgingCriteria: 'Decoration and Creativity on the stage based on Traditional and spritual theme Engagement on Facebook and Instagram',
    contactWhatsApp: '+91-8120174075',
    sampleImage: '/cb.jpg'
  },
  [Contest.SENIORCITIZEN]: {
    id: Contest.SENIORCITIZEN,
    title: 'Damdar Dada & Dadi Ji',
    description: 'Honor our wise and wonderful senior citizens! Share your life experiences, talents, or wisdom in this special contest.',
    shortDescription: 'Honor our wise senior citizens! Share life experiences, talents, or wisdom.',
    whoCanJoin: 'Senior citizens (60+ years)',
    rules: [
      'Must be 60 years or older',
      'Share a story, talent, or life experience',
      'Submit a photo and optional short video',
      'Be present at the event for final presentation'
    ],
    eligibility: 'Senior citizens aged 60 and above',
    judgingCriteria: '2 minutes stage performance on story telling Life experience, wisdom, talent, and community contribution and also a part of judging is based on facebook voting on parentsbuddy event page',
    contactWhatsApp: '+91-8120174075',
    sampleImage: '/sc.jpg'
  },
  [Contest.GENERAL]: {
    id: Contest.GENERAL,
    title: 'Free Family Carnival',
    description: 'Join our Diwali Family Carnival for a day of fun, food, and festivities!',
    shortDescription: 'Join our Diwali Family Carnival for a day of fun, food, and festivities!',
    whoCanJoin: 'Everyone is welcome!',
    rules: ['Be respectful to all participants', 'Follow event guidelines'],
    eligibility: 'All ages welcome',
    judgingCriteria: 'N/A',
    contactWhatsApp: '+91-8120174075',
    sampleImage: '/general.webp'
  }
}
