import { useState } from "react";
import {IoClose} from "react-icons/io5"
import ExploreHeader from "./ExploreHeader.jsx";
import Blogs from "./blogs.jsx";
import People from "./people.jsx";

function Explore(){

    let [filter , setFilter] = useState(false);
    let [blogsPeopleToggle , setBlogsPeopleToggle] = useState("blogs");

    return(
        <div id="explore-wrap">

            <div id="explore-layer" 
            style={{"filter" : filter ?  "blur(8px)" :  "none" } }
            >
                <ExploreHeader></ExploreHeader>

                <main id="explore-main">

                    <div id="blogs-people-wrap">

                        <button id="blogs-btn" 
                                className={ blogsPeopleToggle == "blogs" ? "active" : null} 
                                onClick={()=>{ setBlogsPeopleToggle("blogs")}}>
                            blogs
                        </button>

                        <button id="people-btn" 
                                className={ blogsPeopleToggle == "people" ? "active" : null} 
                                onClick={()=>{ setBlogsPeopleToggle("people")}}>
                            people
                        </button>

                    </div>

                    { blogsPeopleToggle == "blogs" ? <Blogs filter={filter} setFilter={setFilter}></Blogs> : <People></People>}

             </main>       

            </div>
                    <div id="filter-dialogbox-wrap" style={{"display" : filter ?  "grid" :  "none"}}>
            <div id="filter-dialogbox">
                <IoClose className="close-btn" onClick={()=>{ setFilter(!filter) }}></IoClose>

                <div id="filter-sections-wrap">
                    <div className="filter-sections" id="upload-date-section">
                        <div className="filter-section-headings">upload date</div>
                        <ul id="upload-date-list">
                            <li>
                                <input type='radio' id="today" name="upload-date" value="today"/>
                                <label htmlFor="today">today</label>
                            </li>

                            <li>
                                <input type='radio' name="upload-date" value="this week"/>
                                <label htmlFor="this week">this week</label>
                            </li>

                            <li>
                                <input type='radio' name="upload-date" value="this month"/>
                                <label htmlFor="this month">this month</label>
                            </li>

                            <li>
                                <input type='radio' name="upload-date" value="this year"/>
                                <label htmlFor="this year">this year</label>
                            </li>
                        </ul>
                    </div>

                    <div className="filter-sections" id="duration-section">
                        <div className="filter-section-headings">duration</div>
                        <div> 
                            less than <input type="number" id="duration" name="duration"/> minutes
                        </div>
                        
                    </div>

                    <div className="filter-sections" id="categories-section">
                        <div className="filter-section-headings">categries</div>
                        <ul id="categories-list">
                            <li>
                                <input type="radio" name="category" id="fashion" value="fashion"></input>
                                <label htmlFor="fashion">fashion</label>
                            </li>
                            <li>
                                <input type="radio" name="category" id="food" value="food"></input>
                                <label htmlFor="food">Food</label>
                            </li>
                            <li>
                                <input type="radio" name="category" id="travel" value="travel"></input>
                                <label htmlFor="travel">Travel</label>
                            </li>
                            <li>
                                <input type="radio" name="category" id="business" value="business"></input>
                                <label htmlFor="business">Business</label>
                            </li>
                            <li>
                                <input type="radio" name="category" id="sports" value="sports"></input>
                                <label htmlFor="sports">Sports</label>
                            </li>
                            <li>
                                <input type="radio" name="category" id="health&fitness" value="health&fitness"></input>
                                <label htmlFor="health&fitness">Health & Fitness</label>
                            </li>  
                            <li>
                                <input type="radio" name="category" id="others" value="others"></input>
                                <label htmlFor="others">Others</label>
                            </li>                                  
                        </ul>

                    </div>

                </div>

                <button id="apply-filters" >Apply Filters</button>
            </div>
            </div>
        </div>
    )
}

export default Explore; 