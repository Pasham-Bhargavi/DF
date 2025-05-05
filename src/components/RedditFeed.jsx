// import React, { useEffect, useState } from 'react';
// import RedditCard from './RedditCard';

// const RedditFeed = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('https://www.reddit.com/r/reactjs.json')
//       .then((res) => res.json())
//       .then((data) => setPosts(data.data.children))
//       .catch((err) => console.error('Failed to fetch:', err));
//   }, []);

//   return (
//     <div className="cards-container">
//       {posts.map((post) => (
//         <RedditCard key={post.data.id} post={post.data} />
//       ))}
//     </div>
//   );
// };

// export default RedditFeed;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RedditFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Reddit Data";
  }, []);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        const formattedPosts = data.data.children.map(child => ({
          Title: child.data.title,
          SelfText_HTML: child.data.selftext_html || "<i>No content available.</i>",
          URL: child.data.url && child.data.url.startsWith('http') ? child.data.url : null,
          score: child.data.score,
        }));
        setPosts(formattedPosts);
      })
      .catch(error => console.error("Error fetching Reddit data:", error));
  }, []);



  return (
   <>
  <h1 style={{ color: "white", marginLeft: "35%" }}>Explore Trending ReactJS Topics</h1>
      <div className="container">
        {posts.map((post, index) => (
          <div className="card" key={index} style={{ "--clr": "#03A9F4" }}>
            <div className="img-box">
              <img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png" alt="Reddit post" />
            </div>
            <div className="content">
              <h2>{post.Title}</h2>
              <p dangerouslySetInnerHTML={{ __html: post.SelfText_HTML }}></p>
              <p><strong>Score:</strong> {post.score}</p>
              {post.URL ? (
                <a href={post.URL} target="_blank" rel="noopener noreferrer">Read More</a>
              ) : (
                <p style={{ color: 'red' }}><strong>No URL found</strong></p>
              )}
            </div>
          </div>
        ))}
      </div>
   </>
  );
};

export default RedditFeed;