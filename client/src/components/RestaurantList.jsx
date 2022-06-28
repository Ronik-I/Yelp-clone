import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../APIs/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import {useNavigate} from "react-router-dom";
import StarRating from './StarRating';

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext);
    let navigate = useNavigate();
    //The old useHistory has been replaced by useNavigate in react-router-dom v6
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await RestaurantFinder.get("/");
          //console.log(response);
          setRestaurants(response.data.data.restaurants);
        } catch (err) {}
      };
  
      fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
          const response = await RestaurantFinder.delete(`/${id}`);
          setRestaurants(
            restaurants.filter((restaurant) => {
              return restaurant.id !== id;
            })
          );
        } catch (err) {
          console.log(err);
        }
      };

const handleUpdate = (e,id) => {
    e.stopPropagation();

    navigate(`/restaurants/${id}/update`);
};


const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
};

const renderRating = (restaurant) => {
  if (!restaurant.count) {
    return <span><b>0 reviews</b></span>;
  }
  return (
    <>
      <StarRating rating={restaurant.average_rating} />
      <span className="ml-1">({restaurant.count})</span>
    </>
  );
};

  
  
  
    return (
    <div className='list-group'>
        <table className="opacity-75 table table-hover">
            <thead>
                <tr className="bg-primary">
                    <th scope="col">Restaurants</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map((restaurant) => {
                    return(
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                        <td><strong>{restaurant.name}</strong></td>
                        <td><strong>{restaurant.location}</strong></td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td><button onClick={(e) => handleUpdate(e,restaurant.id)} className="btn btn-success">Update</button></td>
                        <td>
                    <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                    </td>
                    </tr>
                    );
                    
                })}
                {/* <tr>
                    <td>
                        Mcdonalds
                    </td>
                    <td>
                        New York
                    </td>
                    <td>
                        $$$
                    </td>
                    <td>
                        Rating
                    </td>
                    <td>
                        <button className="btn btn-warning">Update</button>
                    </td>
                    <td>
                    <button className="btn btn-danger">Delete</button>
                    </td>
                   
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}
export default RestaurantList