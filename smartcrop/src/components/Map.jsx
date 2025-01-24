// src/components/Map.js
import React from 'react';

const Map = () => {
    return (
        <div className="w-full h-64">
            <iframe
                title="Google Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345097765!2d144.95373531531634!3d-37.8172099797515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11c2bb%3A0x5045675218ce6e0!2sYour%20Location!5e0!3m2!1sen!2sau!4v1614863513255!5m2!1sen!2sau"
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default Map;