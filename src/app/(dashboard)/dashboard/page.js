"use client";


import { useEffect, useState } from "react";
import { Row, Col, Card, Spin } from "antd";
import HotelService from "../../../../services/api/HotelService";

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHotels = async () => {
    setLoading(true);
    const data = await HotelService.getHotels();
    setHotels(data.hotels);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={32}>
          {hotels.map((hotel) => (
            <Col xs={24} md={12} key={hotel._id}>
              <Card
                title={hotel.name}
                bordered={false}
                style={{ textAlign: "center" }}
              >
                <h3>{hotel.address}</h3>
                <p>Cost per Night: ${hotel.costPerNight}</p>
                <p>Available Rooms: {hotel.availableRooms}</p>
                <p>Average Rating: {hotel.averageRating} / 5</p>
                {hotel.propertyImage && (
                  <img
                    src={hotel.propertyImage}
                    alt={hotel.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Dashboard;


