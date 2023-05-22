import React, {useState} from 'react';


const data=[
    {
        "id":1,
        "images": [
            {
                "public_id": "nextjs_media/pb8fnxyickqqe9krov82",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605263280/nextjs_media/pb8fnxyickqqe9krov82.jpg"
            },
            {
                "public_id": "nextjs_media/irfwxjz56x4xa6pdwoks",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605263281/nextjs_media/irfwxjz56x4xa6pdwoks.jpg"
            }
        ],
        "checked": false,
        "inStock": 500,
        "sold": 0,
        "title": "animal",
        "price": 5,
        "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
        "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        "category": "5faa35a88fdff228384d51d8"
    },
    {
        "id":2,
        "images": [
            {
                "public_id": "nextjs_media/jdi9qo0oiinwik8uxzxn",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605278590/nextjs_media/jdi9qo0oiinwik8uxzxn.jpg"
            },
            {
                "public_id": "nextjs_media/k2pjwtpzolcieioacnu2",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605278591/nextjs_media/k2pjwtpzolcieioacnu2.jpg"
            },
            {
                "public_id": "nextjs_media/qbh6auephsy5leaapsu1",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605278592/nextjs_media/qbh6auephsy5leaapsu1.jpg"
            },
            {
                "public_id": "nextjs_media/gnsgrxorl5utlnxygjn6",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605278594/nextjs_media/gnsgrxorl5utlnxygjn6.jpg"
            },
            {
                "public_id": "nextjs_media/w8qj2rlrhh1es8wxhcui",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605278596/nextjs_media/w8qj2rlrhh1es8wxhcui.jpg"
            }
        ],
        "checked": false,
        "inStock": 300,
        "sold": 10,
        "title": "wedding invitation",
        "price": 5,
        "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
        "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        "category": "5faa35b58fdff228384d51da"
    },
    {
        "id":3,
        "images": [
            {
                "public_id": "nextjs_media/u8qltexka25minj2rj46",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605318879/nextjs_media/u8qltexka25minj2rj46.jpg"
            },
            {
                "public_id": "nextjs_media/wb5osprab71emsxp3ibm",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605318910/nextjs_media/wb5osprab71emsxp3ibm.jpg"
            },
            {
                "public_id": "nextjs_media/nelvbtwdbk1vjvhufort",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605318911/nextjs_media/nelvbtwdbk1vjvhufort.jpg"
            },
            {
                "public_id": "nextjs_media/bnyeto9vaz40yfts92we",
                "url": "https://res.cloudinary.com/devatchannel/image/upload/v1605318913/nextjs_media/bnyeto9vaz40yfts92we.jpg"
            }
        ],
        "checked": false,
        "inStock": 153,
        "sold": 5,
        "title": "laptop",
        "price": 25,
        "description": "How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.",
        "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
        "category": "5faa35a88fdff228384d51d8"
    }
]

const CheckId = () => {

    const[products,setProducts]=useState(data)

    const handleCheck = (id) => {

        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])

        console.log(id)

        console.log(products)

    }

    return (
        <div>
            {products.map(item=>{
                return(
                    <div key={item.id}>
                        <p>{item.description}</p>
                        <button onClick={handleCheck}>click</button>
                    </div>
                )
            })}

        </div>
    );
};

export default CheckId;