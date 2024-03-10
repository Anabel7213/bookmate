import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid"

export default async function SubmitBookData(e, date, customDescription, data, extra, myRating, activeItem, pagesRead, questionnaireState, freeFormState, setBooKRefId) {
    e.preventDefault(); 
        const bookData = {
          id: uuidv4(),
          date: date || { from: "", to: "" },
          title: data?.title,
          author: data?.author_name[0] || "",
          subject: data?.subtitle || extra?.subtitle || "",
          pages: data?.number_of_pages_median || 0,
          communityRating: data?.ratings_average || 0,
          isbn: data?.isbn[0] || "",
          yearPublished: data?.first_publish_year || "",
          cover: `https://covers.openlibrary.org/b/id/${data?.cover_i}-L.jpg` || "",
          myRating: myRating || "",
          status: activeItem?.Status?.name || "",
          bookshelf: activeItem?.Bookshelf?.name || "",
          progress: pagesRead || 0,
          description: customDescription || extra?.description?.value?.replace(/^"|"$/g, "") || "",
        };
        const aggregatedData = {
          ...bookData,
          questionnaireData: questionnaireState,
          freeFormData: freeFormState,
        };
        try {
          const bookRef = await addDoc(
            collection(db, "books"),
            aggregatedData
          );
          setBooKRefId(bookRef.id);
        } catch (err) {
          console.error("Error saving the looked up book to the database" + err);
          toast.error("Failed to Save!", {
            style: {
              border: "1px solid #5C493E",
              padding: "16px",
              color: "#5C493E",
            },
          });
        } finally {
          toast.success("Saved!", {
            style: {
              border: "1px solid #5C493E",
              padding: "16px",
              color: "#5C493E",
            },
            iconTheme: {
              primary: "#5C493E",
              secondary: "#FCFAF8",
            },
          });
        }
}