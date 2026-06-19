export interface ThemeInfo {
  emoji: string;
  name: string;
  description: string;
}

export const THEMES: Record<string, ThemeInfo> = {
  "personal-identity": {
    emoji: "👤",
    name: "Personal Identity",
    description: "Name, background, family, occupation",
  },
  "daily-routines": {
    emoji: "🌅",
    name: "Daily Routines",
    description: "Schedules, habits, typical day",
  },
  "food-dining": {
    emoji: "🍜",
    name: "Food & Dining",
    description: "Ordering, preferences, restaurants",
  },
  "directions": {
    emoji: "🗺️",
    name: "Directions",
    description: "Navigation, transport, landmarks",
  },
  "shopping": {
    emoji: "🛍️",
    name: "Shopping",
    description: "Prices, bargaining, transactions",
  },
  "small-talk": {
    emoji: "💬",
    name: "Small Talk",
    description: "Greetings, opinions, casual chat",
  },
  "health": {
    emoji: "🏥",
    name: "Health",
    description: "Symptoms, doctor, pharmacy",
  },
  "work": {
    emoji: "💼",
    name: "Work",
    description: "Meetings, tasks, workplace",
  },
  "leisure": {
    emoji: "🎮",
    name: "Leisure",
    description: "Hobbies, movies, weekend plans",
  },
  "travel": {
    emoji: "✈️",
    name: "Travel",
    description: "Hotels, airports, tourism",
  },
  "relationships": {
    emoji: "❤️",
    name: "Relationships",
    description: "Friends, emotions, feelings",
  },
  "problem-solving": {
    emoji: "🔧",
    name: "Problem-Solving",
    description: "Complaints, requests, clarification",
  },
  "technology": {
    emoji: "📱",
    name: "Technology",
    description: "Phones, apps, internet",
  },
  "education": {
    emoji: "📚",
    name: "Education",
    description: "Studying, classes, learning",
  },
};
