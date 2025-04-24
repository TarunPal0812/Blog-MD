import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {

    const [posts, setPosts] = useState([])

    


    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("Try to fetch data..");

                const res = await axios.get(`http://localhost:5000/api/v1/posts/?cat=${cat}`)
                setPosts(res.data)
                // console.log(res.data);

            } catch (error) {
                console.log(error);

            }
        }

        fetchData()

    }, [cat])

    // const posts = [
    //     {
    //         "id": 1,
    //         "title": "Sunset Over the Mountains",
    //         "desc": "A breathtaking view of the sun setting behind the snowy peaks.",
    //         "img": "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    //     },
    //     {
    //         "id": 2,
    //         "title": "City Lights at Night",
    //         "desc": "The city comes alive with lights after sunset, showcasing its vibrant nightlife.",
    //         "img": "https://images.unsplash.com/photo-1497493292307-31c376b6e479"
    //     },
    //     {
    //         "id": 3,
    //         "title": "Forest Pathway",
    //         "desc": "A peaceful walk through the heart of a dense green forest.",
    //         "img": "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    //     },
    //     {
    //         "id": 4,
    //         "title": "Snowy Cabin Retreat",
    //         "desc": "A cozy cabin surrounded by snow, perfect for a winter getaway.",
    //         "img": "https://images.unsplash.com/photo-1549921296-3cce903855cd"
    //     },
    //     {
    //         "id": 5,
    //         "title": "Ocean Breeze",
    //         "desc": "Waves crashing onto the shore under a clear blue sky.",
    //         "img": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    //     },
    //     {
    //         "id": 6,
    //         "title": "Desert Dunes",
    //         "desc": "Golden sand dunes stretching into the horizon, kissed by the sun.",
    //         "img": "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    //     },
    //     {
    //         "id": 7,
    //         "title": "Morning in the Village",
    //         "desc": "Smoke rises from chimneys as the village wakes up to a new day.",
    //         "img": "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759"
    //     },
    //     {
    //         "id": 8,
    //         "title": "Bridge Over Calm Waters",
    //         "desc": "A wooden bridge over a serene lake, reflecting the sky above.",
    //         "img": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
    //     },
    //     {
    //         "id": 9,
    //         "title": "Colorful Hot Air Balloons",
    //         "desc": "A sky full of vibrant hot air balloons during a morning festival.",
    //         "img": "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92"
    //     },
    //     {
    //         "id": 10,
    //         "title": "Starry Night in the Mountains",
    //         "desc": "The Milky Way stretching above the rugged mountain terrain.",
    //         "img": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    //     }
    // ]


  return (
   <div className="menu">
    <h1>Other posts you may like</h1>
    {
        posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={`/uploads/${post.img}`} alt="" />  
              <h2>{post.title}</h2>
              <button>Read More</button>
            </div>
        ))
    }
   </div>
  )
}

export default Menu