import {
  BookOpenText,
  BookUser,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkX,
  CalendarDays,
  NotepadText,
  ScanBarcode,
  Star,
} from "lucide-react";
interface BookLookupFieldsProps {
  data?: any;
  extra?: any;
  book?: any
}
export const bookLookupFields = ({ data, extra, book }: BookLookupFieldsProps) => [
  {
    name: "Author",
    icon: <BookUser strokeWidth={1} />,
    value: data?.author_name[0] || book?.author || "",
  },
  {
    name: "Subject",
    icon: <BookOpenText strokeWidth={1} />,
    value: data?.subtitle || extra?.subtitle || book?.subject || "",
  },
  {
    name: "Pages",
    icon: <NotepadText strokeWidth={1} />,
    value: data?.number_of_pages_median || book?.pages || "",
  },
  {
    name: "Rating",
    icon: <Star strokeWidth={1} />,
    value: data?.ratings_average || book?.communityRating || "",
  },
  {
    name: "ISBN",
    icon: <ScanBarcode strokeWidth={1} />,
    value: data?.isbn[0] || book?.isbn || "",
  },
  {
    name: "Year",
    icon: <CalendarDays strokeWidth={1} />,
    value: data?.first_publish_year || book?.yearPublished || "",
  },
];

export const dropdownItems = [
  {
    name: "Status",
    items: [
      {
        id: 1,
        name: "To Read",
        icon: <BookmarkPlus strokeWidth={1} />,
      },
      {
        id: 2,
        name: "Reading",
        icon: <Bookmark strokeWidth={1} />,
      },
      {
        id: 3,
        name: "Read",
        icon: <BookmarkCheck strokeWidth={1} />,
      },
      {
        id: 4,
        name: "Abandoned",
        icon: <BookmarkX strokeWidth={1} />,
      },
    ],
  },
  {
    name: "Bookshelf",
    items: [
      {
        id: 1,
        name: "Fiction",
      },
      {
        id: 2,
        name: "Non Fiction",
      },
    ],
  },
];

export const types = [
  {
    name: "Book",
  },
  {
    name: "Audiobook",
  },
];
export const radios = [
  {
    name: "Ending",
    options: [
      {
        name: "Strong",
      },
      {
        name: "Weak",
      },
    ],
  },
  {
    name: "Pace",
    options: [
      {
        name: "Slow",
      },
      {
        name: "Medium",
      },
      {
        name: "Fast",
      },
    ],
  },
];
export const oneLiners = [
  { name: "Favorite character", stateKey: "favoriteCharacter" },
  { name: "Favorite moment", stateKey: "favoriteMoment" },
];
export const moods = [
  "Captivating",
  "Informative",
  "Inspiring",
  "Adventurous",
  "Hilarious",
  "Challenging",
  "Tense",
  "Saddening",
  "Relaxing",
  "Dark",
  "Boring",
  "Emotional",
];
export const ranges = [
  {
    name: "Engagement",
  },
  {
    name: "Characters",
  },
  {
    name: "Ease of reading",
  },
];
