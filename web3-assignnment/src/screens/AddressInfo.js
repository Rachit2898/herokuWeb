import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import postService from "../services/post";
import { sessionManager } from "../managers/sessionManager";
import { ThumbUpAltOutlined, ChatOutlined } from "@material-ui/icons";
import "./UseScreen.css";
import FormDialog from "./dialogBox";
import ToastService from "react-material-toast";
import utility from "../services/utility";
import post from "../services/post";
import postModules from "../services/post";
import WalletScreen from "../screens/WalletScreen";

const AddressCard = () => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [openComment, setOpenComment] = React.useState(false);
  const [id, setId] = React.useState("");
  const [idData, setIdData] = React.useState("");
  const [address, setAddress] = React.useState("");

  const toast = ToastService.new({
    place: "topRight",
    duration: 3,
    maxCount: 5,
  });
  const image = sessionManager.getDataFromLocalStorage("pic");;

  const [img, _setImg] = useState("");

  const setImg = () => {
    if (!image) {
      _setImg(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
      );
    } else {
      _setImg(
        image
      );
    }
  };
  useEffect(() => {
    setImg(img);
  }, [image]);

  const apiFailureToast = (message) => {
    toast.error(message ? message : "apiConstant.API_FAILURE");
  };

  const apiSuccessToast = (msg) => {
    toast.success(msg ? msg : "apiConstant.API_SUCCESS");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const likeButton = async (id) => {
    const data = await parseResponse(postService.likePost(id));
    console.log(data);
    if (data[1]) {
      window.location.reload();
    }
  };

  const unlikeButton = async (id) => {
    const data = await parseResponse(postService.unLikePost(id));
  };

  const [dataPost, setDataPost] = useState(null);
  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };

  const getData = async () => {
    const data = await parseResponse(postService.getAllPost());
    const addresses = await parseResponse(postService.getAllAddress());
    setAddress(addresses[1].response);

    setDataPost(data[1]);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    const data = {
      postId: idData,
      text: comment,
    };
    console.log(data);

    const response = await parseResponse(postModules.comment(data));
    console.log(response);
    if (response[1].successCode == 200) {
      apiSuccessToast("Success", response.message);
      window.location.reload();
    } else {
      apiFailureToast("Failed");
    }
  };

  const openCommentSection = (id) => {
    setIdData(id);
    if (openComment == true) {
      setOpenComment(false);
    } else {
      setOpenComment(true);
    }
  };

  return (
    <>
      {dataPost ? (
        <div className="cards">
          <Card className="addressCard_1" >
            <div className="headingCoin">
              <h3>User's with same coin</h3>
            </div>
            {address ? (
              <div>
                {address.map((coins) => {
                  console.log(coins.createdBy?.name)
                  return (
                    <div className="userAddress">
                      <div className="userAddressHeading">
                        <div className="userNAME">
                          <p>{coins.createdBy?.name}</p>
                        </div>
                        <div className="userAddress">
                          <p>{coins.coinName}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="userAddressHeading">
               <h3>No Users yet</h3>
              </div>
            )}
          </Card>
          <div className="middleCard">
            <Card className="postCard">
              <div className="Card_2Area">
                <div>
                  <img
                    className="avtar_logo"
                    src={img}
                  />
                </div>

                <FormDialog className="dialogButton" />
              </div>
            </Card>
            <Card className="postCard_2">
              {dataPost.response.map((item) => {
                const currentTime = Date.now();
                const date = item.createdAt;
                const toTimestamp = () => {
                  const dt = Date.parse(item.createdAt);
                  return dt;
                };
                const time = utility.timeDiff(currentTime, toTimestamp(date));

                return (
                  <div className="post">
                    <div className="postUser">
                      <div className="userName">
                        <p key={item.postedBy?.name}>{item.postedBy?.name}</p>
                      </div>
                      <div className="postTime">
                        <p> {time}</p>
                      </div>
                    </div>
                    <div className="postContent">
                      <p key={item.body} className="postText">
                        {item.body}
                      </p>
                    </div>
                    <div className="postLikeComment">
                      <div className="likeButton">
                        {item.length}
                        <ThumbUpAltOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            likeButton(item._id);
                          }}
                        />
                        <p className="likesLength">
                          <b>{item.likes.length} likes</b>
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          openCommentSection(item._id);
                        }}
                        className="commentButton"
                      >
                        <p className="commentLength">
                          <b> {item.comments.length} comments</b>
                        </p>
                        <ChatOutlined />
                      </div>
                    </div>
                    {openComment == true ? (
                      <div className="commentSection">
                        <div className="commentText">
                          <input
                            className="commentTextArea"
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          />
                          <button
                            className="commentPostButton"
                            onClick={handleComment}
                          >
                            POST
                          </button>
                        </div>

                        {item.comments.map((record) => {
                          console.log(record);
                          console.log(record.postedBy?.name);
                          const currentTime = Date.now();
                          const date = record.createdAt;
                          const toTimestamp = () => {
                            const dt = Date.parse(record.createdAt);
                            return dt;
                          };
                          const time = utility.timeDiff(
                            currentTime,
                            toTimestamp(date)
                          );
                          console.log(time);
                          return (
                            <div className="commentSection">
                              <div className="readCommnetSection">
                                <div className="commnetUserName">
                                  <div className="userNameComment">
                                    <p>{record.postedBy?.name}</p>
                                  </div>
                                  <div className="commnetTime">
                                    <p>{time}</p>
                                  </div>
                                </div>
                                <div className="commentsVisible">
                                  <p>{record.text}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </Card>
          </div>

          <Card className="addressCard_3">
            <WalletScreen/>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default AddressCard;
