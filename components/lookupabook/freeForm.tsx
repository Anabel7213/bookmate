import { useState } from "react";
import { Dot, X } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

export default function FreeForm({ onClose, onFreeFormChange, freeFormData }) {
  const [formData, setFormData] = useState(freeFormData);
  const { takeaway1, takeaway2, takeaway3, thoughts } = freeFormData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const freeFormData = {
      keyTakeaways: [takeaway1, takeaway2, takeaway3],
      thoughts,
    };
    try {
      const docRef = await addDoc(
        collection(db, "freeFormResponses"),
        freeFormData
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };
  const handleChange = (name, value) => {
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onFreeFormChange(updatedFormData);
  };
  return (
    <div className="w-full md:w-[600px] text-brown fixed backdrop-blur-xl shadow-popup self-center bg-white rounded-[4px] border border-brown p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <h1>Key takeaways</h1>
            <div
              onClick={onClose}
              className="text-brown/50 hover:text-brown transition-all hover:bg-brown/10 cursor-pointer self-end justify-end flex p-1 w-fit rounded-[4px]"
            >
              <X size={20} strokeWidth={1} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {["takeaway1", "takeaway2", "takeaway3"].map((name, index) => (
              <div key={index} className="flex items-center gap-2">
                <Dot />
                <input
                  type="text"
                  value={formData[name] || ""} 
                  onChange={(e) => handleChange(name, e.target.value)} 
                  className="outline-none border-b border-brown w-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h1>My thoughts</h1>
          <textarea
            value={formData.thoughts || ""} 
            onChange={(e) => handleChange("thoughts", e.target.value)}
            className="h-[300px] mt-3 outline-none w-full border border-brown p-4 rounded-[4px] resize-none bg-transparent overflow-scroll"
          />
        </div>
      </form>
    </div>
  );
}