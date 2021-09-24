import React from "react";
import University from "./university"
import "./university-list.scss";

const UniversityList = () => {
    return <div className="university-list" >
                <h2>P2P University</h2>
                <div className="university-list-sec">
                    <University 
                        title="Lender Handbook" 
                        univerityLink="https://app.lendenclub.com/lender-handbook"
                        unversityImage="books"
                    />
                    <University 
                        title="Industry News" 
                        univerityLink="https://www.lendenclub.com/media-center/"
                        unversityImage="news"
                    />
                    <University 
                        title="Blogs & Videos" 
                        univerityLink="https://www.lendenclub.com/blog"
                        unversityImage="blogs"
                    />
                </div>
        </div>;
};

export default UniversityList;
