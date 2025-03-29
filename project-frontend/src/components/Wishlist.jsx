import { useEffect, useState } from 'react';
import { fetchWishlist, removeFromWishlist } from '../js/Car';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const loadWishlist = async () => {
            const data = await fetchWishlist();
            setWishlist(data);
        };
        loadWishlist();
    }, []);

    const handleRemove = async (wishlistId) => {
        await removeFromWishlist(wishlistId);
        setWishlist(wishlist.filter(item => item.id !== wishlistId));
    };

    return (
        <div className="wishlist-container">
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No cars in wishlist.</p>
            ) : (
                wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                        <img src={item.car.image_url} alt={item.car.model} />
                        <h3>{item.car.make} {item.car.model}</h3>
                        <p>Price: Ksh {item.car.price}</p>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Wishlist;
