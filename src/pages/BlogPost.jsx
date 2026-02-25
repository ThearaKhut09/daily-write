import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function BlogPost() {
  const navigate = useNavigate();
  const editorRootRef = useRef(null);
  const quillInstanceRef = useRef(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!editorRootRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(editorRootRef.current, {
      theme: "snow",
      placeholder: "Write your post content...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    return () => {
      quillInstanceRef.current = null;
    };
  }, []);

  const navigate = useNavigate();
  const editorRootRef = useRef(null);
  const quillInstanceRef = useRef(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!editorRootRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(editorRootRef.current, {
      theme: "snow",
      placeholder: "Write your post content...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    return () => {
      quillInstanceRef.current = null;
    };
  }, []);

  return (
    <div>BlogPost</div>
  )
}
