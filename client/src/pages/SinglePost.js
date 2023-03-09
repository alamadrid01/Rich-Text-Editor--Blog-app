import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Editor,
  EditorState,
  convertFromRaw,
  CompositeDecorator,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TagMention = (contentBlock, callback, contentState) => {
  const text = contentBlock.getText();
  const handleRegex = /\@\w+/g;

  let matchArr;
  while ((matchArr = handleRegex.exec(text)) !== null) {
    const start = matchArr.index;
    const end = matchArr.index + matchArr[0].length;
    callback(start, end);
  }
  return null;
};

const HashMention = (contentBlock, callback, contentState) => {
  const text = contentBlock.getText();
  const regex = /\#\w+/g;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    const end = match.index + match[0].length;

    callback(start, end);
  }
  return null;
};

const Mention = (props) => {
  return (
    <span style={{ color: "green", fontWeight: "bold" }}>{props.children}</span>
  );
};
const HashtagSpan = (props) => {
  return <span style={{ color: "blue" }}>{props.children} </span>;
};

const Viewer = () => {
  const Navigate = useNavigate();
  const mentionDecorator = new CompositeDecorator([
    {
      strategy: TagMention,
      component: Mention,
    },
    {
      strategy: HashMention,
      component: HashtagSpan,
    },
  ]);

  const [blogPosts, setBlogPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    axios.get(`https://blog-app-v8b8.onrender.com/api/blog/${slug}`).then((response) => {
      const mainData = response.data;
      setBlogPosts(mainData);
      setLoading(false);

      const data = JSON.parse(mainData.body);
      const contentState = convertFromRaw(data);
      setEditorState(
        EditorState.createWithContent(contentState, mentionDecorator)
      );
    }).catch((err) =>{
      toast.error("Error retrieving this post, try refreshing this page", err.message)
    })
  }, [slug]);

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();

    switch (type) {
      case "unordered-list-item":
        return "superFancyBlockquote";

      case "blockquote":
        return "blockquote";

      case "underline":
        return "Underline";

      case "ordered-list-item":
        return "superFancyBlockquote";

      case "header-one":
        return "headerOne";

      case "header-two":
        return "headerTwo";

      case "header-three":
        return "headerThree";

      case "header-four":
        return "headerFour";

      case "header-five":
        return "headerFive";

      case "header-six":
        return "headerSix";

      default:
        break;
    }
  };

  return (
    <>
    <ToastContainer />
      {loading ? (
        <div className="spinner w-[50%] mx-auto mt-5"></div>
      ) : (
        <section className="px-5 xl:max-w-6xl xl:mx-auto pb-20">
          <button
            onClick={() => Navigate("/")}
            className="mt-[30px] bg-black text-white hover:opacity-75 transition-all duration-500 px-2 py-2 lg:text-x text-sm rounded-md "
          >
            Go back
          </button>
          <div className="flex flex-col gap-2 mt-[80px]">
            <div className="items-center justify-center flex lg:mt-[0%] mt-[1%]">
              <h1 className="uppercase font-semibold lg:text-4xl text-2xl text-center w-[600px] header">
                {blogPosts.title}
              </h1>
            </div>
            <div>
              <div className="items-center justify-center flex lg:pt-[3%] pt-[5%]">
                <div className="w-[800px] h-[350px]">
                  <img
                    src={blogPosts.blogImage.path}
                    className="w-full h-full object-cover rounded-md"
                    alt="blog-i"
                  />
                </div>
              </div>
              <div className="mt-[7%]">
                <Editor
                  editorState={editorState}
                  readOnly={true}
                  blockStyleFn={myBlockStyleFn}
                />
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="flex gap-2 justify-end ">
        <h3 className="text-lg">Blog by: </h3>
        <h3 className="text-lg">
          <b>{blogPosts.author}</b>
        </h3>
      </div>
    </>
  );
};

export default Viewer;
