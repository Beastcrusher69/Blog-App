import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import { PiShareNetworkBold } from "react-icons/pi"
import { BsBookmark } from "react-icons/bs"
import { BsBookmarkFill } from "react-icons/bs"
import { useState , useEffect , useRef } from "react"; 
import axios from 'axios'; 
import { be_url } from '/config'; 
import { useNavigate } from "react-router-dom"; 
import { IoSend } from "react-icons/io5";
import getTimeStamp from "../functions/getTimeStamp" ;
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";

function Article(){
    
    let [liked,setLiked] = useState(false); 
    let [saved,setSaved] = useState(false); 
    let [likeCount , setLikeCount] = useState(null) ;
    let [saveCount , setSaveCount] = useState(null) ;
    let [shareCount , setShareCount] = useState(null) ;
    let [blogId ,setBlogId] = useState(null);
    let [blog , setBlog] = useState(null) ;
    let [user , setUser] = useState(null) ;
    let [viewerIsPoster , setViewerIsPoster] = useState(null) ;
    let [comment , setComment] = useState("") ;
    let [likedComments , setLikedComments] = useState([]) ;  
    let [mappedComments , setMappedComments] = useState([]) ;    
    let [isInputActive , setIsInputActive] = useState(false) ;    

    let navigate = useNavigate(); 
    let enterCmt = useRef(null); 

    useEffect(()=>{

        let urlParams = new URLSearchParams(window.location.search) ;

        setBlogId(urlParams.get('blogId')) ; 
        
    },[])

    useEffect(()=>{ 

        if(blogId){

            axios.post(be_url + "/article" , {blogId}, {withCredentials : true})
    
            .then((res)=>{
    
                console.log(res.data);
                setBlog(res.data.blog) ;
                setMappedComments(res.data.mappedComments) ;
                setUser(res.data.user) ;
                setViewerIsPoster(res.data.viewerIsPoster) ;
                setLiked(res.data.isLiked) ;
                setSaved(res.data.isSaved) ;
                setLikeCount(res.data.blog.likeCount) ;
                setSaveCount(res.data.blog.saveCount) ;
                setShareCount(res.data.blog.shareCount) ;
                setLikedComments(res.data.likedComments) ;

                })
    
            .catch((err)=>{
                console.log(err);
    
                if(err.response.status == 401 || err.response.status == 498){
                    navigate("/login");
                }
            }) // path

        }

    },[blogId])

    useEffect(()=>{

        if(blog){

            blog.comments.forEach(cmt => {

            if(likedComments.includes(cmt.cmtId)){

                document.getElementById(cmt.cmtId).querySelector(".fill").classList.remove("none") ;
                document.getElementById(cmt.cmtId).querySelector(".outline").classList.add("none") ;
    
            }
    
        })}

    } , [blog])

    useEffect(()=>{

        let s = document.querySelector(".comment-input-icon-span") ;

        if(s){
            if(comment == ""){
                s.classList.add("unclickable-btn") ;
            }
            else{
                s.classList.remove("unclickable-btn") ;
            }
        }

    } , [comment]) ;

    useEffect(() => {
        const handleKeyPress = (e) => {
          
          if (e.key == 'Enter' && isInputActive && comment !== "") {
            enterCmt.current.click();
          }
        };
    
        document.addEventListener("keypress", handleKeyPress);
    
        return () => {
          document.removeEventListener("keypress", handleKeyPress);
        };
      }, [isInputActive, comment]);

    function handleLike(){

        let l = liked ;
        let newStatus = !l ;

        if(liked){
            setLikeCount(likeCount - 1) ;
        }
        else{
            setLikeCount(likeCount + 1) ;
        }

        setLiked(!liked) ;

        axios.post(be_url + "/handle-post-like" , {blogId , newStatus} , {withCredentials : true})
             .then((res)=>{
                console.log(res) ;
             })
             .catch((err)=>{
                console.log(err) ;
             })
    }   
    
    function handleSave(){

        let s = saved ;
        let newStatus = !s ;

        if(saved){
            setSaveCount(saveCount - 1) ;
        }
        else{
            setSaveCount(saveCount + 1) ;
        }

        setSaved(!saved) ;

        axios.post(be_url + "/handle-post-save" , {blogId , newStatus} , {withCredentials : true})
             .then((res)=>{
                console.log(res) ;
             })
             .catch((err)=>{
                console.log(err) ;
             })
    }

    function handlePostComment(){

        let p = document.querySelector(".comment-input-icon-span") ;
        let l = document.querySelector(".post-comment-btn-loading") ;

        p.classList.add("none");
        l.classList.remove("none");

        axios.post(be_url + "/handle-post-comment" , {comment , blogId} , {withCredentials : true})
        .then((res)=>{

            setMappedComments(res.data.newComments) ;
            setComment("") ;
            p.classList.remove("none");
            l.classList.add("none");
        })
        .catch((err)=>{
            console.log(err) ;
        })
    } 

    function handleCommentLike(key , code){

        let div = document.getElementById(key) ;

        if(code == 1){ // filled is clicked (unlike)
            div.querySelector(".fill").classList.add("none") ;
            div.querySelector(".outline").classList.remove("none") ;

            // like count change
            setMappedComments(
                mappedComments.map((obj)=>{

                    let newObj = obj ;

                    if(obj.cmtId == key){
                        obj.likeCount-- ;
                    }

                    // return obj ;
                    return newObj ;

                })
            ) ;

        }
        else{ // outline is clicked (like)
            div.querySelector(".fill").classList.remove("none") ;
            div.querySelector(".outline").classList.add("none") ;

            // like count change
            setMappedComments(
                mappedComments.map((obj)=>{

                    let newObj = obj ;

                    if(obj.cmtId == key){
                        obj.likeCount++ ;
                    }

                    // return obj ;
                    return newObj ;

                })
            ) ;

            }

        axios.post(be_url + "/handle-comment-like" , {blogId , cmtId : key , code } , {withCredentials : true})
        .then((res)=>{
            console.log(res) ;
        })
        .catch((err)=>{
            console.log(err) ;
        })
    }
        
    if(blog && user){
    return(
        <main id="article-component">
            
            <div id="article-tbnl-div">
                <img id="article-tbnl" src={blog.coverImgURL}></img>
            </div>

            <div className="profile">

                <div className="profile-wrap" 
                
                onClick={()=>{

                    viewerIsPoster ? navigate("/userprofile") : navigate(`/authorprofile?userId=${user.userId}`) ;

                }}> 

                        <div className="profile-pic-div article-profile-pic-div">
                            <img className="profile-pic" src={user.profilePic}></img>
                        </div>

                        <div>
                            <p id="article-author">{user.firstName} {user.lastName}</p>
                            <p id="article-time">{getTimeStamp(blog.date)}</p>
                        </div>

                </div>

                <div className="empty"></div>

                {viewerIsPoster ? null : <div id="article-follow-wrap">

                    <button id="article-follow-btn">Follow</button>

                </div> }
            </div>

            <h1 id="article-title">{blog.title}</h1>

            <div id="article-body" 
            dangerouslySetInnerHTML={{ __html : blog.body}}
            >
            </div>

            <div id="interaction-bar">

                <div>
                    <div>
                        { liked ? <AiFillHeart onClick={handleLike}/> : <AiOutlineHeart onClick={handleLike}/>}
                    </div>

                    <p>{likeCount}</p>
                </div>

                <div className="empty">
                    
                </div>

                <div>
                    <div>
                        <PiShareNetworkBold/>
                    </div>
                    <p>{shareCount}</p>
                </div>

                <div>

                    <div>
                        { saved ? <BsBookmarkFill onClick={handleSave}/> : <BsBookmark onClick={handleSave}/>}  
                    </div>

                    <p>{saveCount}</p>
                </div>


            </div>

            <div id="comment-section">

                <div id="comment-input-wrap">

                    <input type="text"
                        id="comment-input"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e)=>{ setComment(e.target.value) }} 
                        onFocus={()=>{ setIsInputActive(true)}}
                        onBlur={()=>{ setIsInputActive(false)}}
                        />

                    <span 
                    // id="post-comment-btn-loading"
                    className="none post-comment-btn-loading"
                    >

                        <AiOutlineLoading3Quarters className="loading-icon"/>

                    </span>

                    <span 
                    // id="comment-input-icon-span"
                    ref = {enterCmt}
                    className="unclickable-btn comment-input-icon-span"
                    onClick={handlePostComment}
                    >
                        <IoSend />
                    </span>
                </div>


                <h3>Comments</h3>

                <div id="all-comments">

               {mappedComments.map((cmt)=>{

                    return(

                    <div className="comment-wrap" key={cmt.cmtId} id={cmt.cmtId}>

                        <div className="profile">

                            <div className="profile-pic-div comment-profile-pic-div">
                                <img className="profile-pic" src={cmt.profilePic}></img>
                            </div>

                            <div className="test">
                                <p className="comment-author">{cmt.firstName} {cmt.lastName}</p>
                                <GoDotFill className="dot"/>
                                <p className="comment-time">{getTimeStamp(cmt.date)}</p>
                            </div>

                        </div>

                        <p className="comments">{cmt.comment}</p>

                        <div className="comment-like-div">
                            <span className="comment-icon-span">
                            <AiFillHeart className="none fill" 
                            onClick={()=>{handleCommentLike(cmt.cmtId , 1)}}/><AiOutlineHeart className="outline" 
                            onClick={()=>{handleCommentLike(cmt.cmtId , 2)}}/>
                            </span>

                            <span>
                                {cmt.likeCount}
                            </span>

                        </div>

                    </div>

                    )

               })}   

            </div>      

            </div>
            
        </main>
    )
    }
}

export default Article;