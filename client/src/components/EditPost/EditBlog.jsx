import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import Navbar from "../Navbar";
import { setInlineStyleOverride } from "draft-js/lib/EditorState";
import axios from "axios";
import "draft-js/dist/Draft.css";
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

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
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
const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={{ color: "blue", textDecoration: "underline" }}>
      {props.children}
    </a>
  );
};
const Mention = (props) => {
  return (
    <span style={{ color: "green", fontWeight: "bold" }}>{props.children}</span>
  );
};
const HashtagSpan = (props) => {
  return <span style={{ color: "blue" }}>{props.children} </span>;
};

const EditBlog = () => {
  const decoratorRef = useRef();
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
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty(mentionDecorator)
    );

  const submitHandler = async (e) => {
    e.preventDefault();

    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    if (
      title === "" ||
      rawContentState === "" ||
      author === "" ||
      // image === "" ||
      description === ""
    ) {
      toast.error("Yooo!, fill in all the input fields");
      setError(true);
    } else {
      setSubmit(true);
      const bodyData = new FormData();
      bodyData.append("title", title);
      bodyData.append("body", JSON.stringify(rawContentState));
      bodyData.append("author", author);
      // bodyData.append("image", image);
      bodyData.append("description", description);

      console.log([...bodyData]);

      try {
        const Response = await axios.patch(
          `https://blog-app-v8b8.onrender.com/api/blog/${id}`,
          bodyData
        );
        const slug = Response.data._id;
        toast.success("Post has been updated successfully");
        setTimeout(() => {
          Navigate(`/blog/${slug}`);
        }, 1200);
      } catch (err) {
        setSubmit(false);
        console.error(err.message);
        toast.error("Error updating this post");
      }
    }
  };

  const [activeHeader, setActiveHeader] = useState(null);
  const [check, setCheck] = useState(false);
  const [inlineCheck, setInlineCheck] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [blogPosts, setBlogPosts] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorChange = (event) => {
    setEditorState(event);
  };
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleToggleBlock = (event, blockType) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    setActiveHeader(blockType);
  };

  const buttonStyle = (headerType) =>
    activeHeader === headerType && !check
      ? { backgroundColor: "lightblue", padding: "2px", borderRadius: "6px" }
      : { backgroundColor: "transparent" };

  const handleToggleInline = (event, inlineStyle) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const buttonInlineStyle = (style) =>
    inlineCheck
      ? { backgroundColor: "lightblue", padding: "2px", borderRadius: "6px" }
      : { backgroundColor: "transparent" };

  const selectionState = editorState.getSelection();
  const anchorOffset = selectionState.getAnchorOffset();
  // console.log(anchorOffset);

  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    blockMap.forEach((block) => {
      // console.log('block', block);
      if (block.type === "unstyled") {
        setCheck(true);
      } else {
        setCheck(false);
      }
    });
  }, [editorState]);
  React.useEffect(() => {
    const currentStyle = editorState.getCurrentInlineStyle();
    currentStyle.map((item) => {
      if (item === "") {
        setInlineCheck(!inlineCheck);
      }
    });
  }, [editorState]);

  const {id} = useParams();

  React.useEffect(() => {
    const getPost = async () => {
      try{
        const Response = await axios.get(
          `https://blog-app-v8b8.onrender.com/api/blog/${id}`
        );

        setAuthor(Response.data.author);
        setDescription(Response.data.description);
        setTitle(Response.data.title);

        const mainData = Response.data;
        setBlogPosts(mainData);
        setIsLoading(false);

        const data = JSON.parse(mainData.body);
        const contentState = convertFromRaw(data);
        setEditorState(
          EditorState.createWithContent(contentState, mentionDecorator)
        );
      }catch(err){
        console.log(error);
        setIsLoading(false);
      }
    }
    getPost();
  }, [])

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const contentState = editorState.getCurrentContent();
  const contentAsText = contentState.getPlainText();

  return (
    <div className="my-5">
      <ToastContainer />
      <Navbar />
      <h1 className="font-bold text-3xl text-center mt-[80px]">Update blog</h1>
      {isLoading ? (
        <div className="spinner w-[50%] mx-auto mt-5"> </div>
      ) : (
        <>
          {/* <form className="flex flex-col gap-3 mt-10">
        <label className="text-lg" htmlFor="image">
          Image:
        </label>
        <div className="shrink-0"></div>
        <label className="block">
          <input
            type="file"
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-[1.5px] file:border-violet-600
              file:text-md file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        {error && image <= 0 ? (
          <p className="text-[red] mt-0 ml-1 text-[15px]">Image is required</p>
        ) : (
          ""
        )}
      </form> */}
          <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="title">
                Title:
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-3 px-2 focus:outline-indigo-600 border-[1.5px] rounded-md border-gray-400"
                type="text"
                id="title"
                name="title"
                required
                autoFocus
              />
              {error && title <= 0 ? (
                <p className="text-[red] mt-0 ml-1 text-[15px]">
                  Title of the blog is required
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="description">
                Description:
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-3 px-2 focus:outline-indigo-600 border-[1.5px] rounded-md border-gray-400"
                type="text"
                id="description"
                name="description"
                required
              />
              {error && description <= 0 ? (
                <p className="text-[red] mt-0 ml-1 text-[15px]">
                  Description for the blog is required
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-lg" htmlFor="author">
                Author:
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="py-3 px-2 focus:outline-indigo-600 border-[1.5px] rounded-md border-gray-400"
                type="text"
                id="author"
                name="author"
                required
              />
              {error && author <= 0 ? (
                <p className="text-[red] mt-0 ml-1 text-[15px]">
                  Author of the blog is required
                </p>
              ) : (
                ""
              )}
            </div>
          </form>
          <div className="flex flex-col gap-3 mt-5">
            <label className="text-lg" htmlFor="content">
              Content:
            </label>
            <div
              className="border border-indigo-600 min-h-[250px] p-3 rounded-md"
              ref={decoratorRef}
            >
              <div className="button flex flex-wrap gap-4 mb-4 border-b-2 border-indigo-500 pb-2">
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-one")}
                  style={buttonStyle("header-one")}
                >
                  H1
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-two")}
                  style={buttonStyle("header-two")}
                >
                  H2
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-three")}
                  style={buttonStyle("header-three")}
                >
                  H3
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-four")}
                  style={buttonStyle("header-four")}
                >
                  H4
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-five")}
                  style={buttonStyle("header-five")}
                >
                  H5
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "header-six")}
                  style={buttonStyle("header-six")}
                >
                  H6
                </button>
                <button
                  onMouseDown={(e) =>
                    handleToggleBlock(e, "unordered-list-item")
                  }
                  style={buttonStyle("unordered-list-item")}
                >
                  UL
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "ordered-list-item")}
                  style={buttonStyle("ordered-list-item")}
                >
                  OL
                </button>
                <button
                  onMouseDown={(e) => handleToggleBlock(e, "blockquote")}
                  style={buttonStyle("blockquote")}
                >
                  Blockquote
                </button>
                <button
                  onMouseDown={(e) => handleToggleInline(e, "BOLD")}
                  style={buttonInlineStyle("BOLD")}
                  className="ml-5"
                >
                  Bold
                </button>
                <button onMouseDown={(e) => handleToggleInline(e, "ITALIC")}>
                  Italic
                </button>
                <button onMouseDown={(e) => handleToggleInline(e, "UNDERLINE")}>
                  Underline
                </button>
                <button
                  onMouseDown={(e) => handleToggleInline(e, "STRIKETHROUGH")}
                >
                  Strikethrough
                </button>
              </div>
              <Editor
                className="my-editor"
                editorState={editorState}
                onChange={handleEditorChange}
                handleKeyCommand={handleKeyCommand}
                blockStyleFn={myBlockStyleFn}
                spellCheck={true}
              />
            </div>
            {error && contentAsText <= 0 ? (
              <p className="text-[red] mt-0 ml-1 text-[15px]">
                Content for the blog is required
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex justify-end ">
            <button
              className={`${
                submit ? "bg-indigo-400" : "bg-indigo-800"
              } rounded-md text-white px-5 py-3 align-right mt-5 hover:bg-indigo-600`}
              onClick={submitHandler}
              disabled={submit}
            >
              Update post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditBlog;
