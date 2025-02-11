import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeaturesSection from '../components/FeaturesSection';
import Banner from '../components/Banner';
import logo from '/src/assets/images/g16.svg';
import image1 from '/src/assets/images/image1.png';
import image2 from '/src/assets/images/image2.png';
import image3 from '/src/assets/images/image3.png';
import image4 from '/src/assets/images/image4.png';
import image5 from '/src/assets/images/image5.png';
import image6 from '/src/assets/images/image6.png';
import image7 from '/src/assets/images/image7.png';
import image8 from '/src/assets/images/image8.png';
import Map from '../components/Map';
import Contactus from '../components/Contactus';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const servicesData = [
    { 
        title: "Precision Field Management", 
        image: image5, 
        description: "Optimize your field operations with precision farming techniques."
    },
    { 
        title: "Soil Health Monitoring", 
        image: image6, 
        description: "Keep track of soil health with our advanced monitoring solutions."
    },
    { 
        title: "Irrigation Management", 
        image: image7, 
        description: "Maximize your water usage with efficient irrigation systems."
    },
    { 
        title: "Crop Health Monitoring", 
        image: image8, 
        description: "Monitor crop health in real-time to ensure optimal growth."
    },
];

const Landingpage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, []);

    function HandleClick(){
        navigate('/croprecommendation');
    }

    return (
        <div className='bg-gray-100'>
            <nav className='flex justify-between items-center p-8'>
                <div className='flex items-center'>
                    <img className='w-18' src={logo} alt="logo" />
                    <h1>Smart Crop</h1>
                </div>
                <div className='flex space-x-4'>
                    <a href="#home" className="hover:bg-green-600 px-6 py-2 rounded">Home</a>
                    <a href="#about" className="hover:bg-green-600 px-6 py-2 rounded">About</a>
                    <a href="#services" className="hover:bg-green-600 px-6 py-2 rounded">Services</a>
                    <a href="#contact" className="hover:bg-green-600 px-6 py-2 rounded">Contact</a>
                </div>
            </nav>
            <section className='flex flex-col md:flex-row justify-between'>
                <div className='py-32 p-4 px-12' data-aos="fade-right">
                    <h1 className='font-bold text-4xl md:text-6xl'>Revolutionize <br />How You <br /> Manage Crops</h1>
                    <p className='text-lg md:text-xl py-10'> Elevate your farming game with our smart tools designed to <br /> transform your crop management like <br /> never before!</p>
                    <button
                        type="submit" onClick={HandleClick}
                        className="w-40 py-2 mt-4 text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
                    >
                        Get Started
                    </button>
                </div>
                <div className='p-4 px-12'>
                    <div className='flex flex-col md:flex-row justify-between py-4 gap-3'>
                        <img src={image1} alt="" data-aos="zoom-in" className="w-full md:w-1/2" />
                        <img src={image2} alt="" data-aos="zoom-in" className="w-full md:w-1/2" />
                    </div>
                    <img src={image3} alt="" data-aos="zoom-in" className="w-full" />
                </div>
            </section>

            <section className='bg-green-800 py text-white rounded-4xl m-10 h-150' data-aos="fade-up">
                <h1 className='text-center py-12 text-3xl md:text-5xl'>Enhance Crop Yields Effectively</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pl-12'>
                    {Array(6).fill().map((_, index) => (
                        <div key={index} className='h-50 text-center pt-5 w-100  rounded-4xl bg-green-700  hover:bg-green-600' data-aos="flip-left">
                            <h1 className='text-2xl'>Precision Field <br /> Management</h1> <br />
                            Optimize crop yields with <br /> real-time data <br />and analytics tailored for your fields.
                        </div>
                    ))}
                </div>
            </section>

            <h1 className='font-bold text-4xl text-center py-10'> About Us</h1>
            <section className='flex flex-col md:flex-row justify-between' id='about'>
                <div className='px-12 p-4' data-aos="fade-left">
                    <h1 className='font-lightbold text-3xl'>Empowering Ethiopian Agriculture with technology</h1>
                    <br /><br />
                    <p> Smart Crop is at the forefront of transforming agriculture in Ethiopia by providing <br />innovative management software tailored to the unique needs of local farmers. Our solutions are designed <br /> to enhance productivity, optimize resource use, and promote sustainability, ensuring a brighter future for the agricultural sector. <br /> We are committed to combining cutting-edge technology with deep-rooted agricultural knowledge to drive growth and efficiency across Ethiopia's farms.</p>
                </div>
                <div className='py-4 px-12'>
                    <img className='w-full md:w-120 h-auto' src={image4} alt="" data-aos="fade-up" />
                </div>
            </section>

            <section className="p-6 py-20 bg-gray-100" id="services">
                <h2 className="text-4xl font-bold text-center mb-4" data-aos="fade-up">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    {servicesData.map((service, index) => (
                        <div key={index} className="bg-white p-2 rounded-4xl shadow-md transition-transform transform hover:scale-105" data-aos="fade-up">
                            <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-4xl" />
                            <h3 className="text-lg font-semibold mt-2">{service.title}</h3>
                            <p className="text-gray-700">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <FeaturesSection></FeaturesSection>
            <Banner/>
            <Footer/>
            


        </div>
    );
};

export default Landingpage;