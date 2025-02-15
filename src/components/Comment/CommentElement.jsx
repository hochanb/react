import { useEffect, useState } from "react";
import { getUser, updateComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const CommentElement = (props) => {
  const { comment, handleCommentDelete } = props;
  const [content, setContent] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);

  const [user, setUser] = useState(null);

  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);
  
	// 추가
  const handleEditComment = () => {
    updateComment(comment.id, { content: content });
  };
	// updateComment 활용


  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {isEdit ? (
          <input
            className="input mr-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="text-lg mr-4">{comment.content}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
			{/* 수정 */}

      {user?.id === comment.author?.id ? (
        <div className="w-1/4 flex flex-row-reverse items-center">
          {isEdit ? (
            <>
              <button onClick={handleEditComment}>Done</button>

              <button
                className="mr-3"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setContent(comment.content);
                }}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleCommentDelete(comment.id)}>
                Del
              </button>
              <button className="mr-3" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
            </>
          )}
        </div>
      ) : null}

			{/* 수정 */}
    </div>
  );
};
export default CommentElement;